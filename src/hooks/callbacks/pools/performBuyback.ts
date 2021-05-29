import { BigNumber } from 'ethers';
import { useCallback } from 'react';

import useCore from '../../useCore';
import useApplySlippage from '../../useApplySlippage';
import { useAddPopup } from '../../../state/application/hooks';
import { getDisplayBalance } from '../../../utils/formatBalance';
import formatErrorMessage from '../../../utils/formatErrorMessage';
import { useTransactionAdder } from '../../../state/transactions/hooks';

export default function (
  collateralToken: string, 
  arthxAmount: BigNumber, 
  collateralOutMin: BigNumber
) {
  const core = useCore();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();
  const collateralOutMinAfterSlippage = useApplySlippage(collateralOutMin);

  const action = useCallback(async (callback?: () => void): Promise<void> => {
    const pool = core.getCollatearalPool(collateralToken);
    
    try {
      const response = await pool.buyBackARTHX(arthxAmount, collateralOutMinAfterSlippage);

      addTransaction(response, {
        summary: `Buyback ${Number(getDisplayBalance(arthxAmount, 18, 3)).toLocaleString()} ARTHX`
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
    addPopup,
    collateralToken, 
    arthxAmount, 
    collateralOutMinAfterSlippage,
    addTransaction
  ]);

  return action;
}
