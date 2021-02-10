import { useCallback } from 'react';
import { BoardroomInfo } from '../basis-cash';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useHarvestFromBoardroom = (boardroom: BoardroomInfo) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(basisCash.harvestCashFromBoardroom(boardroom.kind, 'v2'), 'Claim ARTH from Boardroom');
  }, [basisCash, boardroom.kind, handleTransactionReceipt]);

  return { onReward: handleReward };
};

export default useHarvestFromBoardroom;
