import { useCallback } from 'react';
import { BoardroomInfo } from '../basis-cash';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useExitFromBoardroom = (boardroom: BoardroomInfo) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    const alertDesc = 'Exit from Distribution Pool';
    handleTransactionReceipt(basisCash.exitFromBoardroom(boardroom.kind, 'v2'), alertDesc);
  }, [basisCash, boardroom.kind, handleTransactionReceipt]);
  return { onRedeem: handleRedeem };
};

export default useExitFromBoardroom;
