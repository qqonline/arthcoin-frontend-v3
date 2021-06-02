import { ChainId } from '@uniswap/sdk';

import { CollateralPool } from './basis-cash';
import { Configuration } from './basis-cash/config';
import { StakingContract, TradingPairs } from './basis-cash/types';

const configurations: { [env: string]: Configuration } = {
  development: {
    networkName: 'Ganache',
    chainId: 1337,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: 'http://127.0.0.1:8545',
    deployments: require('./basis-cash/deployments/development.json'),
    genesisLaunchDate: new Date('2021-01-15T14:00:00Z'),
    genesisEndDate: new Date('2021-01-21T15:00:00Z'),
    refreshInterval: 30 * 1000,
    gasLimitMultiplier: 1.1,
    defaultCollateral: 'USDT',
    supportedCollaterals: ['USDT', 'USDC'],
    arthTradingPairs: ['ETH', 'MAHA'],
    arthxTradingPairs: ['ETH', 'ARTH'],
  },
  staging: {
    networkName: 'Rinkeby',
    chainId: ChainId.RINKEBY,
    etherscanUrl: 'https://rinkeby.etherscan.io',
    defaultProvider:
      'https://bitter-twilight-moon.quiknode.io/a7bc771b-a15c-49a6-9e23-a1106f86b2db/g9PahkWuM3pjJMRqNA39cUyZpov8PMSH5MbcKSJs4zrqyGwEsuUajCGSpWmFbvVU7HboSbF6lauR38Y0Zyr8NQ==/',
    deployments: require('./basis-cash/deployments/rinkeby.json'),
    genesisLaunchDate: new Date('2021-01-15T14:00:00Z'),
    genesisEndDate: new Date('2021-01-15T14:00:00Z'),
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
    defaultCollateral: 'USDT',
    supportedCollaterals: ['USDT', 'USDC'],
    arthTradingPairs: ['ETH', 'MAHA'],
    arthxTradingPairs: ['ETH', 'ARTH'],
  },
  production: {
    networkName: 'Ethereum Mainnet',
    chainId: ChainId.MAINNET,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider:
      'https://ancient-young-wave.quiknode.io/f13a565e-d520-49bb-8109-b6278531d848/TD7pzD7xEEC-ppMyv475dYkhgEYWh-Ev4zyPEiGValWQ76lrBPMuGhoJjLflw3KRBvt1ytsJ4IrpXajUC5XbkQ==/',
    deployments: require('./basis-cash/deployments/mainnet.json'),
    genesisLaunchDate: new Date('2021-01-15T14:00:00Z'),
    genesisEndDate: new Date('2021-01-22T15:00:00Z'),
    refreshInterval: 3000,
    gasLimitMultiplier: 1.7,
    defaultCollateral: 'ETH',
    arthTradingPairs: ['ETH', 'MAHA'],
    arthxTradingPairs: ['ETH', 'ARTH'],
    supportedCollaterals: ['ETH', 'WBTC', 'USDT', 'USDC'],
  },
};

export const collateralPools: { [contractName: string]: CollateralPool } = {
  PoolUSDC: {
    contract: 'Pool_USDC',
    collateralTokenName: 'USDC',
    finished: true,
    networks: [ChainId.MAINNET, ChainId.RINKEBY, 1337],
    sort: 0,
  },
  PoolUSDT: {
    contract: 'Pool_USDT',
    collateralTokenName: 'USDT',
    finished: true,
    networks: [ChainId.MAINNET, ChainId.RINKEBY, 1337],
    sort: 0,
  },
};


export const stakingContracts: StakingContract[] = [
  {
    platform: 'uniswap',
    contract: 'StakeARTHWETH',
    kind: 'vested',
    depositToken: 'ArthWethLP',
    depositTokenSymbols: ['ARTH', 'WETH'],
    depositTokenKind: 'single',
    earnTokenName: 'ARTHX',
    finished: false,
    networks: [ChainId.MAINNET, ChainId.RINKEBY, 1337],
    sort: 0,
    categories: ['all', 'arth'],
  },
  // { // NOT yet deployed.
  //   platform: 'uniswap',
  //   contract: 'StakeARTHMAHA',
  //   kind: 'vested',
  //   depositToken: 'ArthWethLP',
  //   depositTokenSymbols: ['MAHA', 'WETH'],
  //   depositTokenKind: 'single',
  //   earnTokenName: 'ARTHX',
  //   finished: false,
  //   networks: [ChainId.MAINNET, ChainId.RINKEBY, 1337],
  //   sort: 0,
  //   categories: ['all', 'maha'],
  // },
  {
    platform: 'uniswap',
    contract: 'StakeARTHXWETH',
    kind: 'vested',
    depositToken: 'ArthxWethLP',
    depositTokenSymbols: ['ARTHX', 'WETH'],
    depositTokenKind: 'single',
    earnTokenName: 'ARTHX',
    finished: false,
    networks: [ChainId.MAINNET, ChainId.RINKEBY, 1337],
    sort: 0,
    categories: ['all', 'arthx'],
  },
  {
    platform: 'arth',
    contract: 'StakeARTHX',
    kind: 'vested',
    depositToken: 'ARTHX',
    depositTokenSymbols: ['ARTHX'],
    depositTokenKind: 'single',
    earnTokenName: 'MAHA',
    finished: false,
    networks: [ChainId.MAINNET, ChainId.RINKEBY, 1337],
    sort: 0,
    categories: ['all', 'arthx'],
  },
  {
    platform: 'uniswap',
    contract: 'StakeARTHMAHA',
    kind: 'vested',
    depositToken: 'ArthMahaLP',
    depositTokenSymbols: ['ARTH', 'MAHA'],
    depositTokenKind: 'single',
    earnTokenName: 'MAHA',
    finished: false,
    networks: [ChainId.MAINNET, ChainId.RINKEBY, 1337],
    sort: 0,
    categories: ['all', 'maha', 'arth'],
  },
  {
    platform: 'arth',
    contract: 'StakeARTH',
    kind: 'vested',
    depositToken: 'ARTH',
    depositTokenSymbols: ['ARTH'],
    depositTokenKind: 'single',
    earnTokenName: 'MAHA',
    finished: false,
    networks: [ChainId.MAINNET, ChainId.RINKEBY, 1337],
    sort: 0,
    categories: ['all', 'arth'],
  },
];


export const tradingPairs: TradingPairs[] = [
  // { // NOT yet deployed
  //   tokens: ['MAHA', 'WETH'],
  //   paltform: 'uniswapV2'
  // },
  {
    tokens: ['MAHA', 'ARTH'],
    paltform: 'uniswapV2'
  },
  {
    tokens: ['ARTH', 'WETH'],
    paltform: 'uniswapV2'
  },
  {
    tokens: ['ARTHX', 'WETH'],
    paltform: 'uniswapV2'
  },
];


export default configurations['staging'];
