import { ChainId } from '@uniswap/sdk';
import { Configuration } from './basis-cash/config';
import { CollateralPool } from './basis-cash';
import { BoostedStakingContract, LinearStakingContract } from './basis-cash/types';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: 1337,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: 'http://127.0.0.1:8545',
    deployments: require('./basis-cash/deployments/deployments.development.json'),
    genesisLaunchDate: new Date('2021-01-15T14:00:00Z'),
    genesisEndDate: new Date('2021-01-21T15:00:00Z'),
    refreshInterval: 3000,
    gasLimitMultiplier: 1.1,
  },
  staging: {
    chainId: ChainId.ROPSTEN,
    etherscanUrl: 'https://ropsten.etherscan.io',
    defaultProvider: 'https://weathered-young-wave.quiknode.io/75809a67-435c-4d8b-a287-649990316295/IHZHq4dJhpdQq85_QIA5Uidl_btMGwikH8tF3VNPZsgoFhaetWDXXdmkavW1TaTf5JrVwFWnMsx8aJ-fR01pTg==/',
    deployments: require('./basis-cash/deployments/deployments.rinkeby.json'),
    genesisLaunchDate: new Date('2021-01-15T14:00:00Z'),
    genesisEndDate: new Date('2021-01-15T14:00:00Z'),
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
  production: {
    chainId: ChainId.MAINNET,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: 'https://ancient-young-wave.quiknode.io/f13a565e-d520-49bb-8109-b6278531d848/TD7pzD7xEEC-ppMyv475dYkhgEYWh-Ev4zyPEiGValWQ76lrBPMuGhoJjLflw3KRBvt1ytsJ4IrpXajUC5XbkQ==/',
    deployments: require('./basis-cash/deployments/deployments.mainnet.json'),
    genesisLaunchDate: new Date('2021-01-15T14:00:00Z'),
    genesisEndDate: new Date('2021-01-22T15:00:00Z'),
    refreshInterval: 3000,
    gasLimitMultiplier: 1.7,
  },
};


export const collateralPools: { [contractName: string]: CollateralPool } = {
  PoolUSDC: {
    contract: 'Pool_USDC',
    collateralTokenName: 'USDC',
    finished: true,
    networks: [ChainId.MAINNET, ChainId.ROPSTEN, 1337],
    sort: 3,
  }
};

export const linearStakingContracts: { [contractName: string]: LinearStakingContract } = {
  USDTPool: {
    contract: '',
    collateralTokenName: 'USDT',
    poolRewards: 12500,
    earnTokenName: 'ARTH',
    finished: true,
    poolDurationInDays: 5,
    poolSize: 84460,
    networks: [ChainId.MAINNET, ChainId.ROPSTEN, 1337],
    sort: 3,
  }
};

export const boostedStakingContracts: { [contractName: string]: BoostedStakingContract } = {
  USDTPool: {
    contract: '',
    collateralTokenName: 'USDT',
    poolRewards: 12500,
    earnTokenName: 'ARTH',
    finished: true,
    poolDurationInDays: 5,
    poolSize: 84460,
    networks: [ChainId.MAINNET, ChainId.ROPSTEN, 1337],
    sort: 3,
  }
};


export default configurations["development"];
