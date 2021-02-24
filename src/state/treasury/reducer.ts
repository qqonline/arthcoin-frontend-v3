import { createReducer } from '@reduxjs/toolkit';
import { BigNumber } from 'ethers';
import { TreasuryBoardroomState, TreasuryCoreState, TreasuryOracleState } from '../../basis-cash/types';
import * as Actions from './actions';


export interface TreasuryState {
  nextEpochPoint: number
  period: number
  currentEpoch: number

  getGMUOraclePrice: BigNumber,
  get12hrTWAPOraclePrice: BigNumber,
  get1hrTWAPOraclePrice: BigNumber,
  bondCirculatingSupply: BigNumber,
  arthCirculatingSupply: BigNumber,

  coreState: TreasuryCoreState
  oracleState: TreasuryOracleState
  boardroomState: TreasuryBoardroomState
}

export const initialState: TreasuryState = {
  nextEpochPoint: 0,
  currentEpoch: 0,
  period: 0,

  getGMUOraclePrice: BigNumber.from(0),
  get12hrTWAPOraclePrice: BigNumber.from(0),
  get1hrTWAPOraclePrice: BigNumber.from(0),
  bondCirculatingSupply: BigNumber.from(0),
  arthCirculatingSupply: BigNumber.from(0),

  // getBondRedemtionPrice
  // getExpansionLimitPrice
  // getBondPurchasePrice
  // getCashSupplyInLiquidity

  coreState: {
    uniswapRouter: null,
    uniswapLiquidityPair: null,
    cashTargetPrice: BigNumber.from(0),
    cashToBondConversionLimit: BigNumber.from(0),
    accumulatedBonds: BigNumber.from(0),
    accumulatedSeigniorage: BigNumber.from(0),
    contractionRewardPerEpoch: BigNumber.from(0),
  },

  oracleState: {
    oracle1hrTWAP: null,
    oracle12hrTWAP: null,
    gmuOracle: null
  },

  boardroomState: {
    arthArthLiquidityMlpBoardroom: null,
    arthMahaBoardroom: null,
    arthArthBoardroom: null,
    mahaArthLiquidityMlpBoardroom: null,
    mahaMahaBoardroom: null,
    mahaArthBoardroom: null,
    ecosystemFund: null,
    rainyDayFund: null,
    arthLiquidityMlpAllocationRate: BigNumber.from(0),
    arthAllocationRate: BigNumber.from(0),
    mahaAllocationRate: BigNumber.from(0),
    ecosystemFundAllocationRate: BigNumber.from(0),
    rainyDayFundAllocationRate: BigNumber.from(0),
  }
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(Actions.updateNextEpochPoint, (t, { payload }) => { t.nextEpochPoint = payload })
    .addCase(Actions.updatePeriod, (t, { payload }) => { t.period = payload })
    .addCase(Actions.updateCurrentEpoch, (t, { payload }) => { t.currentEpoch = payload })

    .addCase(Actions.updateGetGMUOraclePrice, (t, { payload }) => { t.getGMUOraclePrice = payload })
    .addCase(Actions.updateGet12hrTWAPOraclePrice, (t, { payload }) => { t.get12hrTWAPOraclePrice = payload })
    .addCase(Actions.updateGet1hrTWAPOraclePrice, (t, { payload }) => { t.get1hrTWAPOraclePrice = payload })
    .addCase(Actions.updateBondCirculatingSupply, (t, { payload }) => { t.bondCirculatingSupply = payload })
    .addCase(Actions.updateArthCirculatingSupply, (t, { payload }) => { t.arthCirculatingSupply = payload })

    .addCase(Actions.updateState, (t, {payload}) => {
      t.coreState = {
        uniswapRouter: payload.s.uniswapRouter,
        uniswapLiquidityPair: payload.s.uniswapLiquidityPair,
        cashTargetPrice: payload.s.cashTargetPrice,
        cashToBondConversionLimit: payload.s.cashToBondConversionLimit,
        accumulatedBonds: payload.s.accumulatedBonds,
        accumulatedSeigniorage: payload.s.accumulatedSeigniorage,
        contractionRewardPerEpoch: payload.s.contractionRewardPerEpoch,
      }
      t.oracleState = payload.o;
      t.boardroomState = payload.b;
    })
);
