import { createReducer } from '@reduxjs/toolkit';
import * as Actions from './actions';


export interface TreasuryState {
  nextEpochPoint: number
  period: number
  currentEpoch: number
  cashTargetPrice: number
  cashToBondConversionLimit: number
  accumulatedBonds: number
  accumulatedSeigniorage: number
  maxDebtIncreasePerEpoch: number
  bondDiscount: number
  safetyRegion: number
  maxSupplyIncreasePerEpoch: number
  ecosystemFundAllocationRate: number
  rainyDayFundAllocationRate: number
  bondSeigniorageRate: number
  arthLiquidityUniAllocationRate: number
  arthLiquidityMlpAllocationRate: number
  arthBoardroomAllocationRate: number
  mahaLiquidityBoardroomAllocationRate: number
  stabilityFee: number

  getReserve: number
  getStabilityFee: number
  getBondOraclePrice: number
  getGMUOraclePrice: number
  getArthMahaOraclePrice: number
  getSeigniorageOraclePrice: number
  arthCirculatingSupply: number
  bondCirculatingSupply: number
  getBondRedemtionPrice: number
  getExpansionLimitPrice: number
  getBondPurchasePrice: number
  getCashSupplyInLiquidity: number
  get1hourEpoch: number
}

export const initialState: TreasuryState = {
  nextEpochPoint: 0,
  currentEpoch: 0,
  period: 0,
  cashTargetPrice: 0,
  cashToBondConversionLimit: 0,
  accumulatedBonds: 0,
  accumulatedSeigniorage: 0,
  maxDebtIncreasePerEpoch: 0,
  bondDiscount: 0,
  safetyRegion: 0,
  maxSupplyIncreasePerEpoch: 0,
  ecosystemFundAllocationRate: 0,
  rainyDayFundAllocationRate: 0,
  bondSeigniorageRate: 0,
  arthLiquidityUniAllocationRate: 0,
  arthLiquidityMlpAllocationRate: 0,
  arthBoardroomAllocationRate: 0,
  mahaLiquidityBoardroomAllocationRate: 0,
  stabilityFee: 0,

  getReserve: 0,
  getStabilityFee: 0,
  getBondOraclePrice: 0,
  getGMUOraclePrice: 0,
  getArthMahaOraclePrice: 0,
  getSeigniorageOraclePrice: 0,
  arthCirculatingSupply: 0,
  bondCirculatingSupply: 0,
  getBondRedemtionPrice: 0,
  getExpansionLimitPrice: 0,
  getBondPurchasePrice: 0,
  getCashSupplyInLiquidity: 0,
  get1hourEpoch: 0,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(Actions.updateNextEpochPoint, (t, { payload }) => { t.nextEpochPoint = payload })
    .addCase(Actions.updatePeriod, (t, { payload }) => { t.period = payload })
    .addCase(Actions.updateCurrentEpoch, (t, { payload }) => { t.currentEpoch = payload })
    .addCase(Actions.updateCashTargetPrice, (t, {payload}) => { t.cashTargetPrice = payload })
    .addCase(Actions.updateCashToBondConversionLimit, (t, {payload}) => { t.cashToBondConversionLimit = payload })
    .addCase(Actions.updateAccumulatedBonds, (t, {payload}) => { t.accumulatedBonds = payload })
    .addCase(Actions.updateAccumulatedSeigniorage, (t, {payload}) => { t.accumulatedSeigniorage = payload })
    .addCase(Actions.updateMaxDebtIncreasePerEpoch, (t, {payload}) => { t.maxDebtIncreasePerEpoch = payload })
    .addCase(Actions.updateBondDiscount, (t, {payload}) => { t.bondDiscount = payload })
    .addCase(Actions.updateSafetyRegion, (t, {payload}) => { t.safetyRegion = payload })
    .addCase(Actions.updateMaxSupplyIncreasePerEpoch, (t, {payload}) => { t.maxSupplyIncreasePerEpoch = payload })
    .addCase(Actions.updateEcosystemFundAllocationRate, (t, {payload}) => { t.ecosystemFundAllocationRate = payload })
    .addCase(Actions.updateRainyDayFundAllocationRate, (t, {payload}) => { t.rainyDayFundAllocationRate = payload })
    .addCase(Actions.updateBondSeigniorageRate, (t, {payload}) => { t.bondSeigniorageRate = payload })
    .addCase(Actions.updateArthLiquidityUniAllocationRate, (t, {payload}) => { t.arthLiquidityUniAllocationRate = payload })
    .addCase(Actions.updateArthLiquidityMlpAllocationRate, (t, {payload}) => { t.arthLiquidityMlpAllocationRate = payload })
    .addCase(Actions.updateArthBoardroomAllocationRate, (t, {payload}) => { t.arthBoardroomAllocationRate = payload })
    .addCase(Actions.updateMahaLiquidityBoardroomAllocationRate, (t, {payload}) => { t.mahaLiquidityBoardroomAllocationRate = payload })
    .addCase(Actions.updateStabilityFee, (t, {payload}) => { t.stabilityFee = payload })

    .addCase(Actions.updateGetReserve, (t, {payload}) => { t.getReserve = payload })
    .addCase(Actions.updateGetStabilityFee, (t, {payload}) => { t.getStabilityFee = payload })
    .addCase(Actions.updateGetBondOraclePrice, (t, {payload}) => { t.getBondOraclePrice = payload })
    .addCase(Actions.updateGetGMUOraclePrice, (t, {payload}) => { t.getGMUOraclePrice = payload })
    .addCase(Actions.updateGetArthMahaOraclePrice, (t, {payload}) => { t.getArthMahaOraclePrice = payload })
    .addCase(Actions.updateGetSeigniorageOraclePrice, (t, {payload}) => { t.getSeigniorageOraclePrice = payload })
    .addCase(Actions.updateArthCirculatingSupply, (t, {payload}) => { t.arthCirculatingSupply = payload })
    .addCase(Actions.updateBondCirculatingSupply, (t, {payload}) => { t.bondCirculatingSupply = payload })
    .addCase(Actions.updateGetBondRedemtionPrice, (t, {payload}) => { t.getBondRedemtionPrice = payload })
    .addCase(Actions.updateGetExpansionLimitPrice, (t, {payload}) => { t.getExpansionLimitPrice = payload })
    .addCase(Actions.updateGetBondPurchasePrice, (t, {payload}) => { t.getBondPurchasePrice = payload })
    .addCase(Actions.updateGetCashSupplyInLiquidity, (t, {payload}) => { t.getCashSupplyInLiquidity = payload })
    .addCase(Actions.updateGet1hourEpoch, (t, {payload}) => { t.get1hourEpoch = payload })
);
