import { ChainId } from '@uniswap/sdk';
import { BigNumber } from '@ethersproject/bignumber';

export type ContractName = string;

export interface CollateralPool {
  contract: ContractName;
  collateralTokenName: ContractName;
  sort: number;
  finished: boolean;
  networks: ChainId[];
}

export interface StakingContract {
  platform: string;
  contract: ContractName;
  kind: 'locked' | 'unlocked';
  depositTokenKind:
    | 'single'
    | 'uniswap-v2-lp'
    | 'sushiswap-v2-lp'
    | 'dfyn-v2-lp'
    | 'cryption-v2-lp';
  depositTokenSymbols: string[];
  depositToken: string;
  earnTokenName: ContractName;
  sort: number;
  finished: boolean;
  networks: ChainId[];
  categories: string[];
}

export interface TradingPairs {
  tokens: [string, string];
  platform: 'uniswapV2' | 'uniswapV3' | 'quickswap' | 'sushiswap' | 'dfyn' | 'cryption';
}

export interface TokenStat {
  priceInDAI: BigNumber;
  totalSupply: BigNumber;
}

export interface Platform {
  addLiquidityUrl: string;
  swapUrl: string;
}
