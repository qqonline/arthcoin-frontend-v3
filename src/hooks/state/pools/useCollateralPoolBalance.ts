import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../../useCore';
import { useBlockNumber } from '../../../state/application/hooks';

export default (collateralPoolToken: string) => {
  const [value, setValue] = useState(BigNumber.from(0));
  
  const core = useCore();
  const blockNumber = useBlockNumber();

  const fetchValue = useCallback(async () => {
    const pool = core.getCollatearalPool(collateralPoolToken);
    setValue(await pool.getCollateralGMUBalance());
  }, [collateralPoolToken, core]);

  useEffect(() => {
    fetchValue().catch((err) =>
      console.error(`Failed to fetch collateral token price: ${err}`),
    );
  }, [blockNumber, fetchValue]);

  return value;
};
