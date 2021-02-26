import { createAction } from '@reduxjs/toolkit';
import { BigNumber } from 'ethers';

export const updateVaultArthBalance = createAction<BigNumber>('vault/updateVaultArthBalance')
export const updateVaultMahaBalance = createAction<BigNumber>('vault/updateVaultMahaBalance')
export const updateVaultArthMlpBalance = createAction<BigNumber>('vault/updateVaultArthMlpBalance')
