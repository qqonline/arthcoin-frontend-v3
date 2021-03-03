import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useBasisCash from './useBasisCash';
import config from '../config';
import { BoardroomsV2  } from '../basis-cash/config';

const useEarningsOnBoardroomV2 = (kind: BoardroomsV2) => {
  const [balance, setBalance] = useState(BigNumber.from(1000));
  // eslint-disable-next-line
  const [claimableBalance, setClaimableBalance] = useState(BigNumber.from(10));
  const basisCash = useBasisCash();

  const fetchBalance = useCallback(async () => {
    const boardroom = basisCash.getBoardroomV2(kind)

    const director = await boardroom.contract.getDirector(basisCash.myAccount)

    const earned: BigNumber = await boardroom.contract.estimateEarned(basisCash.myAccount)
    setBalance(earned.sub(director.rewardClaimedCurrEpoch));
    // setClaimableBalance(earned.);
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

export default useEarningsOnBoardroomV2;
