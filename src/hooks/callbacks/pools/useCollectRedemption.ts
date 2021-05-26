import { useCallback } from 'react';

import useCore from '../../useCore';
import { useTransactionAdder } from '../../../state/transactions/hooks';

export default function (collateralToken: string) {
  const core = useCore();
  const addTransaction = useTransactionAdder();

  const action = useCallback(async (): Promise<void> => {
    const pool = core.getCollatearalPool(collateralToken);
    const response = await pool.collectRedemption();

    addTransaction(response, {
      summary: `Collect redeemption ARTH`
    });
  }, [core, collateralToken, addTransaction]);

  return action;
}
