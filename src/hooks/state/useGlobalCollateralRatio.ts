import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';
import useCore from '../useCore';

export default () => {
  const [value, setValue] = useState<BigNumber>(BigNumber.from(0));
  const core = useCore();

  const fetchValue = useCallback(async () => {
    const controller = core.contracts.ArthController;
    setValue(await controller.getGlobalCollateralRatio());
  }, [core.contracts.ArthController]);

  useEffect(() => {
    fetchValue().catch((err) => console.error(`Failed to fetch global CR: ${err.stack}`));
  }, [fetchValue]);

  return value;
};
