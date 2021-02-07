import { useCallback } from 'react';
import { BoardroomInfo } from '../basis-cash';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useUnbondFromBoardroom = (boardroom: BoardroomInfo) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        basisCash.unbondShareFromBoardroom(boardroom.kind, amount),
        `Unbond ${amount} ${boardroom.depositTokenName}`,
      );
    },
    [basisCash, boardroom.depositTokenName, boardroom.kind, handleTransactionReceipt],
  );
  return { onUnbond: handleWithdraw };
};

export default useUnbondFromBoardroom;
