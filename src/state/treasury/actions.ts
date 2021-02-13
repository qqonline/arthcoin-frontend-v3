import { createAction } from '@reduxjs/toolkit';


export const updateAccumulatedBonds = createAction<number>('tx/updateAccumulatedBonds')
export const updateAccumulatedSeigniorage = createAction<number>('tx/updateAccumulatedSeigniorage')
export const updateArthBoardroomAllocationRate = createAction<number>('tx/updateArthBoardroomAllocationRate')
export const updateArthLiquidityMlpAllocationRate = createAction<number>('tx/updateArthLiquidityMlpAllocationRate')
export const updateArthLiquidityUniAllocationRate = createAction<number>('tx/updateArthLiquidityUniAllocationRate')
export const updateBondDiscount = createAction<number>('tx/updateBondDiscount')
export const updateBondSeigniorageRate = createAction<number>('tx/updateBondSeigniorageRate')
export const updateCashTargetPrice = createAction<number>('tx/updateCashTargetPrice')
export const updateCashToBondConversionLimit = createAction<number>('tx/updateCashToBondConversionLimit')
export const updateCurrentEpoch = createAction<number>('tx/updateCurrentEpoch');
export const updateEcosystemFundAllocationRate = createAction<number>('tx/updateEcosystemFundAllocationRate')
export const updateMahaLiquidityBoardroomAllocationRate = createAction<number>('tx/updateMahaLiquidityBoardroomAllocationRate')
export const updateMaxDebtIncreasePerEpoch = createAction<number>('tx/updateMaxDebtIncreasePerEpoch')
export const updateMaxSupplyIncreasePerEpoch = createAction<number>('tx/updateMaxSupplyIncreasePerEpoch')
export const updateNextEpochPoint = createAction<number>('tx/updateNextEpochPoint');
export const updatePeriod = createAction<number>('tx/updatePeriod');
export const updateRainyDayFundAllocationRate = createAction<number>('tx/updateRainyDayFundAllocationRate')
export const updateSafetyRegion = createAction<number>('tx/updateSafetyRegion')
export const updateStabilityFee = createAction<number>('tx/updateStabilityFee')