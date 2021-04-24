import { ChainId } from '@uniswap/sdk';
// import { BigNumber, Contract } from 'ethers';
// import { Boardrooms, BoardroomsV2, Vaults } from './config';
// import ERC20 from './ERC20';

export type ContractName = string;

export interface CollateralPool {
  contract: ContractName;
  collateralTokenName: ContractName;
  sort: number;
  finished: boolean;
  networks: ChainId[]
}


export interface BoostedStakingContract {
  contract: ContractName;
  collateralTokenName: ContractName;

  earnTokenName: ContractName;
  sort: number;
  finished: boolean;
  networks: ChainId[]
  poolRewards: number
  poolDurationInDays: number
  poolSize: number
}

export interface LinearStakingContract {
  contract: ContractName;
  collateralTokenName: ContractName;

  earnTokenName: ContractName;
  sort: number;
  finished: boolean;
  networks: ChainId[]
  poolRewards: number
  poolDurationInDays: number
  poolSize: number
}
