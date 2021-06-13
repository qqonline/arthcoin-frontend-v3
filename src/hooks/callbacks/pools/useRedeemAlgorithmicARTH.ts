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
  arthAmount: BigNumber,
  arthxOutMin: BigNumber
) {
  const core = useCore();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();
  const arthxOutMinAfterSlippage = useApplySlippage(arthxOutMin);

  const action = useCallback(
    async (callback: () => void): Promise<void> => {
      const pool = core.getCollatearalGenesis(collateralToken);
      
      try {
        const response = await pool.redeemAlgorithmicARTH(
          arthAmount,
          arthxOutMinAfterSlippage
        );

        addTransaction(response, {
          summary: `Redeem ${Number(getDisplayBalance(arthAmount).toLocaleString())} ARTH`,
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
    },
    [
      core, 
      collateralToken, 
      arthAmount, 
      arthxOutMinAfterSlippage,
      addTransaction,
      addPopup
    ],
  );

  return action;
}
