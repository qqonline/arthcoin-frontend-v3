import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';
import useCore from '../../useCore';

export default () => {
  const [value, setValue] = useState(BigNumber.from(0));
  const core = useCore();

  const fetchValue = useCallback(async () => {
    const contract = core.contracts.ArthController
    console.log(await contract.estimateRecollateralizeRewards())
    setValue(await contract.estimateRecollateralizeRewards());
  }, [core.contracts]);

  useEffect(() => {
    fetchValue().catch((err) =>
      console.error(`Failed to fetch controller.estimateRecollateralizeRewards: ${err}`),
    );
  }, [fetchValue]);

  return value;
};
