import { useCallback } from 'react';
import { VaultInfo } from '../basis-cash/types';
import { decimalToBalance } from '../basis-cash/ether-utils';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

export default (vault: VaultInfo) => {
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    async (amount: string) => {
        handleTransactionReceipt(
        vault.contract.bond(decimalToBalance(amount)),
        `Deposit ${amount} ${vault.depositTokenName}`,
      );
    },
    [handleTransactionReceipt, vault.contract, vault.depositTokenName],
  );
  return { onBond: handleStake };
};
