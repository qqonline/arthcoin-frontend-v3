import { useCallback } from 'react';
import { BoardroomInfo } from '../basis-cash';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdrawFromBoardroom = (boardroom: BoardroomInfo) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        basisCash.withdrawShareFromBoardroom('arth', amount),
        `Withdraw ${amount} ${boardroom.depositTokenName} from the boardroom`,
      );
    },
    [basisCash, boardroom.depositTokenName, handleTransactionReceipt],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdrawFromBoardroom;
