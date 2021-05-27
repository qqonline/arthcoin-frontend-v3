import { BigNumber } from 'ethers';
import { useCallback, useMemo } from 'react';
import { parseUnits } from 'ethers/lib/utils';

import useCore from '../../useCore';
import useSlippage from '../../useSlippage';
import useTokenDecimals from '../../useTokenDecimals';
import { useAddPopup } from '../../../state/application/hooks';
import usePoolRedeemFees from '../../state/pools/usePoolRedeemFees';
import formatErrorMessage from '../../../utils/formatErrorMessage';
import { useTransactionAdder } from '../../../state/transactions/hooks';

export default function (
  collateralToken: string,
  arthAmount: number
) {
  const core = useCore();
  const slippage = useSlippage();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();
  const redeemFee = usePoolRedeemFees(collateralToken);
  const tokenDecimals = useTokenDecimals(collateralToken);

  const collateralAmountAfterFees = useMemo(() => {
    return BigNumber
      .from(parseUnits(`${arthAmount}`, 18))
      .mul(BigNumber.from(1e6).sub(redeemFee))
      .div(BigNumber.from(10).pow(18 - tokenDecimals))
      .div(1e6);
  }, [arthAmount, redeemFee, tokenDecimals]);

  const action = useCallback(
    async (callback: () => void): Promise<void> => {
      const pool = core.getCollatearalPool(collateralToken);

      try {
        const response = await pool.redeem1t1ARTH(
          BigNumber.from(parseUnits(`${arthAmount}`, 18)),
          collateralAmountAfterFees,
        );

        addTransaction(response, {
          summary: `Redeem ARTH`,
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
      collateralAmountAfterFees, 
      collateralToken, 
      arthAmount, 
      addPopup,
      addTransaction
    ],
  );

  return action;
}
