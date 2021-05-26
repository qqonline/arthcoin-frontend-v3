import { BigNumber } from 'ethers';
import { useCallback, useMemo } from 'react';
import { parseUnits } from 'ethers/lib/utils';

import { useTransactionAdder } from '../../../state/transactions/hooks';
import useCore from '../../useCore';
import useSlippage from '../../useSlippage'
import usePoolRedeemFees from '../../state/pools/usePoolRedeemFees'
import useTokenDecimals from '../../useTokenDecimals';


export default function (
  collateralToken: string,
  arthAmount: number
) {
  const core = useCore();
  const slippage = useSlippage();
  const addTransaction = useTransactionAdder();
  const redeemFee = usePoolRedeemFees(collateralToken);
  const tokenDecimals = useTokenDecimals(collateralToken);

  const collateralAmountAfterFees = useMemo(() => {
    const fee = BigNumber.from(1e6).sub(redeemFee);

    return BigNumber
      .from(parseUnits(`${arthAmount}`, 18))
      .mul(fee)
      .div(BigNumber.from(10).pow(18 - tokenDecimals))
      .div(1e6);
  }, [arthAmount, redeemFee, tokenDecimals]);

  const action = useCallback(
    async (callback: () => void): Promise<void> => {
      const pool = core.getCollatearalPool(collateralToken);

      let response;
      try {
        response = await pool.redeem1t1ARTH(
          BigNumber.from(parseUnits(`${arthAmount}`, 18)),
          collateralAmountAfterFees,
        );
      } catch(e) {
        response = null;
      }
      
      if (response) addTransaction(response, {
        summary: `Redeem ARTH`,
      });

      callback();
    },
    [core, collateralAmountAfterFees, collateralToken, arthAmount, addTransaction],
  );

  return action;
}
