export const ArthController = require('./abi/ArthController.json')
export const ArthPool = require('./abi/ArthPool.json')
export const ArthPoolLibrary = require('./abi/ArthPoolLibrary.json')
export const ArthPoolRouter = require('./abi/ArthPoolRouter.json')
export const ARTHShares = require('./abi/ARTHShares.json')
export const ARTHStablecoin = require('./abi/ARTHStablecoin.json')
export const BoostedStaking = require('./abi/BoostedStaking.json')
export const GMUOracle = require('./abi/GMUOracle.json')
export const IERC20 = require('./abi/IERC20.json')
export const IWETH = require('./abi/IWETH.json')
export const MahaToken = require('./abi/MahaToken.json')

export const Multicall = require('./abi/Multicall.json')
export const Oracle = require('./abi/Oracle.json')
export const SimpleOracle = require('./abi/SimpleOracle.json')
export const UniswapPairOracle = require('./abi/UniswapPairOracle.json')
export const UniswapV2Factory = require('./abi/UniswapV2Factory.json')
export const UniswapV2Router02 = require('./abi/UniswapV2Router02.json')
export const UniswapV2Pair = require('./abi/UniswapV2Pair.json')


type IABIS = {
  [key: string]: any[]
}

const ret: IABIS = {
  ArthController,
  ArthPool,
  ArthPoolLibrary,
  ArthPoolRouter,
  ARTHShares,
  ARTHStablecoin,
  BoostedStaking,
  GMUOracle,
  UniswapV2Pair,
  IERC20,
  IWETH,
  MahaToken,

  Multicall,
  Oracle,
  SimpleOracle,
  UniswapPairOracle,
  UniswapV2Factory,
  UniswapV2Router02,
}

export default ret
