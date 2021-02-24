import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useBasisCash from './useBasisCash';
import config from '../config';
import { BoardroomsV2  } from '../basis-cash/config';

const useEarningsOnBoardroomV2 = (kind: BoardroomsV2) => {
  const [balance, setBalance] = useState(BigNumber.from(1000));
  const [claimableBalance, setClaimableBalance] = useState(BigNumber.from(10));
  const basisCash = useBasisCash();

  const fetchBalance = useCallback(async () => {
    // setBalance(await basisCash.getEarningsOnBoardroom(kind, 'v2'));
    // setClaimableBalance(await basisCash.getClaimableEarningsOnBoardroomV2(kind, 'v2'));
  }, []);

  useEffect(() => {
    if (basisCash.isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));
      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [basisCash.isUnlocked, fetchBalance]);

  return [balance, claimableBalance];
};

export default useEarningsOnBoardroomV2;
