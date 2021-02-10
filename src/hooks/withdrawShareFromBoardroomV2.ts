import { useCallback } from 'react';
import { BoardroomInfo } from '../basis-cash';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const WithdrawShareFromBoardroomV2 = (boardroom: BoardroomInfo) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    () => {
      handleTransactionReceipt(
        basisCash.withdrawShareFromBoardroomV2(boardroom.kind),
        `Withdraw ${boardroom.depositTokenName}`,
      );
    },
    [basisCash, boardroom.depositTokenName, boardroom.kind, handleTransactionReceipt],
  );

  return { onWithdraw: handleWithdraw };
};

export default WithdrawShareFromBoardroomV2;
