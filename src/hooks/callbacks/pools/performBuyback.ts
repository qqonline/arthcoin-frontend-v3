import { BigNumber } from 'ethers';
import { useCallback } from 'react';

import useCore from '../../useCore';
import { useTransactionAdder } from '../../../state/transactions/hooks';

import { getDisplayBalance } from '../../../utils/formatBalance';

export default function (collateralToken: string, arthxAmount: BigNumber, collateralOutMin: BigNumber) {
  const core = useCore();
  const addTransaction = useTransactionAdder();

  const action = useCallback(async (callback?: () => void): Promise<void> => {
    const pool = core.getCollatearalPool(collateralToken)
    const response = await pool.buyBackARTHX(arthxAmount, collateralOutMin)

    addTransaction(response, {
      summary: `Buyback ${getDisplayBalance(arthxAmount, 18, 3)} ARTHX`
    });

    if (callback) callback();
  }, [core, collateralToken, arthxAmount, collateralOutMin, addTransaction]);

  // TODO: do something about the apprve

  return action;
}
