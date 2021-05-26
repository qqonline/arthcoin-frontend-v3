import { BigNumber } from 'ethers';
import { useCallback } from 'react';

import useCore from '../../useCore';
import useTokenDecimals from '../../useTokenDecimals';
import { getDisplayBalance } from '../../../utils/formatBalance';
import { useTransactionAdder } from '../../../state/transactions/hooks';

export default function (collateralToken: string, collateralAmount: BigNumber, arthxOutMin: BigNumber) {
  const core = useCore();
  const addTransaction = useTransactionAdder();
  const decimals = useTokenDecimals(collateralToken);

  const action = useCallback(async (callback?: () => void): Promise<void> => {
    const pool = core.getCollatearalPool(collateralToken);
    const response = await pool.recollateralizeARTH(collateralAmount, arthxOutMin);
    
    addTransaction(response, {
      summary: `Recollateralize ${getDisplayBalance(collateralAmount, decimals, 3)} ${collateralToken}`
    });

    if (callback) callback();
  }, [core, collateralToken, decimals, collateralAmount, arthxOutMin, addTransaction]);

  return action;
}
