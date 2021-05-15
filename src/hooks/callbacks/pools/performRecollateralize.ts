import { BigNumber } from 'ethers';
import { useCallback } from 'react';
import { useTransactionAdder } from '../../../state/transactions/hooks';
import useCore from '../../useCore';
import { getDisplayBalance } from '../../../utils/formatBalance';



export default function (collateralToken: string, collateralAmount: BigNumber, arthxOutMin: BigNumber) {
  const addTransaction = useTransactionAdder();
  const core = useCore();

  const action = useCallback(async (): Promise<void> => {
    const pool = core.getCollatearalPool(collateralToken)

    console.log(collateralAmount.toString(), arthxOutMin)
    const response = await pool.recollateralizeARTH(collateralAmount, arthxOutMin)
    addTransaction(response, {
      summary: `Recollateralize ${getDisplayBalance(collateralAmount)} ${collateralToken}`
    });

  }, [core, collateralToken, collateralAmount, arthxOutMin, addTransaction]);

  // TODO: do something about the apprve

  return action;
}
