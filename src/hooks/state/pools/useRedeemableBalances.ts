import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

import useCore from '../../useCore';
import { useBlockNumber } from '../../../state/application/hooks';

export default (collateralPoolToken: string) => {
  const [value, setValue] = useState([BigNumber.from(0), BigNumber.from(0)]);
  
  const core = useCore();
  const blockNumber = useBlockNumber();

  const fetchValue = useCallback(async () => {
    const pool = core.getCollatearalPool(collateralPoolToken);

    const arthxBal = await pool.redeemARTHXBalances(core.myAccount)
    const collateralBal = await pool.redeemCollateralBalances(core.myAccount)
    setValue([collateralBal, arthxBal]);
  }, [collateralPoolToken, core]);

  useEffect(() => {
    if (core.isUnlocked && collateralPoolToken) {
      fetchValue().catch((err) =>
        console.error(
          `Failed to fetch redeemable balance of ${collateralPoolToken}: ${err.stack} `,
        ),
      );
    }
  }, [blockNumber, collateralPoolToken, core.isUnlocked, fetchValue]);

  return value;
};

