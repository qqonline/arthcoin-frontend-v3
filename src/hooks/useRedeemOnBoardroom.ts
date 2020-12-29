import { useCallback } from 'react';
import useBasisCash from './useBasisCash';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeemOnBoardroom = (description?: string) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    const alertDesc = description || 'Redeem MAHA from Boardroom';
    handleTransactionReceipt(basisCash.exitFromBoardroom(), alertDesc);
  }, [basisCash, description, handleTransactionReceipt]);
  return { onRedeem: handleRedeem };
};

export default useRedeemOnBoardroom;
