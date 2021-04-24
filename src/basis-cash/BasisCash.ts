import { Configuration } from './config';
import { ContractName, } from './types';
import { BigNumber, Contract, ethers, Overrides } from 'ethers';
import { decimalToBalance } from './ether-utils';
import { TransactionResponse } from '@ethersproject/providers';
import ERC20 from './ERC20';
import { getDefaultProvider } from '../utils/provider';
import UniswapV2Router02ABI from './UniswapV2Router02.abi.json';
import Multicall from './Mulitcall';
import UniswapPair from './UniswapPair';
import ABIS from './deployments/abi';


/**
 * An API module of ARTH contracts.
 * All contract-interacting domain logic should be defined in here.
 */
export class BasisCash {
  myAccount: string;
  provider: ethers.providers.BaseProvider;
  signer?: ethers.Signer;
  config: Configuration;
  contracts: { [name: string]: Contract };
  boardroomVersionOfUser?: string;

  // arthEth: UniswapPair;
  // arthDai: UniswapPair;
  // mahaEth: UniswapPair;

  DAI: ERC20;
  ARTH: ERC20;
  MAHA: ERC20;
  ARTHX: ERC20;

  multicall: Multicall

  constructor(cfg: Configuration) {
    const { deployments, } = cfg;
    const provider = getDefaultProvider();

    // loads contracts from deployments
    this.contracts = {};
    for (const [name, deployment] of Object.entries(deployments)) {
      if (!deployment.abi) continue
      this.contracts[name] = new Contract(deployment.address, ABIS[deployment.abi], provider);
    }

    this.ARTH = new ERC20(deployments.ARTHStablecoin.address, provider, 'ARTH');
    this.MAHA = new ERC20(deployments.MahaToken.address, provider, 'MAHA');
    this.ARTHX = new ERC20(deployments.ARTHShares.address, provider, 'ARTHX');
    this.DAI = new ERC20(deployments.DAI.address, provider, 'DAI');

    this.multicall = new Multicall(cfg.defaultProvider, deployments.Multicall.address)

    // Uniswap V2 Pair

    // this.arthDai = new UniswapPair(
    //   deployments.ArthDaiMLP.address,
    //   provider,
    //   'ARTH-DAI-LP'
    // );

    // this.arthEth = new UniswapPair(
    //   deployments.ArthEthMLP.address,
    //   provider,
    //   'ARTH-ETH-LP'
    // );

    // this.mahaEth = new UniswapPair(
    //   deployments.MahaEthLP.address,
    //   provider,
    //   'MAHA-ETH'
    // );

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
    const tokens = [this.ARTH, this.MAHA, this.ARTHX, this.DAI];
    for (const token of tokens) {
      token.connect(this.signer);
    }

    console.log(`🔓 Wallet is unlocked. Welcome, ${account}!`);

    // this.multicall.addCalls([
    //   {
    //     key: 'BALANCE_OF_ARTH',
    //     target: this.ARTH.address,
    //     call: ['balanceOf(address)(uint256)', this.myAccount],
    //     convertResult: val => val / 10 ** 18
    //   }, {
    //     key: 'BALANCE_OF_ARTHB',
    //     target: this.ARTHB.address,
    //     call: ['balanceOf(address)(uint256)', this.myAccount],
    //     convertResult: val => val / 10 ** 18
    //   }, {
    //     key: 'BALANCE_OF_MAHA',
    //     target: this.MAHA.address,
    //     call: ['balanceOf(address)(uint256)', this.myAccount],
    //     convertResult: val => val / 10 ** 18
    //   }, {
    //     key: 'BALANCE_OF_DAI',
    //     target: this.DAI.address,
    //     call: ['balanceOf(address)(uint256)', this.myAccount],
    //     convertResult: val => val / 10 ** 18
    //   }
    // ])
  }

  get isUnlocked(): boolean {
    return !!this.myAccount;
  }

  getBoardrooms: () => ['arth', 'arthUniLiquidity', 'arthMlpLiquidity', 'mahaLiquidity']


  gasOptions(gas: BigNumber): Overrides {
    const multiplied = Math.floor(gas.toNumber() * this.config.gasLimitMultiplier);
    console.log(`⛽️ Gas multiplied: ${gas} -> ${multiplied}`);
    return {
      gasLimit: BigNumber.from(multiplied),
    };
  }



  async getTargetPrice(): Promise<BigNumber> {
    const { GMUOracle } = this.contracts;
    return GMUOracle.getPrice();
  }



  async getTokenPriceFromPair(pair: UniswapPair, forToken: ERC20): Promise<BigNumber> {
    await this.provider.ready;

    const token0 = await pair.token0()
    const [r0, r1] = await pair.reserves()
    const decimals = BigNumber.from(10).pow(18);

    if (token0.toLowerCase() === forToken.address.toLowerCase()) return r1.mul(decimals).div(r0)
    return r0.mul(decimals).div(r1)
  }

  async getTokenPriceFromCoingecko(tokenContract: ERC20): Promise<BigNumber> {
    await this.provider.ready;

    const decimals = BigNumber.from(10).pow(18);

    try {
      const result = await fetch(`https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenContract.address}&vs_currencies=usd`)
      const json = await result.json()
      return BigNumber.from(Number(json[tokenContract.address.toLowerCase()].usd)).mul(decimals)
    } catch (err) {
      console.error(`Failed to fetch token price of ${tokenContract.symbol}: ${err}`);
    }

    return BigNumber.from(0)
  }

  async estimateAmountOutFromUniswap(amountIn: number, path: ERC20[]): Promise<BigNumber> {
    await this.provider.ready;

    if (amountIn <= 0) return BigNumber.from(0)

    const denominator1e18 = BigNumber.from(10).pow(18).mul(Math.floor(amountIn));
    const adjustedAmount = BigNumber.from(1).mul(denominator1e18)

    const UniswapV2Library = new Contract(
      this.config.deployments.UniswapV2Router02.address,
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

}
