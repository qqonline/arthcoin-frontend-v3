import { useCallback } from 'react';
import { useTransactionAdder } from '../../../state/transactions/hooks';
import useCore from '../../useCore';


export default function (collateralToken: string) {
  const addTransaction = useTransactionAdder();
  const core = useCore();

  const action = useCallback(async (): Promise<void> => {
    const pool = core.getCollatearalPool(collateralToken)

    const response = await pool.collectRedemption()
    addTransaction(response, {
      summary: `Collect redeemption ARTH`
    });

  }, [core, collateralToken, addTransaction]);

  // TODO: do something about the apprve

  return action;
}
