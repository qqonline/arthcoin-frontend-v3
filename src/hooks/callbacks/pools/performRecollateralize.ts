import { BigNumber } from 'ethers';
import { useCallback } from 'react';

import useCore from '../../useCore';
import useTokenDecimals from '../../useTokenDecimals';
import { useAddPopup } from '../../../state/application/hooks';
import { getDisplayBalance } from '../../../utils/formatBalance';
import formatErrorMessage from '../../../utils/formatErrorMessage';
import { useTransactionAdder } from '../../../state/transactions/hooks';

export default function (collateralToken: string, collateralAmount: BigNumber, arthxOutMin: BigNumber) {
  const core = useCore();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();
  const decimals = useTokenDecimals(collateralToken);

  const action = useCallback(async (callback?: () => void): Promise<void> => {
    const pool = core.getCollatearalPool(collateralToken);
    
    try {
      const response = await pool.recollateralizeARTH(collateralAmount, arthxOutMin);
      
      addTransaction(response, {
        summary: `Recollateralize ${Number(getDisplayBalance(collateralAmount, decimals, 3)).toLocaleString()} ${collateralToken}`
      });

      if (callback) callback();
    } catch(e) {
      addPopup({
        error: {
          message: formatErrorMessage(e?.data?.message || e?.message),
          stack: e?.stack
        }
      });
    }
  }, [
    core, 
    collateralToken, 
    decimals,
    addPopup,
    collateralAmount, 
    arthxOutMin, 
    addTransaction
  ]);

  return action;
}
