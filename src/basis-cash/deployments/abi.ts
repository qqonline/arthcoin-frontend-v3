export const IWETH = require('./abi/IWETH.json');
export const Oracle = require('./abi/Oracle.json');
export const Faucet = require('./abi/Faucet.json');
export const IERC20 = require('./abi/IERC20.json');
export const Genesis = require('./abi/Genesis.json');
export const ArthPool = require('./abi/ArthPool.json');
export const MahaToken = require('./abi/MahaToken.json');
export const GMUOracle = require('./abi/GMUOracle.json');
export const PoolToken = require('./abi/PoolToken.json');
export const ARTHShares = require('./abi/ARTHShares.json');
export const LotteryRaffle = require('./abi/LotteryRaffle.json');
export const UniswapV2Pair = require('./abi/UniswapV2Pair.json');
export const ARTHStablecoin = require('./abi/ARTHStablecoin.json');
export const BoostedStaking = require('./abi/BoostedStaking.json');
export const ArthPoolRouter = require('./abi/ArthPoolRouter.json');
export const ArthController = require('./abi/ArthController.json');
export const ArthPoolLibrary = require('./abi/ArthPoolLibrary.json');
export const UniswapV2Factory = require('./abi/UniswapV2Factory.json');
export const UniswapPairOracle = require('./abi/UniswapPairOracle.json');
export const UniswapV2Router02 = require('./abi/UniswapV2Router02.json');

type IABIS = {
  [key: string]: any[]
}

const ret: IABIS = {
  Genesis,
  ArthController,
  ArthPool,
  ArthPoolLibrary,
  ArthPoolRouter,
  ARTHShares,
  ARTHStablecoin,
  BoostedStaking,
  Faucet,
  PoolToken,
  GMUOracle,
  IERC20,
  IWETH,
  MahaToken,
  Oracle,
  UniswapPairOracle,
  UniswapV2Factory,
  UniswapV2Pair,
  UniswapV2Router02,
  LotteryRaffle
}

export default ret;
