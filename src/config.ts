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
      'DAI': ['0xa0763Dd7885727056A22486a049D10e76c36cfC2', 18],
      'MKR': ['0xa0763Dd7885727056A22486a049D10e76c36cfC2', 18],
      'BAS': ['0xa0763Dd7885727056A22486a049D10e76c36cfC2', 18],
      'SHARE': ['0xa0763Dd7885727056A22486a049D10e76c36cfC2', 9],
      'COMP': ['0xa0763Dd7885727056A22486a049D10e76c36cfC2', 18],
      'ESD': ['0xa0763Dd7885727056A22486a049D10e76c36cfC2', 18],
      'SUSHI': ['0xa0763Dd7885727056A22486a049D10e76c36cfC2', 18],
      'CURVE': ['0xa0763Dd7885727056A22486a049D10e76c36cfC2', 18],
      'FRAX': ['0xa0763Dd7885727056A22486a049D10e76c36cfC2', 18],
      'MAHA': ['0xa0763Dd7885727056A22486a049D10e76c36cfC2', 18],
      'YFI': ['0xa0763Dd7885727056A22486a049D10e76c36cfC2', 18],
      'DSD': ['0xa0763Dd7885727056A22486a049D10e76c36cfC2', 18],
      'MATIC': ['0xa0763Dd7885727056A22486a049D10e76c36cfC2', 18],
      'RSR': ['0xa0763Dd7885727056A22486a049D10e76c36cfC2', 18],

      'MAHA_ETH-UNI-LPv2': ['0x59e826472b40165401Bf8b27C0d77A639Ec452d6', 18],
      'ARTH_DAI-UNI-LPv2': ['0xBE515C54eaC980317Ed858749Ab9Ddf381bd69b5', 18]
    },
    uniswapRouter: '0x4dC2c34dE248aE0c8FC9091C503729409b94E5db',

    baseLaunchDate: new Date('2021-01-15T14:00:00Z'),
    bondLaunchesAt: new Date('2021-01-21T15:00:00Z'),
    boardroomLaunchesAt: new Date('2021-01-21T15:00:00Z'),
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
  staging: {
    chainId: ChainId.ROPSTEN,
    etherscanUrl: 'https://ropsten.etherscan.io',
    defaultProvider: 'https://weathered-young-wave.quiknode.io/75809a67-435c-4d8b-a287-649990316295/IHZHq4dJhpdQq85_QIA5Uidl_btMGwikH8tF3VNPZsgoFhaetWDXXdmkavW1TaTf5JrVwFWnMsx8aJ-fR01pTg==/',
    deployments: require('./basis-cash/deployments/deployments.ropsten.json'),
    externalTokens: {
      DAI: ['0xCa168E1c99257d58a0CC304a6Af8cF70D0F28512', 18],
      'MKR': ['0xCa168E1c99257d58a0CC304a6Af8cF70D0F28512', 18],
      'BAS': ['0xCa168E1c99257d58a0CC304a6Af8cF70D0F28512', 18],
      'SHARE': ['0xCa168E1c99257d58a0CC304a6Af8cF70D0F28512', 9],
      'COMP': ['0xCa168E1c99257d58a0CC304a6Af8cF70D0F28512', 18],
      'ESD': ['0xCa168E1c99257d58a0CC304a6Af8cF70D0F28512', 18],
      'SUSHI': ['0xCa168E1c99257d58a0CC304a6Af8cF70D0F28512', 18],
      'CURVE': ['0xCa168E1c99257d58a0CC304a6Af8cF70D0F28512', 18],
      'FRAX': ['0xCa168E1c99257d58a0CC304a6Af8cF70D0F28512', 18],
      'MAHA': ['0xa0763Dd7885727056A22486a049D10e76c36cfC2', 18],
      'YFI': ['0xCa168E1c99257d58a0CC304a6Af8cF70D0F28512', 18],
      'DSD': ['0xCa168E1c99257d58a0CC304a6Af8cF70D0F28512', 18],
      'MATIC': ['0xCa168E1c99257d58a0CC304a6Af8cF70D0F28512', 18],
      'RSR': ['0xCa168E1c99257d58a0CC304a6Af8cF70D0F28512', 18],

      'MAHA_ETH-UNI-LPv2': ['0xb08d2aF7a27859931CD46f6CC28715f821891e35', 18],
      'ARTH_DAI-UNI-LPv2': ['0x49Ea03C06213595B2b7f82daDf44a510dCFB59cA', 18]
    },
    uniswapRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',

    baseLaunchDate: new Date('2021-01-15T14:00:00Z'),
    bondLaunchesAt: new Date('2021-01-15T14:00:00Z'),
    boardroomLaunchesAt: new Date('2021-01-15T14:00:00Z'),

    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
  production: {
    chainId: ChainId.MAINNET,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: 'https://ancient-young-wave.quiknode.io/f13a565e-d520-49bb-8109-b6278531d848/TD7pzD7xEEC-ppMyv475dYkhgEYWh-Ev4zyPEiGValWQ76lrBPMuGhoJjLflw3KRBvt1ytsJ4IrpXajUC5XbkQ==/',
    deployments: require('./basis-cash/deployments/deployments.mainnet.json'),
    externalTokens: {
      DAI: ['0x6b175474e89094c44da98b954eedeac495271d0f', 18],
      yCRV: ['0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8', 18],
      BAL: ['0xba100000625a3754423978a60c9317c58a424e3d', 18],
      BAS: ['0xa7ed29b253d8b4e3109ce07c80fc570f81b63696', 18],
      BNB: ['0xB8c77482e45F1F44dE1745F52C74426C631bDD52', 18],
      BAC: ['0x3449fc1cd036255ba1eb19d65ff4ba2b8903a69a', 18],
      BUSD: ['0x4fabb145d64652a948d72533023f6e7a623c7c53', 18],
      COMP: ['0xc00e94cb662c3520282e6f5717214004a7f26888', 18],
      CREAM: ['0x2ba592f78db6436527729929aaf6c908497cb200', 18],
      CURVE: ['0xd533a949740bb3306d119cc777fa900ba034cd52', 18],
      ARTH: ['0x0E3cC2c4FB9252d17d07C67135E48536071735D9', 18],
      DSD: ['0xbd2f0cd039e0bfcf88901c98c0bfac5ab27566e3', 18],
      ESD: ['0x36f3fd68e7325a35eb768f1aedaae9ea0689d723', 18],
      FXS: ['0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0', 18],
      FTT: ['0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9', 18],
      YFI: ['0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e', 18],
      HT: ['0x6f259637dcd74c767781e37bc6133cd6a68aa161', 18],
      KCS: ['0x039b5649a59967e3e936d7471f9c3700100ee1ab', 18],
      LEO: ['0x2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3', 18],
      LINK: ['0x20fe562d797a42dcb3399062ae9546cd06f63280', 18],
      MAHA: ['0xb4d930279552397bba2ee473229f89ec245bc365', 18],
      MATIC: ['0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0', 18],
      SHARE: ['0x39795344cbcc76cc3fb94b9d1b15c23c2070c66d', 9],
      MIS: ['0x4b4d2e899658fb59b1d518b68fe836b100ee8958', 18],
      MKR: ['0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2', 18],
      RSR: ['0x8762db106b2c2a0bccb3a80d1ed41273552616e8', 18],
      SUSHI: ['0x6b3595068778dd592e39a122f4f5a5cf09c90fe2', 18],

      'MAHA_ETH-UNI-LPv2': ['0xc0897d6ba893e31f42f658eead777aa15b8f824d', 18],
      'ARTH_DAI-UNI-LPv2': ['0x35b6f9e6300aa6c722ea189e096b0b073025806f', 18]
    },

    uniswapRouter: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',

    baseLaunchDate: new Date('2021-01-15T14:00:00Z'),
    bondLaunchesAt: new Date('2021-01-21T15:00:00Z'),
    boardroomLaunchesAt: new Date('2021-01-21T15:00:00Z'),
    refreshInterval: 3000,
    gasLimitMultiplier: 1.7,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  ARTHBASPool: {
    name: 'Deposit $BAS and Earn $ARTH',
    contract: 'ARTHBASPool',
    depositTokenName: 'BAS',
    poolRewards: 12500,
    earnTokenName: 'ARTH',
    finished: false,

    poolDurationInDays: 5,
    poolSize: 84460,

    sort: 3,
  },
  // ARTHMKRPool: {
  //   name: 'Deposit $MKR and Earn $ARTH',
  //   contract: 'ARTHMKRPool',
  //   depositTokenName: 'MKR',
  //   earnTokenName: 'ARTH',
  //   poolRewards: 12500,
  //   finished: false,
  //   sort: 3,

  //   poolDurationInDays: 5,
  //   poolSize: 8334,
  // },
  // ARTHSHAREPool: {
  //   name: 'Deposit $SHARE and Earn $ARTH',
  //   contract: 'ARTHSHAREPool',
  //   depositTokenName: 'SHARE',
  //   earnTokenName: 'ARTH',
  //   poolRewards: 12500,
  //   finished: false,
  //   sort: 3,

  //   poolDurationInDays: 5,
  //   poolSize: 21551725,
  // },
  // ARTHCOMPool: {
  //   name: 'Deposit $COMP and Earn $ARTH',
  //   contract: 'ARTHCOMPool',
  //   poolRewards: 12500,
  //   depositTokenName: 'COMP',
  //   earnTokenName: 'ARTH',
  //   finished: false,
  //   sort: 3,

  //   poolDurationInDays: 5,
  //   poolSize: 80397,
  // },
  // ARTHESDPool: {
  //   name: 'Deposit $ESD and Earn $ARTH',
  //   contract: 'ARTHESDPool',
  //   poolRewards: 12500,
  //   depositTokenName: 'ESD',
  //   earnTokenName: 'ARTH',
  //   finished: false,
  //   sort: 3,

  //   poolDurationInDays: 5,
  //   poolSize: 19230770,
  // },
  // ARTHMahaEthLPPool: {
  //   name: 'Deposit $MAHA_ETH-UNI-LPv2 and Earn $ARTH',
  //   contract: 'ARTHMahaEthLPPool',
  //   depositTokenName: 'MAHA_ETH-UNI-LPv2',
  //   poolRewards: 150000,
  //   earnTokenName: 'ARTH',
  //   finished: false,
  //   sort: 1,

  //   poolDurationInDays: 5,
  //   poolSize: Infinity,
  // },
  // ARTHSUSHIPool: {
  //   name: 'Deposit $SUSHI and Earn $ARTH',
  //   contract: 'ARTHSUSHIPool',
  //   depositTokenName: 'SUSHI',
  //   poolRewards: 12500,
  //   earnTokenName: 'ARTH',
  //   finished: false,
  //   sort: 3,

  //   poolDurationInDays: 5,
  //   poolSize: 3881988,
  // },
  // ARTHCURVEPool: {
  //   name: 'Deposit $CURVE and Earn $ARTH',
  //   contract: 'ARTHCURVEPool',
  //   poolRewards: 12500,
  //   depositTokenName: 'CURVE',
  //   earnTokenName: 'ARTH',
  //   finished: false,
  //   sort: 3,

  //   poolDurationInDays: 5,
  //   poolSize: 10593221,
  // },
  // ARTHFRAXPool: {
  //   name: 'Deposit $FXS and Earn $ARTH',
  //   contract: 'ARTHFRAXPool',
  //   depositTokenName: 'FXS',
  //   earnTokenName: 'ARTH',
  //   poolRewards: 12500,
  //   finished: false,
  //   sort: 3,

  //   poolDurationInDays: 5,
  //   poolSize: 901226,
  // },
  // ARTHMahaPool: {
  //   name: 'Deposit $MAHA and Earn $ARTH',
  //   contract: 'ARTHMahaPool',
  //   depositTokenName: 'MAHA',
  //   earnTokenName: 'ARTH',
  //   poolRewards: 150000,
  //   finished: false,
  //   sort: 2,

  //   poolDurationInDays: 5,
  //   poolSize: Infinity,
  // },
  // ARTHYFIPool: {
  //   name: 'Deposit $YFI and Earn $ARTH',
  //   contract: 'ARTHYFIPool',
  //   depositTokenName: 'YFI',
  //   poolRewards: 12500,
  //   earnTokenName: 'ARTH',
  //   finished: false,
  //   sort: 3,

  //   poolDurationInDays: 5,
  //   poolSize: 455,
  // },
  // ARTHDSDPool: {
  //   name: 'Deposit $DSD and Earn $ARTH',
  //   contract: 'ARTHDSDPool',
  //   depositTokenName: 'DSD',
  //   poolRewards: 12500,
  //   earnTokenName: 'ARTH',
  //   finished: false,
  //   sort: 3,

  //   poolDurationInDays: 5,
  //   poolSize: 19531250,
  // },
  // ARTHMATICPool: {
  //   name: 'Deposit $MATIC and Earn $ARTH',
  //   contract: 'ARTHMATICPool',
  //   depositTokenName: 'MATIC',
  //   poolRewards: 12500,
  //   earnTokenName: 'ARTH',
  //   finished: false,
  //   sort: 3,

  //   poolDurationInDays: 5,
  //   poolSize: 41666667,
  // },
  // ARTHRSRPool: {
  //   name: 'Deposit $RSR and Earn $ARTH',
  //   contract: 'ARTHRSRPool',
  //   depositTokenName: 'RSR',
  //   poolRewards: 12500,
  //   earnTokenName: 'ARTH',
  //   finished: false,
  //   sort: 3,

  //   poolDurationInDays: 5,
  //   poolSize: 416666667,
  // },

  // MAHAARTHPool: {
  //   name: 'Deposit $ARTH and Earn $MAHA',
  //   contract: 'MAHAARTHPool',
  //   depositTokenName: 'ARTH',
  //   earnTokenName: 'MAHA',
  //   poolRewards: 4000,
  //   finished: false,
  //   sort: 1,

  //   poolDurationInDays: 30,
  //   poolSize: Infinity,
  // },

  // MAHAMAHAETHLPTokenPool: {
  //   name: 'Deposit $MAHA_ETH-UNI-LPv2 and Earn $MAHA',
  //   contract: 'MAHAMAHAETHLPTokenPool',
  //   depositTokenName: 'MAHA_ETH-UNI-LPv2',
  //   earnTokenName: 'MAHA',
  //   poolRewards: 2000,
  //   finished: false,
  //   sort: -1,

  //   poolDurationInDays: 30,
  //   poolSize: Infinity,
  // },
  // MAHADAIARTHLPTokenPool: {
  //   name: 'Deposit $ARTH_DAI-UNI-LPv2 and Earn $MAHA',
  //   contract: 'MAHADAIARTHLPTokenPool',
  //   depositTokenName: 'ARTH_DAI-UNI-LPv2',
  //   earnTokenName: 'MAHA',
  //   poolRewards: 4000,
  //   finished: false,
  //   sort: 0,

  //   poolDurationInDays: 30,
  //   poolSize: Infinity,
  // },
};

// export default configurations[process.env.NODE_ENV || "development"];
export default configurations["staging"];
