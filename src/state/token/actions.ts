import { createAction } from '@reduxjs/toolkit';
import { BigNumber } from 'ethers';

export const updateBalanceOf = createAction<BigNumber>('token/updateBalanceOf');
export const updateCirculatingSupply = createAction<BigNumber>('token/updateCirculatingSupply');
export const updateLiquidity = createAction<BigNumber>('token/updateLiquidity');
export const updateUSDPrice = createAction<BigNumber>('token/updateUSDPrice');
