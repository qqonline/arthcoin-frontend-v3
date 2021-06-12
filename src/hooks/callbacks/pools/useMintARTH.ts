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
  collateralAmount: BigNumber,
  arthOutMin: BigNumber,
  arthxOutMin: BigNumber
) {
  const core = useCore();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();
  const arthOutMinAfterSlippage = useApplySlippage(arthOutMin);
  const arthxOutMinAfterSlippage = useApplySlippage(arthxOutMin);

  const action = useCallback(async (callback: () => void): Promise<void> => {
    const pool = core.getCollatearalPool(collateralToken);

    try {
      const response = await pool.mint1t1ARTH(
        collateralAmount,
        arthOutMinAfterSlippage,
        arthxOutMinAfterSlippage
      );
      
      addTransaction(response, {
        summary: `Mint ${Number(getDisplayBalance(arthOutMin)).toLocaleString()} ARTH`
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
    collateralToken, 
    collateralAmount, 
    arthOutMinAfterSlippage,
    addPopup,
    addTransaction, 
    arthOutMin,
    arthxOutMinAfterSlippage
  ]);

  return action;
}
