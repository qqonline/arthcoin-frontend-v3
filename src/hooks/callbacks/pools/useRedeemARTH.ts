import { BigNumber } from 'ethers';
import { useCallback} from 'react';

import useCore from '../../useCore';
import useApplySlippage from '../../useApplySlippage';
import { useAddPopup } from '../../../state/application/hooks';
import { getDisplayBalance } from '../../../utils/formatBalance';
import formatErrorMessage from '../../../utils/formatErrorMessage';
import { useTransactionAdder } from '../../../state/transactions/hooks';

export default function (
  collateralToken: string,
  arthAmount: BigNumber,
  collateralOutMin: BigNumber
) {
  const core = useCore();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();
  const collateralOutMinAfterSlippage = useApplySlippage(collateralOutMin);

  const action = useCallback(
    async (callback: () => void): Promise<void> => {
      const pool = core.getCollatearalPool(collateralToken);

      try {
        const response = await pool.redeem1t1ARTH(
          arthAmount,
          collateralOutMinAfterSlippage,
        );

        addTransaction(response, {
          summary: `Redeem ${Number(getDisplayBalance(arthAmount)).toLocaleString()} ARTH`,
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
      collateralOutMinAfterSlippage, 
      collateralToken, 
      arthAmount, 
      addPopup,
      addTransaction
    ],
  );

  return action;
}
