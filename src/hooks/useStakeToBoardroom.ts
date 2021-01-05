import { useCallback } from 'react';
import { BoardroomInfo } from '../basis-cash';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStakeToBoardroom = (boardroom: BoardroomInfo) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        basisCash.stakeShareToBoardroom('arth', amount),
        `Stake ${amount} ${boardroom.depositTokenName} to the boardroom`,
      );
    },
    [basisCash, boardroom.depositTokenName, handleTransactionReceipt],
  );
  return { onStake: handleStake };
};

export default useStakeToBoardroom;
