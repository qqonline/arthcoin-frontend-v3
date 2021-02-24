import { useCallback } from 'react';
import { BoardroomInfo } from '../basis-cash';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

export default (boardroom: BoardroomInfo) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (value: string) => {
      handleTransactionReceipt(
        basisCash.withdrawShareFromBoardroomV1(boardroom.kind, value),
        `Withdraw ${boardroom.depositTokenName}`,
      );
    },
    [basisCash, boardroom.depositTokenName, boardroom.kind, handleTransactionReceipt],
  );
  return { onWithdraw: handleWithdraw };
};
