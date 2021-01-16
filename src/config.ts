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
      'DAI': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'MKR': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'BAS': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'SHARE': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 9],
      'COMP': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'ESD': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'SUSHI': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'CURVE': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'FRAX': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'MAHA': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'YFI': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'DSD': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'MATIC': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'RSR': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],

      'MAHA_ETH-UNI-LPv2': ['0xB76D9d8eF433AD706F8bA0aD200BD457bD5861C8', 18],
      'ARTH_DAI-UNI-LPv2': ['0x9F318F6670f0949d4F3676bd7F374f0eACA242a8', 18]
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
      DAI: ['0x760AE87bBCEFa2CF76B6E0F9bCe80c1408764936', 18],
      yCRV: ['0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8', 18],
      SUSD: ['0x57Ab1E02fEE23774580C119740129eAC7081e9D3', 18],

      USDC: ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6],
      USDT: ['0xdAC17F958D2ee523a2206206994597C13D831ec7', 6],
      'ARTH_DAI-UNI-LPv2': ['0x80189479C870D3808BcDE2BFDB5d70a9EbD9fECd', 18],
    },
    uniswapRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    baseLaunchDate: new Date('2020-11-26T00:00:00Z'),
    bondLaunchesAt: new Date('2021-01-20T15:00:00Z'),
    boardroomLaunchesAt: new Date('2021-01-20T15:00:00Z'),
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
  production: {
    chainId: ChainId.MAINNET,
    etherscanUrl: 'https://etherscan.io',
    defaultProvider: 'https://ancient-young-wave.quiknode.io/f13a565e-d520-49bb-8109-b6278531d848/TD7pzD7xEEC-ppMyv475dYkhgEYWh-Ev4zyPEiGValWQ76lrBPMuGhoJjLflw3KRBvt1ytsJ4IrpXajUC5XbkQ==/',
    deployments: require('./basis-cash/deployments/deployments.mainnet.json'),
    externalTokens: {
      'DAI': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'MKR': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'BAS': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'SHARE': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 9],
      'COMP': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'ESD': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'SUSHI': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'CURVE': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'FRAX': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'MAHA': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'YFI': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'DSD': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'MATIC': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],
      'RSR': ['0x0f040ed37C0cAB55305dE16ADC6c8114E289942B', 18],

      'MAHA_ETH-UNI-LPv2': ['0xc0897d6ba893e31f42f658eead777aa15b8f824d', 18],
      'ARTH_DAI-UNI-LPv2': ['0x5E5aCce4fFb60048BaB967DCADD293dA07093ac3', 18]
    },

    uniswapRouter: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',

    baseLaunchDate: new Date('2021-01-15T14:00:00Z'),
    bondLaunchesAt: new Date('2021-01-21T15:00:00Z'),
    boardroomLaunchesAt: new Date('2021-01-21T15:00:00Z'),
    refreshInterval: 30000,
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
  ARTHMKRPool: {
    name: 'Deposit $MKR and Earn $ARTH',
    contract: 'ARTHMKRPool',
    depositTokenName: 'MKR',
    earnTokenName: 'ARTH',
    poolRewards: 12500,
    finished: false,
    sort: 3,

    poolDurationInDays: 5,
    poolSize: 8334,
  },
  ARTHSHAREPool: {
    name: 'Deposit $SHARE and Earn $ARTH',
    contract: 'ARTHSHAREPool',
    depositTokenName: 'SHARE',
    earnTokenName: 'ARTH',
    poolRewards: 12500,
    finished: false,
    sort: 3,

    poolDurationInDays: 5,
    poolSize: 21551725,
  },
  ARTHCOMPool: {
    name: 'Deposit $COMP and Earn $ARTH',
    contract: 'ARTHCOMPool',
    poolRewards: 12500,
    depositTokenName: 'COMP',
    earnTokenName: 'ARTH',
    finished: false,
    sort: 3,

    poolDurationInDays: 5,
    poolSize: 80397,
  },
  ARTHESDPool: {
    name: 'Deposit $ESD and Earn $ARTH',
    contract: 'ARTHESDPool',
    poolRewards: 12500,
    depositTokenName: 'ESD',
    earnTokenName: 'ARTH',
    finished: false,
    sort: 3,

    poolDurationInDays: 5,
    poolSize: 19230770,
  },
  ARTHMahaEthLPPool: {
    name: 'Deposit $MAHA_ETH-UNI-LPv2 and Earn $ARTH',
    contract: 'ARTHMahaEthLPPool',
    depositTokenName: 'MAHA_ETH-UNI-LPv2',
    poolRewards: 12500,
    earnTokenName: 'ARTH',
    finished: false,
    sort: 2,

    poolDurationInDays: 5,
    poolSize: Infinity,
  },
  ARTHSUSHIPool: {
    name: 'Deposit $SUSHI and Earn $ARTH',
    contract: 'ARTHSUSHIPool',
    depositTokenName: 'SUSHI',
    poolRewards: 12500,
    earnTokenName: 'ARTH',
    finished: false,
    sort: 3,

    poolDurationInDays: 5,
    poolSize: 3881988,
  },
  ARTHCURVEPool: {
    name: 'Deposit $CURVE and Earn $ARTH',
    contract: 'ARTHCURVEPool',
    poolRewards: 12500,
    depositTokenName: 'CURVE',
    earnTokenName: 'ARTH',
    finished: false,
    sort: 3,

    poolDurationInDays: 5,
    poolSize: 10593221,
  },
  ARTHFRAXPool: {
    name: 'Deposit $FRAX and Earn $ARTH',
    contract: 'ARTHFRAXPool',
    depositTokenName: 'FRAX',
    earnTokenName: 'ARTH',
    poolRewards: 12500,
    finished: false,
    sort: 3,

    poolDurationInDays: 5,
    poolSize: 901226,
  },
  ARTHMahaPool: {
    name: 'Deposit $MAHA and Earn $ARTH',
    contract: 'ARTHMahaPool',
    depositTokenName: 'MAHA',
    earnTokenName: 'ARTH',
    poolRewards: 150000,
    finished: false,
    sort: 2,

    poolDurationInDays: 5,
    poolSize: Infinity,
  },
  ARTHYFIPool: {
    name: 'Deposit $YFI and Earn $ARTH',
    contract: 'ARTHYFIPool',
    depositTokenName: 'YFI',
    poolRewards: 12500,
    earnTokenName: 'ARTH',
    finished: false,
    sort: 3,

    poolDurationInDays: 5,
    poolSize: 455,
  },
  ARTHDSDPool: {
    name: 'Deposit $DSD and Earn $ARTH',
    contract: 'ARTHDSDPool',
    depositTokenName: 'DSD',
    poolRewards: 12500,
    earnTokenName: 'ARTH',
    finished: false,
    sort: 3,

    poolDurationInDays: 5,
    poolSize: 19531250,
  },
  ARTHMATICPool: {
    name: 'Deposit $MATIC and Earn $ARTH',
    contract: 'ARTHMATICPool',
    depositTokenName: 'MATIC',
    poolRewards: 12500,
    earnTokenName: 'ARTH',
    finished: false,
    sort: 3,

    poolDurationInDays: 5,
    poolSize: 41666667,
  },
  ARTHRSRPool: {
    name: 'Deposit $RSR and Earn $ARTH',
    contract: 'ARTHRSRPool',
    depositTokenName: 'RSR',
    poolRewards: 12500,
    earnTokenName: 'ARTH',
    finished: false,
    sort: 3,

    poolDurationInDays: 5,
    poolSize: 416666667,
  },

  MAHAARTHPool: {
    name: 'Deposit $ARTH and Earn $MAHA',
    contract: 'MAHAARTHPool',
    depositTokenName: 'ARTH',
    earnTokenName: 'MAHA',
    poolRewards: 4000,
    finished: false,
    sort: 1,

    poolDurationInDays: 5,
    poolSize: Infinity,
  },

  MAHAMAHAETHLPTokenPool: {
    name: 'Deposit $MAHA_ETH-UNI-LPv2 and Earn $MAHA',
    contract: 'MAHAMAHAETHLPTokenPool',
    depositTokenName: 'MAHA_ETH-UNI-LPv2',
    earnTokenName: 'MAHA',
    poolRewards: 2000,
    finished: false,
    sort: 1,

    poolDurationInDays: 5,
    poolSize: Infinity,
  },
  MAHADAIARTHLPTokenPool: {
    name: 'Deposit $ARTH_DAI-UNI-LPv2 and Earn $MAHA',
    contract: 'MAHADAIARTHLPTokenPool',
    depositTokenName: 'ARTH_DAI-UNI-LPv2',
    earnTokenName: 'MAHA',
    poolRewards: 4000,
    finished: false,
    sort: 1,

    poolDurationInDays: 5,
    poolSize: Infinity,
  },
};

// export default configurations[process.env.NODE_ENV || "production"];
export default configurations["development"];