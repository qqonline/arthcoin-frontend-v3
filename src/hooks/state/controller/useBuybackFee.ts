import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../../useCore';

export default () => {
  const [value, setValue] = useState(BigNumber.from(0));
  const core = useCore();

  const fetchValue = useCallback(async () => {
    const controller = core.contracts.ArthController;
    setValue(await controller.getBuybackFee());
  }, [core]);

  useEffect(() => {
    fetchValue().catch((err) =>
      console.error(`Failed to fetch collateral pool buyback fee: ${err.stack}`),
    );
  }, [fetchValue]);

  return value;
};
