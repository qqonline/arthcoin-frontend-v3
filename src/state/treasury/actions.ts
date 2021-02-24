import { createAction } from '@reduxjs/toolkit';
import { BigNumber } from 'ethers';
import { TreasuryBoardroomState, TreasuryCoreState, TreasuryOracleState } from '../../basis-cash/types';


export const updateNextEpochPoint = createAction<number>('treasury/updateNextEpochPoint');
export const updatePeriod = createAction<number>('treasury/updatePeriod');
export const updateCurrentEpoch = createAction<number>('treasury/updateCurrentEpoch');

export const updateGetGMUOraclePrice = createAction<BigNumber>('treasury/updateGetGMUOraclePrice')
export const updateGet12hrTWAPOraclePrice = createAction<BigNumber>('treasury/updateGet12hrTWAPOraclePrice')
export const updateGet1hrTWAPOraclePrice = createAction<BigNumber>('treasury/updateGet1hrTWAPOraclePrice')
export const updateBondCirculatingSupply = createAction<BigNumber>('treasury/updateBondCirculatingSupply')
export const updateArthCirculatingSupply = createAction<BigNumber>('treasury/updateArthCirculatingSupply')

type TreasuryGetState = {
  s: TreasuryCoreState
  o: TreasuryOracleState
  b: TreasuryBoardroomState
}

export const updateState = createAction<TreasuryGetState>('treasury/updateState')
// export const updateCashToBondConversionLimit = createAction<number>('treasury/updateCashToBondConversionLimit')
// export const updateAccumulatedBonds = createAction<number>('treasury/updateAccumulatedBonds')
// export const updateAccumulatedSeigniorage = createAction<number>('treasury/updateAccumulatedSeigniorage')
// export const updateMaxDebtIncreasePerEpoch = createAction<number>('treasury/updateMaxDebtIncreasePerEpoch')
// export const updateBondDiscount = createAction<number>('treasury/updateBondDiscount')
// export const updateSafetyRegion = createAction<number>('treasury/updateSafetyRegion')
// export const updateMaxSupplyIncreasePerEpoch = createAction<number>('treasury/updateMaxSupplyIncreasePerEpoch')
// export const updateEcosystemFundAllocationRate = createAction<number>('treasury/updateEcosystemFundAllocationRate')
// export const updateRainyDayFundAllocationRate = createAction<number>('treasury/updateRainyDayFundAllocationRate')
// export const updateBondSeigniorageRate = createAction<number>('treasury/updateBondSeigniorageRate')
// export const updateArthLiquidityUniAllocationRate = createAction<number>('treasury/updateArthLiquidityUniAllocationRate')
// export const updateArthLiquidityMlpAllocationRate = createAction<number>('treasury/updateArthLiquidityMlpAllocationRate')
// export const updateArthBoardroomAllocationRate = createAction<number>('treasury/updateArthBoardroomAllocationRate')
// export const updateMahaLiquidityBoardroomAllocationRate = createAction<number>('treasury/updateMahaLiquidityBoardroomAllocationRate')
// export const updateStabilityFee = createAction<number>('treasury/updateStabilityFee')

// export const updateGetReserve = createAction<number>('treasury/updateGetReserve')
// export const updateGetStabilityFee = createAction<number>('treasury/updateGetStabilityFee')
// export const updateGetBondOraclePrice = createAction<number>('treasury/updateGetBondOraclePrice')
// export const updateGetGMUOraclePrice = createAction<number>('treasury/updateGetGMUOraclePrice')
// export const updateGetArthMahaOraclePrice = createAction<number>('treasury/updateGetArthMahaOraclePrice')
// export const updateGetSeigniorageOraclePrice = createAction<number>('treasury/updateGetSeigniorageOraclePrice')
// export const updateArthCirculatingSupply = createAction<number>('treasury/updateArthCirculatingSupply')
// export const updateBondCirculatingSupply = createAction<number>('treasury/updateBondCirculatingSupply')
// export const updateGetBondRedemtionPrice = createAction<number>('treasury/updateGetBondRedemtionPrice')
// export const updateGetExpansionLimitPrice = createAction<number>('treasury/updateGetExpansionLimitPrice')
// export const updateGetBondPurchasePrice = createAction<number>('treasury/updateGetBondPurchasePrice')
// export const updateGetCashSupplyInLiquidity = createAction<number>('treasury/updateGetCashSupplyInLiquidity')
// export const updateGet1hourEpoch = createAction<number>('treasury/updateGet1hourEpoch')
