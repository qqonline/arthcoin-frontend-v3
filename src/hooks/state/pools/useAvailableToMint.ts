import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../../useCore';
import useTokenDecimals from '../../useTokenDecimals';
import { useBlockNumber } from '../../../state/application/hooks';

export default (collateralPoolToken: string) => {
  const [value, setValue] = useState(BigNumber.from(0));

  const core = useCore();
  const blockNumber = useBlockNumber();
  const tokenDecimals = useTokenDecimals(collateralPoolToken);

  const fetchValue = useCallback(async () => {
    const token = core.tokens[collateralPoolToken];
    const pool = core.getCollatearalPool(collateralPoolToken);
    
    const poolCeiling = await pool.poolCeiling();
    const collateralPrice = await pool.getCollateralPrice();
    const poolBalance = await token.balanceOf(pool.address);
  
    if (poolBalance.gt(poolCeiling)) setValue(BigNumber.from(0));
    else setValue(
      poolCeiling
        .sub(poolBalance)
        .mul(collateralPrice)
        .mul(BigNumber.from(10).pow(18 - tokenDecimals))
        .div(1e6)
    );
  }, [collateralPoolToken, tokenDecimals, core]);

  useEffect(() => {
    fetchValue().catch((err) =>
      console.error(`Failed to fetch collateral token price: ${err}`),
    );
  }, [blockNumber, fetchValue]);

  return value;
};
