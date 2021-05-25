import { BigNumber } from 'ethers';
import { useCallback } from 'react';

import { useTransactionAdder } from '../../../state/transactions/hooks';
import useCore from '../../useCore';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useTokenDecimals from '../../useTokenDecimals';

export default function (collateralToken: string, collateralAmount: BigNumber, arthxOutMin: BigNumber) {
  const addTransaction = useTransactionAdder();
  const core = useCore();

  const action = useCallback(async (callback?: () => void): Promise<void> => {
    const pool = core.getCollatearalPool(collateralToken)
    const decimals = useTokenDecimals(collateralToken)
    
    const response = await pool.recollateralizeARTH(collateralAmount, arthxOutMin)
    
    addTransaction(response, {
      summary: `Recollateralize ${getDisplayBalance(collateralAmount, decimals, 3)} ${collateralToken}`
    });

    if (callback) callback()
  }, [core, collateralToken, collateralAmount, arthxOutMin, addTransaction]);

  // TODO: do something about the apprve

  return action;
}
