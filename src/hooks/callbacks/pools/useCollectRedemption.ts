import { useCallback } from 'react';

import useCore from '../../useCore';
import { useAddPopup } from '../../../state/application/hooks';
import formatErrorMessage from '../../../utils/formatErrorMessage';
import { useTransactionAdder } from '../../../state/transactions/hooks';

export default function (collateralToken: string) {
  const core = useCore();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();

  const action = useCallback(async (): Promise<void> => {
    const pool = core.getCollatearalPool(collateralToken);
    
    try{
      const response = await pool.collectRedemption();

      addTransaction(response, {
        summary: `Collect redeemption ARTH`
      });
    } catch(e) {
      addPopup({
        error: {
          message: formatErrorMessage(e?.data?.message || e?.message),
          stack: e?.stack
        }
      });
    }
  }, [core, addPopup, collateralToken, addTransaction]);

  return action;
}
