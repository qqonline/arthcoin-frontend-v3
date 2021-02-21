import { useCallback } from 'react';
import { VaultInfo } from '../basis-cash/types';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useUnbondFromVault = (vault: VaultInfo) => {
   const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    async (amount: string) => {
      handleTransactionReceipt(
        vault.contract.unbond(amount),
        `Unbond ${amount} ${vault.depositTokenName}`,
      );
    },
    [handleTransactionReceipt, vault.contract, vault.depositTokenName],
  );
  return { onUnbond: handleWithdraw };
};

export default useUnbondFromVault;
