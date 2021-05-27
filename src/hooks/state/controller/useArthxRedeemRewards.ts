import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../../useCore';

export default () => {
  const core = useCore();
  const [value, setValue] = useState(BigNumber.from(1));

  const fetchValue = useCallback(async () => {
    const contract = core.contracts.ArthController
    const targetValue = await contract.getTargetCollateralValue();
    const currentGlobalValue = await contract.getGlobalCollateralValue();

    targetValue.gte(currentGlobalValue)
      ? setValue(targetValue.sub(currentGlobalValue))
      : setValue(BigNumber.from(0));
  }, [core.contracts]);

  useEffect(() => {
    fetchValue().catch((err) =>
      console.error(`Failed to fetch controller.estimateRecollateralizeRewards: ${err}`),
    );
  }, [fetchValue]);

  return value;
};
