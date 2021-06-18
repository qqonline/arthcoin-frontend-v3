import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../../useCore';

type State = {
  isLoading: boolean;
  value: BigNumber;
}

export default (collateralPoolToken: string) => {
  const [value, setValue] = useState<State>({isLoading: true, value: BigNumber.from(0)});
  const core = useCore();

  const fetchValue = useCallback(async () => {
    const pool = core.getCollatearalPool(collateralPoolToken);
    setValue({isLoading: false, value: await pool.getCollateralPrice()});
  }, [collateralPoolToken, core]);

  useEffect(() => {
    fetchValue().catch((err) =>
      console.error(`Failed to fetch collateral token price: ${err}`),
    );
  }, [fetchValue]);

  return value;
};
