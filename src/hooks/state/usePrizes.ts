import { useCallback, useEffect, useState } from 'react';

import useCore from '../useCore';
import usePrizeCounter from './usePrizeCounter';
import { useBlockNumber } from '../../state/application/hooks';

type State = {
  isLoading: boolean;
  value: any[];
}

export default () => {
  const [customState, setCustomState] = useState<State>({ isLoading: true, value: [] });

  const core = useCore();
  const blockNumber = useBlockNumber();
  const prizeCounter = usePrizeCounter();

  const fetchValue = useCallback(async () => {
    const controller = core.contracts.LotteryRaffle;
    const prizeCounterLength = Number(prizeCounter.toString());
    if (!prizeCounterLength) return;

    const prizes = [];
    let i = 0;
    for (i; i < prizeCounterLength; i++) {
      const prize = await controller.prizes(`prize${i+1}`);
      prizes.push(prize);
    }

    if (prizeCounterLength !== i) return;
    setCustomState({isLoading: false, value: prizes});
  }, [core.contracts.LotteryRaffle, prizeCounter]);

  useEffect(() => {
    fetchValue().catch((err) => console.error(`Failed to fetch global CR: ${err.stack}`));
  }, [blockNumber, fetchValue]);

  return customState;
};
