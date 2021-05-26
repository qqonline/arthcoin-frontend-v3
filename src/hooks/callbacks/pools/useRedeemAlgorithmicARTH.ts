import { BigNumber } from 'ethers';
import { useCallback, useMemo } from 'react';
import { parseUnits } from 'ethers/lib/utils';

import useCore from '../../useCore';
import useSlippage from '../../useSlippage';
import { useAddPopup } from '../../../state/application/hooks';
import usePoolRedeemFees from '../../state/pools/usePoolRedeemFees';
import { useTransactionAdder } from '../../../state/transactions/hooks';

export default function (
  collateralToken: string,
  arthAmount: number,
  arthxOutMin: BigNumber
) {
  const core = useCore();
  const slippage = useSlippage();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();
  const redeemFee = usePoolRedeemFees(collateralToken);
  
  const arthXAmountAfterFees = useMemo(() => {
    return arthxOutMin
      .mul(BigNumber.from(1e6).sub(redeemFee))
      .div(1e6);
  }, [arthxOutMin, redeemFee]);

  const action = useCallback(
    async (callback: () => void): Promise<void> => {
      const pool = core.getCollatearalPool(collateralToken);
      
      try {
        const response = await pool.redeemAlgorithmicARTH(
          BigNumber.from(parseUnits(`${arthAmount}`, 18)),
          arthXAmountAfterFees
        );

        addTransaction(response, {
          summary: `Redeem ${arthAmount} ARTH`,
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
    },
    [
      core, 
      collateralToken, 
      arthAmount, 
      arthXAmountAfterFees, 
      addTransaction,
      addPopup
    ],
  );

  return action;
}
