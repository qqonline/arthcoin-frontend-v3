import { BigNumber } from 'ethers';
import { useCallback } from 'react';
import { useTransactionAdder } from '../../../state/transactions/hooks';
import useCore from '../../useCore';
import { getDisplayBalance } from '../../../utils/formatBalance';



export default function (collateralToken: string, collateralAmount: BigNumber, arthOutMin: BigNumber) {
  const addTransaction = useTransactionAdder();
  const core = useCore();

  const action = useCallback(async (): Promise<void> => {
    const pool = core.getCollatearalPool(collateralToken)

    const response = await pool.mint1t1ARTH(collateralAmount, arthOutMin)
    addTransaction(response, {
      summary: `Mint ${getDisplayBalance(arthOutMin)} ARTH`
    });

  }, [core, collateralToken, collateralAmount, arthOutMin, addTransaction]);

  // TODO: do something about the apprve

  return action;
}
