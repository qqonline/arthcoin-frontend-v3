import { useCallback } from 'react';
import { BoardroomInfo } from '../basis-cash';
import { BoardroomVersion } from '../basis-cash/config';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStakeToBoardroom = (boardroom: BoardroomInfo, version: BoardroomVersion) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        basisCash.stakeShareToBoardroom(boardroom.kind, amount, version),
        `Bond ${amount} ${boardroom.depositTokenName}`,
      );
    },
    [basisCash, boardroom.depositTokenName, boardroom.kind, handleTransactionReceipt, version],
  );
  return { onStake: handleStake };
};

export default useStakeToBoardroom;
