import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../../useCore';
import { useBlockNumber } from '../../../state/application/hooks';

interface IValues {
  poolToken: string
  value: BigNumber
}

export default () => {
  const [value, setValue] = useState<IValues[]>([]);

  const core = useCore();
  const blockNumber = useBlockNumber();

  const fetchValue = useCallback(async () => {
    const promises = core.getCollateralTypes().map(collateralPoolToken => {
      const pool = core.getCollatearalPool(collateralPoolToken)
      return pool.getCollateralGMUBalance();
    })

    const vals = await Promise.all(promises)

    const results = vals.map((val, i) => ({
      poolToken: core.getCollateralTypes()[i],
      value: val
    }))

    setValue(results);
  }, [core]);

  useEffect(() => {
    fetchValue().catch((err) =>
      console.error(`Failed to fetch collateral pool balances: ${err}`),
    );
  }, [blockNumber, fetchValue]);

  return value;
};
