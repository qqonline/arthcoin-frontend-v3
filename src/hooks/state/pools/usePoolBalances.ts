import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';
import useCore from '../../useCore';

interface IBalances {
  poolToken: string
  balance: BigNumber
}

export default () => {
  const [value, setValue] = useState<IBalances[]>([]);
  const core = useCore();

  const fetchValue = useCallback(async () => {
    const promises = core.getCollateralTypes().map(collateralPoolToken => {
      const pool = core.getCollatearalPool(collateralPoolToken)
      const token = core.tokens[collateralPoolToken]
      return token.balanceOf(pool.address)
    })

    const vals = await Promise.all(promises)

    const results = vals.map((val, i) => ({
      poolToken: core.getCollateralTypes()[i],
      balance: val
    }))

    setValue(results);
  }, [core]);

  useEffect(() => {
    fetchValue().catch((err) =>
      console.error(`Failed to fetch collateral pool balances: ${err}`),
    );
  }, [fetchValue]);

  return value;
};
