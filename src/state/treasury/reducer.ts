import { createReducer } from '@reduxjs/toolkit';
import {
  updateCurrentEpoch,
  updatePeriod,
  updateNextEpochPoint
} from './actions';


export interface TreasuryState {
  nextEpochPoint: number
  period: number
  currentEpoch: number
}

export const initialState: TreasuryState = {
  nextEpochPoint: 0,
  currentEpoch: 0,
  period: 0
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateNextEpochPoint, (t, { payload }) => { t.nextEpochPoint = payload })
    .addCase(updatePeriod, (t, { payload }) => { t.period = payload })
    .addCase(updateCurrentEpoch, (t, { payload }) => { t.currentEpoch = payload })
);
