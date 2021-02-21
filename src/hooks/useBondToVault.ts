import { useCallback } from 'react';
import { VaultInfo } from '../basis-cash/types';
import { decimalToBalance } from '../basis-cash/ether-utils';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

export default (vault: VaultInfo) => {
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    async (amount: string) => {
      console.log(amount)
       handleTransactionReceipt(
        vault.contract.bond(decimalToBalance(amount)),
        `Bond ${amount} ${vault.depositTokenName}`,
      );
    },
    [handleTransactionReceipt, vault.contract, vault.depositTokenName],
  );
  return { onBond: handleStake };
};
