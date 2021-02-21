import { useCallback } from 'react';
import { VaultInfo } from '../basis-cash/types';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStakeToVault = (vault: VaultInfo) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    async (amount: string) => {
      const v = await basisCash.getBoardroomVault(vault.kind);
      handleTransactionReceipt(
        v.contract.bond(amount),
        `Bond ${amount} ${vault.depositTokenName}`,
      );
    },
    [basisCash, vault.depositTokenName, vault.kind, handleTransactionReceipt],
  );
  return { onStake: handleStake };
};

export default useStakeToVault;
