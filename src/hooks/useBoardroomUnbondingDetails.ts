import { useCallback, useEffect, useState } from 'react';

import { BigNumber } from 'ethers';
import useBasisCash from './useBasisCash';
import moment from 'moment';
import { VaultInfo } from '../basis-cash/types';


const useBoardroomUnbondingDetails = (boardroom: VaultInfo, stakedBalance: BigNumber): [Date, Date, BigNumber] => {
  const [startDate, setStartDate] = useState(moment().utc().startOf('day').toDate());
  const [endDate, setEndDate] = useState(moment().utc().startOf('day').toDate());
  const [amount, setAmount] = useState(BigNumber.from(0));

  const basisCash = useBasisCash();

  const fetchDepositTime = useCallback(async () => {
    const b = boardroom.contract;
    const details = await b.stakingDetails(basisCash.myAccount)

    const from = new Date(details.updatedOn * 1000)
    const to = new Date(details.deadline * 1000)

    setStartDate(from)
    setEndDate(to)
    setAmount(details.amount)
  }, [basisCash.myAccount, boardroom.contract]);

  useEffect(() => {
    if (basisCash.isUnlocked) {
      fetchDepositTime().catch(err => console.error(err.stack));
    }
  }, [basisCash.isUnlocked, fetchDepositTime, stakedBalance]);

  return [startDate, endDate, amount];
};

export default useBoardroomUnbondingDetails;
