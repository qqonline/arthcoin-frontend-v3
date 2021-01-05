import { useCallback } from 'react';
import { BoardroomInfo } from '../basis-cash';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeemOnBoardroom = (boardroom: BoardroomInfo, description?: string) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    const alertDesc = description || 'Redeem MAHA from Boardroom';
    handleTransactionReceipt(basisCash.exitFromBoardroom(boardroom.kind), alertDesc);
  }, [basisCash, boardroom.kind, description, handleTransactionReceipt]);
  return { onRedeem: handleRedeem };
};

export default useRedeemOnBoardroom;
