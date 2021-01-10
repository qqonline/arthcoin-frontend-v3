import { Fetcher, Route, Token, FACTORY_ADDRESS } from '@uniswap/sdk';
import { Configuration } from './config';
import { BoardroomInfo, ContractName, TokenStat, TreasuryAllocationTime } from './types';
import { BigNumber, Contract, ethers, Overrides } from 'ethers';
import { decimalToBalance } from './ether-utils';
import { TransactionResponse } from '@ethersproject/providers';
import ERC20 from './ERC20';
import { getDisplayBalance } from '../utils/formatBalance';
import { getDefaultProvider } from '../utils/provider';
import IUniswapV2PairABI from './IUniswapV2Pair.abi.json';
import UniswapV2Router02ABI from './UniswapV2Router02.abi.json';

/**
 * An API module of ARTH contracts.
 * All contract-interacting domain logic should be defined in here.
 */
export class BasisCash {
  myAccount: string;
  provider: ethers.providers.JsonRpcProvider;
  signer?: ethers.Signer;
  config: Configuration;
  contracts: { [name: string]: Contract };
  externalTokens: { [name: string]: ERC20 };
  boardroomVersionOfUser?: string;

  bacDai: Contract;
  arthDai: Contract;

  DAI: ERC20;
  ARTH: ERC20;
  MAHA: ERC20;
  ARTHB: ERC20;
  ARTHDAI_UNIV2: ERC20;

  constructor(cfg: Configuration) {
    const { deployments, externalTokens } = cfg;
    const provider = getDefaultProvider();

    // loads contracts from deployments
    this.contracts = {};
    for (const [name, deployment] of Object.entries(deployments)) {
      this.contracts[name] = new Contract(deployment.address, deployment.abi, provider);
    }
    this.externalTokens = {};
    for (const [symbol, [address, decimal]] of Object.entries(externalTokens)) {
      this.externalTokens[symbol] = new ERC20(address, provider, symbol, decimal); // TODO: add decimal+
    }

    this.ARTH = new ERC20(deployments.ARTH.address, provider, 'ARTH');
    this.MAHA = new ERC20(deployments.MahaToken.address, provider, 'MAHA');
    this.ARTHB = new ERC20(deployments.ARTHB.address, provider, 'ARTHB');
    this.DAI = this.externalTokens['DAI']

    // Uniswap V2 Pair

    this.arthDai = new Contract(
      externalTokens['ARTH_DAI-UNI-LPv2'][0],
      IUniswapV2PairABI,
      provider,
    );

    this.config = cfg;
    this.provider = provider;
  }

  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  unlockWallet(provider: any, account: string) {
    const newProvider = new ethers.providers.Web3Provider(provider, this.config.chainId);

    this.signer = newProvider.getSigner(0);
    this.myAccount = account;
    for (const [name, contract] of Object.entries(this.contracts)) {
      this.contracts[name] = contract.connect(this.signer);
    }
    const tokens = [this.ARTH, this.MAHA, this.ARTHB, ...Object.values(this.externalTokens)];
    for (const token of tokens) {
      token.connect(this.signer);
    }
    this.arthDai = this.arthDai.connect(this.signer);
    console.log(`🔓 Wallet is unlocked. Welcome, ${account}!`);
    this.fetchBoardroomVersionOfUser()
      .then((version) => (this.boardroomVersionOfUser = version))
      .catch((err) => {
        console.error(`Failed to fetch boardroom version: ${err.stack}`);
        this.boardroomVersionOfUser = 'latest';
      });
  }

  get isUnlocked(): boolean {
    return !!this.myAccount;
  }

  getBoardrooms: () => ['arth', 'arthLiquidity']


  getBoardroom(kind: 'arth' | 'arthLiquidity'): BoardroomInfo {
    const contract = kind === 'arth' ? this.config.deployments.ArthBoardroom : this.config.deployments.ArthLiquidityBoardroom
    if (kind === 'arth') return {
      kind: 'arth',
      contract: contract.address,
      depositTokenName: 'ARTH',
      earnTokenName: 'ARTH',
      seionrageSupplyPercentage: 80,
      history7dayAPY: 30,
      lockInPeriodDays: 5,
    }

    return {
      kind: 'arthLiquidity',
      contract: contract.address,
      depositTokenName: 'ARTH_DAI-UNI-LPv2',
      earnTokenName: 'ARTH',
      seionrageSupplyPercentage: 20,
      history7dayAPY: 30,
      lockInPeriodDays: 5,
    }
  }

  gasOptions(gas: BigNumber): Overrides {
    const multiplied = Math.floor(gas.toNumber() * this.config.gasLimitMultiplier);
    console.log(`⛽️ Gas multiplied: ${gas} -> ${multiplied}`);
    return {
      gasLimit: BigNumber.from(multiplied),
    };
  }

  /**
   * @returns ARTH (ARTH) stats from Uniswap.
   * It may differ from the ARTH price used on Treasury (which is calculated in TWAP)
   */
  async getCashStatFromUniswap(): Promise<TokenStat> {
    const supply = await this.ARTH.displayedTotalSupply();
    return {
      priceInDAI: await this.getTokenPriceFromUniswap(this.ARTH),
      totalSupply: supply,
    };
  }

  /**
   * @returns Estimated ARTH (ARTH) price data,
   * calculated by 1-day Time-Weight Averaged Price (TWAP).
   */
  async getCashStatInEstimatedTWAP(): Promise<TokenStat> {
    const { SeigniorageOracle } = this.contracts;

    // estimate current TWAP price
    const cumulativePrice: BigNumber = await this.arthDai.price0CumulativeLast();
    const cumulativePriceLast = await SeigniorageOracle.price0CumulativeLast();

    const elapsedSec = Math.floor(Date.now() / 1000 - (await SeigniorageOracle.blockTimestampLast()));

    const denominator112 = BigNumber.from(2).pow(112);
    const denominator1e18 = BigNumber.from(10).pow(18);
    const cashPriceTWAP = cumulativePrice
      .sub(cumulativePriceLast)
      .mul(denominator1e18)
      .div(elapsedSec)
      .div(denominator112);

    const totalSupply = await this.ARTH.displayedTotalSupply();
    return {
      priceInDAI: getDisplayBalance(cashPriceTWAP),
      totalSupply,
    };
  }

  async getTargetPrice(): Promise<BigNumber> {
    const { GMUOracle } = this.contracts;
    return GMUOracle.getPrice();
  }

  async getStabilityFees(): Promise<BigNumber> {
    const { Treasury } = this.contracts;

    return Treasury.stabilityFee()
  }


  async getCashPriceInLastTWAP(): Promise<BigNumber> {
    const { Treasury } = this.contracts;
    return Treasury.getSeigniorageOraclePrice();
  }

  async getBondOraclePriceInLastTWAP(): Promise<BigNumber> {
    const { Treasury } = this.contracts;
    return Treasury.getBondOraclePrice();
  }

  async getBondStat(): Promise<TokenStat> {
    const decimals = BigNumber.from(10).pow(18);

    const cashPrice: BigNumber = await this.getBondOraclePriceInLastTWAP();
    const bondPrice = cashPrice.pow(2).div(decimals);

    return {
      priceInDAI: getDisplayBalance(bondPrice),
      totalSupply: await this.ARTHB.displayedTotalSupply(),
    };
  }

  async getShareStat(): Promise<TokenStat> {
    return {
      priceInDAI: await this.getTokenPriceFromUniswap(this.MAHA),
      totalSupply: await this.MAHA.displayedTotalSupply(),
    };
  }

  async getTokenPriceFromUniswap(tokenContract: ERC20): Promise<string> {
    await this.provider.ready;

    const { chainId } = this.config;
    const { DAI } = this.config.externalTokens;

    const dai = new Token(chainId, DAI[0], 18);
    const token = new Token(chainId, tokenContract.address, 18);

    try {
      const daiToToken = await Fetcher.fetchPairData(dai, token, this.provider);
      const priceInDAI = new Route([daiToToken], token);
      return priceInDAI.midPrice.toSignificant(3);
    } catch (err) {
      console.error(`Failed to fetch token price of ${tokenContract.symbol}: ${err}`);
    }
  }

  async estimateAmountOutFromUniswap(amountIn: number, path: ERC20[]): Promise<BigNumber> {
    await this.provider.ready;

    if (amountIn <= 0) return BigNumber.from(0)

    const denominator1e18 = BigNumber.from(10).pow(18).mul(Math.floor(amountIn));
    const adjustedAmount = BigNumber.from(1).mul(denominator1e18)

    const UniswapV2Library = new Contract(
      this.config.uniswapFactory,
      UniswapV2Router02ABI,
      this.provider,
    )

    try {
      const result: BigNumber[] = await UniswapV2Library.getAmountsOut(adjustedAmount, path.map(p => p.address))
      return result[result.length - 1]
    } catch (error) {
      console.log('Uniswap estimation error', error)
    }

    return BigNumber.from(0)
  }

  /**
   * Buy bonds with cash.
   * @param amount amount of cash to purchase bonds with.
   */
  async buyBonds(amount: string | number): Promise<TransactionResponse> {
    const { Treasury } = this.contracts;
    console.log(decimalToBalance(amount), (await this.getBondOraclePriceInLastTWAP()).toString())
    return await Treasury.buyBonds(decimalToBalance(amount), await this.getBondOraclePriceInLastTWAP());
  }

  /**
   * Redeem bonds for ARTH.
   * @param amount amount of bonds to redeem.
   */
  async redeemBonds(amount: string): Promise<TransactionResponse> {
    const { Treasury } = this.contracts;
    return await Treasury.redeemBonds(decimalToBalance(amount), await this.getBondOraclePriceInLastTWAP());
  }

  async earnedFromBank(poolName: ContractName, account = this.myAccount): Promise<BigNumber> {
    const pool = this.contracts[poolName];
    try {
      return await pool.earned(account);
    } catch (err) {
      console.error(`Failed to call earned() on pool ${pool.address}: ${err.stack}`);
      return BigNumber.from(0);
    }
  }

  async stakedBalanceOnBank(
    poolName: ContractName,
    account = this.myAccount,
  ): Promise<BigNumber> {
    const pool = this.contracts[poolName];
    try {
      return await pool.balanceOf(account);
    } catch (err) {
      console.error(`Failed to call balanceOf() on pool ${pool.address}: ${err.stack}`);
      return BigNumber.from(0);
    }
  }

  /**
   * Deposits token to given pool.
   * @param poolName A name of pool contract.
   * @param amount Number of tokens with decimals applied. (e.g. 1.45 DAI * 10^18)
   * @returns {string} Transaction hash
   */
  async stake(poolName: ContractName, amount: BigNumber): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    const gas = await pool.estimateGas.stake(amount);
    return await pool.stake(amount, this.gasOptions(gas));
  }

  /**
   * Withdraws token from given pool.
   * @param poolName A name of pool contract.
   * @param amount Number of tokens with decimals applied. (e.g. 1.45 DAI * 10^18)
   * @returns {string} Transaction hash
   */
  async unstake(poolName: ContractName, amount: BigNumber): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    const gas = await pool.estimateGas.withdraw(amount);
    return await pool.withdraw(amount, this.gasOptions(gas));
  }

  /**
   * Transfers earned token reward from given pool to my account.
   */
  async harvest(poolName: ContractName): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    const gas = await pool.estimateGas.getReward();
    return await pool.getReward(this.gasOptions(gas));
  }

  /**
   * Harvests and withdraws deposited tokens from the pool.
   */
  async exit(poolName: ContractName): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    const gas = await pool.estimateGas.exit();
    return await pool.exit(this.gasOptions(gas));
  }

  async fetchBoardroomVersionOfUser(): Promise<string> {
    return 'latest';
  }

  boardroomByVersion(kind: 'arthLiquidity' | 'arth', version: string): Contract {
    if (kind === 'arthLiquidity') return this.contracts.ArthLiquidityBoardroom;
    return this.contracts.ArthBoardroom;
  }

  currentBoardroom(kind: 'arthLiquidity' | 'arth'): Contract {
    return this.boardroomByVersion(kind, this.boardroomVersionOfUser);
  }

  isOldBoardroomMember(): boolean {
    return this.boardroomVersionOfUser !== 'latest';
  }

  async stakeShareToBoardroom(kind: 'arthLiquidity' | 'arth', amount: string): Promise<TransactionResponse> {
    if (this.isOldBoardroomMember()) {
      throw new Error("you're using old ArthBoardroom. please withdraw and deposit the MAHA again.");
    }
    const ArthBoardroom = this.currentBoardroom(kind);
    return await ArthBoardroom.stake(decimalToBalance(amount));
  }

  async getStakedSharesOnBoardroom(kind: 'arthLiquidity' | 'arth'): Promise<BigNumber> {
    const ArthBoardroom = this.currentBoardroom(kind);

    return await ArthBoardroom.balanceOf(this.myAccount);
  }

  async getEarningsOnBoardroom(kind: 'arthLiquidity' | 'arth'): Promise<BigNumber> {
    const ArthBoardroom = this.currentBoardroom(kind);
    if (this.boardroomVersionOfUser === 'v1') {
      return await ArthBoardroom.getCashEarningsOf(this.myAccount);
    }
    return await ArthBoardroom.earned(this.myAccount);
  }

  async withdrawShareFromBoardroom(kind: 'arthLiquidity' | 'arth', amount: string): Promise<TransactionResponse> {
    const ArthBoardroom = this.currentBoardroom(kind);
    return await ArthBoardroom.withdraw(decimalToBalance(amount));
  }

  async harvestCashFromBoardroom(kind: 'arthLiquidity' | 'arth'): Promise<TransactionResponse> {
    const ArthBoardroom = this.currentBoardroom(kind);
    if (this.boardroomVersionOfUser === 'v1') {
      return await ArthBoardroom.claimDividends();
    }
    return await ArthBoardroom.claimReward();
  }

  async exitFromBoardroom(kind: 'arthLiquidity' | 'arth'): Promise<TransactionResponse> {
    const ArthBoardroom = this.currentBoardroom(kind);
    return await ArthBoardroom.exit();
  }

  async getTreasuryNextAllocationTime(): Promise<TreasuryAllocationTime> {
    const { Treasury } = this.contracts;
    const nextEpochTimestamp: BigNumber = await Treasury.nextEpochPoint();
    const period: BigNumber = await Treasury.getPeriod();
    const currentEpoch: BigNumber = await Treasury.getCurrentEpoch();

    const nextAllocation = new Date(nextEpochTimestamp.mul(1000).toNumber());
    const prevAllocation = new Date(nextAllocation.getTime() - period.toNumber() * 1000);


    return { prevAllocation, nextAllocation, currentEpoch: currentEpoch.toNumber() };
  }
}
