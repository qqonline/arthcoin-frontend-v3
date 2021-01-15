import { ChainId } from '@uniswap/sdk';
import { Configuration } from './basis-cash/config';
import { BankInfo } from './basis-cash';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: 1337,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: 'http://127.0.0.1:7545',
    deployments: require('./basis-cash/deployments/deployments.development.json'),
    externalTokens: {
      DAI: ['0x8F9ffbc42F1523c475072A930F1c2343Aaf571af', 18],
      yCRV: ['0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8', 18],
      SUSD: ['0x57Ab1E02fEE23774580C119740129eAC7081e9D3', 18],
      USDC: ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6],
      USDT: ['0xdAC17F958D2ee523a2206206994597C13D831ec7', 6],
      'ARTH_DAI-UNI-LPv2': ['0x41284a876508E19d80339f9F8935eF24235E5852', 18]
    },
    uniswapFactory: '0x4dC2c34dE248aE0c8FC9091C503729409b94E5db',

    baseLaunchDate: new Date('2021-01-20T15:00:00Z'),
    bondLaunchesAt: new Date('2021-01-20T15:00:00Z'),
    boardroomLaunchesAt: new Date('2021-01-20T15:00:00Z'),
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
  staging: {
    chainId: ChainId.ROPSTEN,
    etherscanUrl: 'https://ropsten.etherscan.io',
    defaultProvider: 'https://weathered-young-wave.quiknode.io/75809a67-435c-4d8b-a287-649990316295/IHZHq4dJhpdQq85_QIA5Uidl_btMGwikH8tF3VNPZsgoFhaetWDXXdmkavW1TaTf5JrVwFWnMsx8aJ-fR01pTg==/',
    deployments: require('./basis-cash/deployments/deployments.ropsten.json'),
    externalTokens: {
      DAI: ['0x760AE87bBCEFa2CF76B6E0F9bCe80c1408764936', 18],
      yCRV: ['0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8', 18],
      SUSD: ['0x57Ab1E02fEE23774580C119740129eAC7081e9D3', 18],

      USDC: ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6],
      USDT: ['0xdAC17F958D2ee523a2206206994597C13D831ec7', 6],
      'ARTH_DAI-UNI-LPv2': ['0x80189479C870D3808BcDE2BFDB5d70a9EbD9fECd', 18],
    },
    uniswapFactory: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    baseLaunchDate: new Date('2020-11-26T00:00:00Z'),
    bondLaunchesAt: new Date('2021-01-20T15:00:00Z'),
    boardroomLaunchesAt: new Date('2021-01-20T15:00:00Z'),
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
  production: {
    chainId: ChainId.MAINNET,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: 'https://mainnet.infura.io/v3/69666afe933b4175afe4999170158a5f',
    deployments: require('./basis-cash/deployments/deployments.mainnet.json'),
    externalTokens: {
      DAI: ['0x6B175474E89094C44Da98b954EedeAC495271d0F', 18],
      yCRV: ['0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8', 18],
      SUSD: ['0x57Ab1E02fEE23774580C119740129eAC7081e9D3', 18],
      USDC: ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6],
      USDT: ['0xdAC17F958D2ee523a2206206994597C13D831ec7', 6],

      'BAC_DAI-UNI-LPv2': ['0xd4405F0704621DBe9d4dEA60E128E0C3b26bddbD', 18],
      'BAS_DAI-UNI-LPv2': ['0x0379dA7a5895D13037B6937b109fA8607a659ADF', 18],
    },
    uniswapFactory: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',

    baseLaunchDate: new Date('2020-11-29T23:00:00Z'),
    bondLaunchesAt: new Date('2020-12-05T00:00:00Z'),
    boardroomLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 30000,
    gasLimitMultiplier: 1.7,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  // BACDAIPool: {
  //   name: 'Earn ARTH by DAI',
  //   contract: 'BACDAIPool',
  //   depositTokenName: 'DAI',
  //   earnTokenName: 'ARTH',
  //   finished: true,
  //   sort: 3,
  // },
  // BACUSDCPool: {
  //   name: 'Earn ARTH by USDC',
  //   contract: 'BACUSDCPool',
  //   depositTokenName: 'USDC',
  //   earnTokenName: 'ARTH',
  //   finished: false,
  //   sort: 4,
  // },
  // BACSUSDPool: {
  //   name: 'Earn ARTH by sUSD',
  //   contract: 'BACSUSDPool',
  //   depositTokenName: 'SUSD',
  //   earnTokenName: 'ARTH',
  //   finished: false,
  //   sort: 5,
  // },
  // BACUSDTPool: {
  //   name: 'Earn ARTH by USDT',
  //   contract: 'BACUSDTPool',
  //   depositTokenName: 'USDT',
  //   earnTokenName: 'ARTH',
  //   finished: true,
  //   sort: 6,
  // },
  // BACyCRVPool: {
  //   name: 'Earn ARTH by yCRV',
  //   contract: 'BACyCRVPool',
  //   depositTokenName: 'yCRV',
  //   earnTokenName: 'ARTH',
  //   finished: true,
  //   sort: 7,
  // },
  // DAIBACLPTokenSharePool: {
  //   name: 'Earn MAHA by ARTH-DAI-LP',
  //   contract: 'DAIBACLPTokenSharePool',
  //   depositTokenName: 'BAC_DAI-UNI-LPv2',
  //   earnTokenName: 'MAHA',
  //   finished: false,
  //   sort: 1,
  // },
  // DAIBASLPTokenSharePool: {
  //   name: 'Earn MAHA by MAHA-DAI-LP',
  //   contract: 'DAIBASLPTokenSharePool',
  //   depositTokenName: 'BAS_DAI-UNI-LPv2',
  //   earnTokenName: 'MAHA',
  //   finished: false,
  //   sort: 2,
  // },
};

// export default configurations[process.env.NODE_ENV || "production"];
export default configurations["staging"];