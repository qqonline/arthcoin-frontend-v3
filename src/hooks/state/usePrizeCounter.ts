import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../useCore';

export default () => {
  const [value, setValue] = useState<BigNumber>(BigNumber.from(0));

  const core = useCore();

  const fetchValue = useCallback(async () => {
    // const controller = core.contracts.LotteryRaffle;
    setValue(BigNumber.from(4));
  }, []);

  useEffect(() => {
    fetchValue().catch((err) => console.error(`Failed to fetch global CR: ${err.stack}`));
  }, [fetchValue]);

  return value;
};
