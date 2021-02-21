import { useCallback } from 'react';
import { VaultInfo } from '../basis-cash/types';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

export default (vault: VaultInfo) => {
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(() => {
      handleTransactionReceipt(
        vault.contract.withdraw(),
        `Withdraw ${vault.depositTokenName}`,
      );
    },
    [handleTransactionReceipt, vault.contract, vault.depositTokenName],
  );

  return { onWithdraw: handleWithdraw };
};
