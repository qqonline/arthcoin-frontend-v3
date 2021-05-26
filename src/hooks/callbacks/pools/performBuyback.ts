import { BigNumber } from 'ethers';
import { useCallback } from 'react';

import useCore from '../../useCore';
import { useAddPopup } from '../../../state/application/hooks';
import { getDisplayBalance } from '../../../utils/formatBalance';
import { useTransactionAdder } from '../../../state/transactions/hooks';

export default function (
  collateralToken: string, 
  arthxAmount: BigNumber, 
  collateralOutMin: BigNumber
) {
  const core = useCore();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();

  const action = useCallback(async (callback?: () => void): Promise<void> => {
    const pool = core.getCollatearalPool(collateralToken);
    
    try {
      const response = await pool.buyBackARTHX(arthxAmount, collateralOutMin);

      addTransaction(response, {
        summary: `Buyback ${getDisplayBalance(arthxAmount, 18, 3)} ARTHX`
      });

      if (callback) callback();
    } catch(e) {
      addPopup({
        error: {
          message: e.data.message,
          stack: e.stack
        }
      });
    }
  }, [
    core, 
    addPopup,
    collateralToken, 
    arthxAmount, 
    collateralOutMin, 
    addTransaction
  ]);

  return action;
}
