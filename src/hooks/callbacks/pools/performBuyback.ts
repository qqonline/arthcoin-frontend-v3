import { BigNumber } from 'ethers';
import { useCallback } from 'react';

import useCore from '../../useCore';
import { getDisplayBalance } from '../../../utils/formatBalance';
import { useTransactionAdder } from '../../../state/transactions/hooks';

export default function (
  collateralToken: string, 
  arthxAmount: BigNumber, 
  collateralOutMin: BigNumber
) {
  const core = useCore();
  const addTransaction = useTransactionAdder();

  const action = useCallback(async (callback?: () => void): Promise<void> => {
    const pool = core.getCollatearalPool(collateralToken);
    const response = await pool.buyBackARTHX(arthxAmount, collateralOutMin);

    addTransaction(response, {
      summary: `Buyback ${getDisplayBalance(arthxAmount, 18, 3)} ARTHX`
    });

    if (callback) callback();
  }, [core, collateralToken, arthxAmount, collateralOutMin, addTransaction]);

  return action;
}
