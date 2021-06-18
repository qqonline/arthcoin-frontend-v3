import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../../useCore';
import { useBlockNumber } from '../../../state/application/hooks';

type State = {
  isLoading: boolean;
  value: BigNumber;
}

export default () => {
  const [value, setValue] = useState<State>({isLoading: true, value: BigNumber.from(0)});

  const core = useCore();
  const blockNumber = useBlockNumber();

  const fetchValue = useCallback(async () => {
    const promises = core.getCollateralTypes().map(collateralPoolToken => {
      const pool = core.getCollatearalPool(collateralPoolToken)
      return pool.getAvailableExcessCollateralDV();
    })

    const excessCollaterals = await Promise.all(promises);
    const totalExcessCollateral = excessCollaterals.reduce((a, b) => a.add(b), BigNumber.from(0));

    setValue({isLoading: false, value: totalExcessCollateral});
  }, [core]);

  useEffect(() => {
    fetchValue().catch((err) =>
      console.error(`Failed to fetch collateral pool balances: ${err}`),
    );
  }, [blockNumber, fetchValue]);

  return value;
};
