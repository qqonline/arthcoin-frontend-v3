import { useCallback, useEffect, useState } from 'react';

import { BigNumber } from 'ethers';
import useBasisCash from './useBasisCash';
import moment from 'moment';
import { BoardroomInfo } from '../basis-cash';
import { BoardroomVersion } from '../basis-cash/config';


const useBoardroomDepositDate = (boardroom: BoardroomInfo, stakedBalance: BigNumber, version: BoardroomVersion) => {
  const [startDate, setStartDate] = useState(moment().utc().startOf('day').toDate());
  const [endDate, setEndDate] = useState(moment().utc().startOf('day').toDate());

  const basisCash = useBasisCash();

  const fetchDepositTime = useCallback(async () => {
    const b = await basisCash.currentBoardroom(boardroom.kind, version);
    const details = await b._stakingDetails(basisCash.myAccount)

    const from = new Date(details.lastStakedOn.toNumber() * 1000)
    const to = new Date(from.getTime() + 86400 * 1000 * boardroom.lockInPeriodDays)

    setStartDate(from)
    setEndDate(to)
  }, [basisCash, boardroom.kind, boardroom.lockInPeriodDays, version]);

  useEffect(() => {
    if (basisCash.isUnlocked && stakedBalance.gt(0)) {
      fetchDepositTime().catch(err => console.error(err.stack));
    }
  }, [basisCash.isUnlocked, fetchDepositTime, stakedBalance]);

  return [startDate, endDate];
};

export default useBoardroomDepositDate;
