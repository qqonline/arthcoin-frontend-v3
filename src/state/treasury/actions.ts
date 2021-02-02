import { createAction } from '@reduxjs/toolkit';


export const updateNextEpochPoint = createAction<number>('transactions/updateNextEpochPoint');
export const updatePeriod = createAction<number>('transactions/updatePeriod');
export const updateCurrentEpoch = createAction<number>('transactions/updateCurrentEpoch');
