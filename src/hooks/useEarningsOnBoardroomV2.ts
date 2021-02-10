import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useBasisCash from './useBasisCash';
import config from '../config';
import { Boardrooms } from '../basis-cash/config';

const useEarningsOnBoardroom = (kind: Boardrooms) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const [claimableBalance, setClaimableBalance] = useState(BigNumber.from(0));
  const basisCash = useBasisCash();

  const fetchBalance = useCallback(async () => {
    setBalance(await basisCash.getEarningsOnBoardroom(kind, 'v2'));
    setClaimableBalance(await basisCash.getClaimableEarningsOnBoardroomV2(kind, 'v2'));
  }, [basisCash, kind]);

  useEffect(() => {
    if (basisCash.isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));
      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [basisCash.isUnlocked, fetchBalance]);

  return [balance, claimableBalance];
};

export default useEarningsOnBoardroom;
