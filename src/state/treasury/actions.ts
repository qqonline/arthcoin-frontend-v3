import { createAction } from '@reduxjs/toolkit';
import { TreasuryBoardroomState, TreasuryCoreState, TreasuryOracleState } from '../../basis-cash/types';


export const updateNextEpochPoint = createAction<number>('tx/updateNextEpochPoint');
export const updatePeriod = createAction<number>('tx/updatePeriod');
export const updateCurrentEpoch = createAction<number>('tx/updateCurrentEpoch');

type TreasuryGetState = {
    s: TreasuryCoreState
    o: TreasuryOracleState
    b: TreasuryBoardroomState
}
export const updateState = createAction<TreasuryGetState>('tx/updateState')
// export const updateCashToBondConversionLimit = createAction<number>('tx/updateCashToBondConversionLimit')
// export const updateAccumulatedBonds = createAction<number>('tx/updateAccumulatedBonds')
// export const updateAccumulatedSeigniorage = createAction<number>('tx/updateAccumulatedSeigniorage')
// export const updateMaxDebtIncreasePerEpoch = createAction<number>('tx/updateMaxDebtIncreasePerEpoch')
// export const updateBondDiscount = createAction<number>('tx/updateBondDiscount')
// export const updateSafetyRegion = createAction<number>('tx/updateSafetyRegion')
// export const updateMaxSupplyIncreasePerEpoch = createAction<number>('tx/updateMaxSupplyIncreasePerEpoch')
// export const updateEcosystemFundAllocationRate = createAction<number>('tx/updateEcosystemFundAllocationRate')
// export const updateRainyDayFundAllocationRate = createAction<number>('tx/updateRainyDayFundAllocationRate')
// export const updateBondSeigniorageRate = createAction<number>('tx/updateBondSeigniorageRate')
// export const updateArthLiquidityUniAllocationRate = createAction<number>('tx/updateArthLiquidityUniAllocationRate')
// export const updateArthLiquidityMlpAllocationRate = createAction<number>('tx/updateArthLiquidityMlpAllocationRate')
// export const updateArthBoardroomAllocationRate = createAction<number>('tx/updateArthBoardroomAllocationRate')
// export const updateMahaLiquidityBoardroomAllocationRate = createAction<number>('tx/updateMahaLiquidityBoardroomAllocationRate')
// export const updateStabilityFee = createAction<number>('tx/updateStabilityFee')

// export const updateGetReserve = createAction<number>('tx/updateGetReserve')
// export const updateGetStabilityFee = createAction<number>('tx/updateGetStabilityFee')
// export const updateGetBondOraclePrice = createAction<number>('tx/updateGetBondOraclePrice')
// export const updateGetGMUOraclePrice = createAction<number>('tx/updateGetGMUOraclePrice')
// export const updateGetArthMahaOraclePrice = createAction<number>('tx/updateGetArthMahaOraclePrice')
// export const updateGetSeigniorageOraclePrice = createAction<number>('tx/updateGetSeigniorageOraclePrice')
// export const updateArthCirculatingSupply = createAction<number>('tx/updateArthCirculatingSupply')
// export const updateBondCirculatingSupply = createAction<number>('tx/updateBondCirculatingSupply')
// export const updateGetBondRedemtionPrice = createAction<number>('tx/updateGetBondRedemtionPrice')
// export const updateGetExpansionLimitPrice = createAction<number>('tx/updateGetExpansionLimitPrice')
// export const updateGetBondPurchasePrice = createAction<number>('tx/updateGetBondPurchasePrice')
// export const updateGetCashSupplyInLiquidity = createAction<number>('tx/updateGetCashSupplyInLiquidity')
// export const updateGet1hourEpoch = createAction<number>('tx/updateGet1hourEpoch')