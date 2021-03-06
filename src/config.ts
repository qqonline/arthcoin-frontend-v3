import { ChainId } from '@uniswap/sdk';

import { CollateralPool } from './basis-cash';
import { Configuration } from './basis-cash/config';
import { StakingContract, TradingPairs, Platform } from './basis-cash/types';

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
    blockchainToken: 'ETH',
    supportedCollaterals: ['USDT', 'USDC', 'WETH', 'WBTC', 'MATIC'],
    arthTradingPairs: ['ETH', 'MAHA'],
    arthxTradingPairs: ['ETH', 'ARTH'],
    platform: 'uniswap',
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
    blockchainToken: 'ETH',
    defaultCollateral: 'USDT',
    supportedCollaterals: ['USDT', 'USDC'],
    arthTradingPairs: ['ETH', 'MAHA'],
    arthxTradingPairs: ['ETH', 'ARTH'],
    platform: 'uniswap',
  },
  stagingMatic: {
    networkName: 'Matic Mumbai Testnet',
    chainId: 80001,
    etherscanUrl: 'https://explorer-mumbai.maticvigil.com',
    defaultProvider: 'https://rpc-mumbai.matic.today',
    deployments: require('./basis-cash/deployments/maticMumbai.json'),
    genesisLaunchDate: new Date('2021-01-15T14:00:00Z'),
    genesisEndDate: new Date('2021-01-15T14:00:00Z'),
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
    defaultCollateral: 'USDT',
    blockchainToken: 'MATIC',
    supportedCollaterals: ['USDT', 'USDC', 'WETH', 'WBTC', 'MATIC'],
    arthTradingPairs: ['ARTHX', 'MAHA'],
    arthxTradingPairs: ['ARTH'],
    platform: 'sushiswap',
  },
  matic: {
    networkName: 'Matic Mainnet',
    chainId: 137,
    etherscanUrl: 'https://polygonscan.com',
    defaultProvider:
      'https://solitary-crimson-wind.matic.quiknode.pro/d9d5c0846efe6098a99c0a8a2c7238692ca33ce0/',
    deployments: require('./basis-cash/deployments/matic.json'),
    genesisLaunchDate: new Date('2021-06-22T15:00:00Z'),
    genesisEndDate: new Date('2021-06-29T15:00:00Z'),
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
    defaultCollateral: 'USDT',
    blockchainToken: 'MATIC',
    supportedCollaterals: ['USDC', 'USDT', 'WBTC', 'WMATIC', 'WETH'],
    arthTradingPairs: ['ARTHX', 'MAHA'],
    arthxTradingPairs: ['ARTH'],
    platform: 'sushiswap',
  },
  ethereum: {
    networkName: 'Ethereum Mainnet',
    chainId: ChainId.MAINNET,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider:
      'https://late-shy-snowflake.quiknode.pro/eb01229dc5e334ee30623ca3236b8156f3f38af6/',
    deployments: require('./basis-cash/deployments/mainnet.json'),
    genesisLaunchDate: new Date('2021-06-22T15:00:00Z'),
    genesisEndDate: new Date('2021-06-29T15:00:00Z'),
    refreshInterval: 3000,
    gasLimitMultiplier: 1.7,
    defaultCollateral: 'WETH',
    blockchainToken: 'ETH',
    arthTradingPairs: ['ETH', 'MAHA'],
    arthxTradingPairs: ['ETH', 'ARTH'],
    supportedCollaterals: ['USDC', 'WBTC', 'MATIC', 'WETH'],
    platform: 'uniswap',
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

export const platformURL: { [platform: string]: Platform } = {
  sushiswap: {
    addLiquidityUrl: 'https://app.sushi.com/add',
    swapUrl: 'https://app.sushi.com/swap',
  },
  dfyn: {
    addLiquidityUrl: 'https://exchange.dfyn.network/#/add',
    swapUrl: 'https://exchange.dfyn.network/#/swap',
  },
  uniswap: {
    addLiquidityUrl: 'https://app.uniswap.org/#/add/v2',
    swapUrl: 'https://app.uniswap.org/#/swap',
  },
};

export const stakingContracts: StakingContract[] = [
  {
    platform: 'sushiswap',
    contract: 'StakeARTHXARTH',
    kind: 'unlocked',
    depositToken: 'ArthArthxLP',
    depositTokenSymbols: ['ARTH', 'ARTHX'],
    depositTokenKind: 'single',
    earnTokenName: 'ARTHX_MAHA_POOL',
    finished: false,
    networks: [ChainId.MAINNET, ChainId.RINKEBY, 1337, 137],
    sort: 0,
    categories: ['all', 'arth'],
  },
  {
    platform: '',
    contract: 'StakeARTHX',
    kind: 'unlocked',
    depositToken: 'ARTHX',
    depositTokenSymbols: ['ARTHX'],
    depositTokenKind: 'single',
    earnTokenName: 'ARTHX_MAHA_POOL',
    finished: false,
    networks: [ChainId.MAINNET, ChainId.RINKEBY, 1337, 137],
    sort: 0,
    categories: ['all', 'arthx'],
  },
  {
    platform: 'sushiswap',
    contract: 'StakeARTHMAHA',
    kind: 'unlocked',
    depositToken: 'ArthMahaLP',
    depositTokenSymbols: ['ARTH', 'MAHA'],
    depositTokenKind: 'single',
    earnTokenName: 'ARTHX_MAHA_POOL',
    finished: false,
    networks: [ChainId.MAINNET, ChainId.RINKEBY, 1337, 137],
    sort: 0,
    categories: ['all', 'maha', 'arth'],
  },
  {
    platform: '',
    contract: 'StakeARTH',
    kind: 'unlocked',
    depositToken: 'ARTH',
    depositTokenSymbols: ['ARTH'],
    depositTokenKind: 'single',
    earnTokenName: 'ARTHX_MAHA_POOL',
    finished: false,
    networks: [ChainId.MAINNET, ChainId.RINKEBY, 1337, 137],
    sort: 0,
    categories: ['all', 'arth'],
  },
];

export const tradingPairs: TradingPairs[] = [
  {
    tokens: ['MAHA', 'ARTH'],
    platform: 'sushiswap',
  },
  {
    tokens: ['ARTHX', 'ARTHX'],
    platform: 'sushiswap',
  },
];

console.log(process.env);
export default configurations[process.env.REACT_APP_NETWORK || 'matic'];
