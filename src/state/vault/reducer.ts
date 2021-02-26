import { createReducer } from '@reduxjs/toolkit';
import { BigNumber } from 'ethers';
import { Vaults } from '../../basis-cash/config';
import * as Actions from './actions';


export interface VaultState {
  boardrooms: {
    [key in Vaults]: {
      balanceWithoutBonded: BigNumber
      arthClaimed: BigNumber
      mahaClaimed: BigNumber
    }
  }
}

export const initialState: VaultState = {
  boardrooms: {
    [Vaults.arth]: {
      balanceWithoutBonded: BigNumber.from(0),
      mahaClaimed: BigNumber.from(0),
      arthClaimed: BigNumber.from(0),
    },
    [Vaults.arthMlpLiquidity]: {
      balanceWithoutBonded: BigNumber.from(0),
      mahaClaimed: BigNumber.from(0),
      arthClaimed: BigNumber.from(0),
    },
    [Vaults.maha]: {
      balanceWithoutBonded: BigNumber.from(0),
      mahaClaimed: BigNumber.from(0),
      arthClaimed: BigNumber.from(0),
    }
  }
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(Actions.updateVaultArthBalance, (t, { payload }) => { t.boardrooms.arth.balanceWithoutBonded = payload })
    .addCase(Actions.updateVaultArthMlpBalance, (t, { payload }) => { t.boardrooms.arthMlpLiquidity.balanceWithoutBonded = payload })
    .addCase(Actions.updateVaultMahaBalance, (t, { payload }) => { t.boardrooms.maha.balanceWithoutBonded = payload })
);
