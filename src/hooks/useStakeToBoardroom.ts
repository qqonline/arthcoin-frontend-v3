import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStakeToBoardroom = () => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        basisCash.stakeShareToBoardroom(amount),
        `Stake ${amount} MAHA to the boardroom`,
      );
    },
    [basisCash, handleTransactionReceipt],
  );
  return { onStake: handleStake };
};

export default useStakeToBoardroom;
