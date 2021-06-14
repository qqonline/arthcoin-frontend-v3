import { useCallback, useEffect, useState } from 'react';

import useCore from '../useCore';
import usePrizeCounter from './usePrizeCounter';
import { useBlockNumber } from '../../state/application/hooks';

export default () => {
  const [value, setValue] = useState([]);

  const core = useCore();
  const blockNumber = useBlockNumber();
  const prizeCounter = usePrizeCounter();

  const fetchValue = useCallback(async () => {
    const controller = core.contracts.LotteryRaffle;
    const prizeCounterLength = Number(prizeCounter.toString());
    if (!prizeCounter) return;

    const prizes = [];
    for (let i = 0; i < prizeCounterLength; i++) {
      const prize = await controller.prizes(`prize${i+1}`);
      prizes.push(prize);
    }

    setValue(prizes);
  }, [core.contracts.LotteryRaffle, prizeCounter]);

  useEffect(() => {
    fetchValue().catch((err) => console.error(`Failed to fetch global CR: ${err.stack}`));
  }, [blockNumber, fetchValue]);

  return value;
};
