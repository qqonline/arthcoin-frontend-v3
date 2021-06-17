import { ChainId } from '@uniswap/sdk';

export type Deployments = {
  [contractName: string]: {
    address: string;
    abi: string;
  }
}

export type Configuration = {
  chainId: ChainId;
  networkName: string;
  etherscanUrl: string;
  defaultProvider: string;
  deployments: Deployments;
  config?: EthereumConfig;
  defaultCollateral: string;
  supportedCollaterals: string[];
  arthTradingPairs: string[];
  arthxTradingPairs: string[];
  genesisLaunchDate: Date;
  genesisEndDate: Date;
  refreshInterval: number;
  gasLimitMultiplier: number;
  platform: string;
};

export type EthereumConfig = {
  testing: boolean;
  autoGasMultiplier: number;
  defaultConfirmations: number;
  defaultGas: string;
  defaultGasPrice: string;
  ethereumNodeTimeout: number;
};

export const defaultEthereumConfig = {
  testing: false,
  autoGasMultiplier: 1.5,
  defaultConfirmations: 1,
  defaultGas: '6000000',
  defaultGasPrice: '1000000000000',
  ethereumNodeTimeout: 10000,
};
