import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../../useCore';
import useTokenDecimals from '../../useTokenDecimals';
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
    const promises: Promise<BigNumber>[] = core.getCollateralTypes().map(async (collateralPoolToken) => {
      const token = core.tokens[collateralPoolToken];
      const pool = core.getCollatearalPool(collateralPoolToken);
      const tokenDecimals = core.tokens[collateralPoolToken].decimal;
      
      const poolCeiling = await pool.poolCeiling();
      const collateralPrice = await pool.getCollateralPrice();
      const poolBalance = await token.balanceOf(pool.address);

      if (poolBalance.gt(poolCeiling)) return BigNumber.from(0);
      return (
        poolCeiling
          .sub(poolBalance)
          .mul(collateralPrice)
          .mul(BigNumber.from(10).pow(18 - tokenDecimals))
          .div(1e6)
      );
    })

    const poolAvailableToMint = await Promise.all(promises);
    const totalAvailableToMint = poolAvailableToMint.reduce((a, b) => a.add(b), BigNumber.from(0));

    setValue({isLoading: false, value: totalAvailableToMint});
  }, [core]);

  useEffect(() => {
    fetchValue().catch((err) =>
      console.error(`Failed to fetch collateral pool balances: ${err}`),
    );
  }, [blockNumber, fetchValue]);

  return value;
};
