import { Dispatch } from '@reduxjs/toolkit'
import { BasisCash } from '../../basis-cash/BasisCash'
import * as Actions from './actions'
import { IMulticallInput } from '../../basis-cash/Mulitcall'


export const init = (basisCash: BasisCash, dispatch: Dispatch) => {
    const registerVariable = (fn: string, reduxAction: any) => {
        const input: IMulticallInput = {
            key: `TREASURY:${fn}`,
            target: basisCash.contracts.Treasury.address,
            call: [`${fn}(uint256)`],
            convertResult: val => val.toNumber()
        }

        basisCash.multicall.on(input.key, val => dispatch(reduxAction(val)))

        return input
    }

    const calls = [
        registerVariable('nextEpochPoint()', Actions.updateNextEpochPoint),
        registerVariable('getPeriod()', Actions.updatePeriod),
        registerVariable('getCurrentEpoch()', Actions.updateCurrentEpoch),

        registerVariable('cashTargetPrice()', Actions.updateCashTargetPrice),
        registerVariable('cashToBondConversionLimit()', Actions.updateCashToBondConversionLimit),
        registerVariable('accumulatedBonds()', Actions.updateAccumulatedBonds),
        registerVariable('accumulatedSeigniorage()', Actions.updateAccumulatedSeigniorage),
        registerVariable('maxDebtIncreasePerEpoch()', Actions.updateMaxDebtIncreasePerEpoch),
        registerVariable('bondDiscount()', Actions.updateBondDiscount),
        registerVariable('safetyRegion()', Actions.updateSafetyRegion),
        registerVariable('maxSupplyIncreasePerEpoch()', Actions.updateMaxSupplyIncreasePerEpoch),
        registerVariable('ecosystemFundAllocationRate()', Actions.updateEcosystemFundAllocationRate),
        registerVariable('rainyDayFundAllocationRate()', Actions.updateRainyDayFundAllocationRate),
        registerVariable('bondSeigniorageRate()', Actions.updateBondSeigniorageRate),
        registerVariable('arthLiquidityUniAllocationRate()', Actions.updateArthLiquidityUniAllocationRate),
        registerVariable('arthLiquidityMlpAllocationRate()', Actions.updateArthLiquidityMlpAllocationRate),
        registerVariable('arthBoardroomAllocationRate()', Actions.updateArthBoardroomAllocationRate),
        registerVariable('mahaLiquidityBoardroomAllocationRate()', Actions.updateMahaLiquidityBoardroomAllocationRate),
        registerVariable('stabilityFee()', Actions.updateStabilityFee),
    ]

    basisCash.multicall.addCalls(calls)
}