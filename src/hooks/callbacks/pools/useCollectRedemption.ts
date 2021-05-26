import { useCallback } from 'react';

import useCore from '../../useCore';
import { useAddPopup } from '../../../state/application/hooks';
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
          message: e.data.message,
          stack: e.stack
        }
      });
    }
  }, [core, addPopup, collateralToken, addTransaction]);

  return action;
}
