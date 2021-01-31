import { useEffect, useState } from 'react';
import { TreasuryAllocationTime } from '../basis-cash/types';
import { useSelector } from 'react-redux';
import { AppState } from '../state';


const useTreasuryAllocationTimes = () => {
  const [time, setTime] = useState<TreasuryAllocationTime>({
    currentEpoch: 0,
    prevAllocation: new Date(),
    nextAllocation: new Date(),
  });

  const currentEpoch = useSelector<AppState, number>(state => state.treasury.currentEpoch)
  const nextEpochPoint = useSelector<AppState, number>(state => state.treasury.nextEpochPoint)
  const period = useSelector<AppState, number>(state => state.treasury.period)

  useEffect(() => {
    const nextAllocation = new Date(nextEpochPoint * 1000);
    const prevAllocation = new Date(nextAllocation.getTime() - period * 1000);

    setTime({
      prevAllocation,
      nextAllocation,
      currentEpoch: 1 + currentEpoch
    })
  }, [currentEpoch, nextEpochPoint, period]);
  return time;
};

export default useTreasuryAllocationTimes;
