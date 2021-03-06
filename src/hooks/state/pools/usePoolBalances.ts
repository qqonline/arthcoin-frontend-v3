import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../../useCore';
import { useBlockNumber } from '../../../state/application/hooks';

interface IBalances {
  poolToken: string
  balance: BigNumber
}

type State = {
  isLoading: boolean;
  value: IBalances[];
}

export default () => {
  const [value, setValue] = useState<State>({isLoading: true, value: []});
  
  const core = useCore();
  const blockNumber = useBlockNumber();

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

    setValue({isLoading: false, value: results});
  }, [core]);

  useEffect(() => {
    fetchValue().catch((err) =>
      console.error(`Failed to fetch collateral pool balances: ${err}`),
    );
  }, [blockNumber, fetchValue]);

  return value;
};
