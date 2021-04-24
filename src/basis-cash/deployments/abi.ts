export const ArthController = require('./abi/ArthController.json')
export const ARTHShares = require('./abi/ARTHShares.json')
export const IERC20 = require('./abi/IERC20.json')
export const MahaToken = require('./abi/MahaToken.json')
export const UniswapPairOracle = require('./abi/UniswapPairOracle.json')
export const UniswapV2Router02 = require('./abi/UniswapV2Router02.json')
export const ArthPool = require('./abi/ArthPool.json')
export const ARTHStablecoin = require('./abi/ARTHStablecoin.json')
export const IWETH = require('./abi/IWETH.json')
export const StakingRewards = require('./abi/StakingRewards.json')
export const UniswapV2Factory = require('./abi/UniswapV2Factory.json')
export const Multicall = require('./abi/Multicall.json')


type IABIS = {
  [key: string]: any[]
}

const ret: IABIS = {
  Multicall,
  ArthController,
  ARTHShares,
  IERC20,
  MahaToken,
  UniswapPairOracle,
  UniswapV2Router02,
  ArthPool,
  ARTHStablecoin,
  IWETH,
  StakingRewards,
  UniswapV2Factory,

}

export default ret
