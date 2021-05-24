import { BigNumber } from 'ethers';
import { useCallback, useMemo } from 'react';
import { parseUnits } from 'ethers/lib/utils';

import { useTransactionAdder } from '../../../state/transactions/hooks';
import useCore from '../../useCore';
import useSlippage from '../../useSlippage'
import usePoolRedeemFees from '../../state/pools/usePoolRedeemFees'

export default function (
  collateralToken: string,
  arthAmount: number,
  arthxOutMin: BigNumber
) {
  const core = useCore();
  const redeemFee = usePoolRedeemFees(collateralToken);
  const addTransaction = useTransactionAdder();
  // const slippage = useSlippage();

  const arthXAmountAfterFees = useMemo(() => {
    return arthxOutMin.mul(BigNumber.from(1e6).sub(redeemFee)).div(1e6);
  }, [arthxOutMin, redeemFee]);

  const action = useCallback(
    async (callback: () => void): Promise<void> => {
      const pool = core.getCollatearalPool(collateralToken);
      const response = await pool.redeemAlgorithmicARTH(
        BigNumber.from(parseUnits(`${arthAmount}`, 18)),
        arthXAmountAfterFees
      );

      addTransaction(response, {
        summary: `Redeem ${arthAmount} ARTH`,
      });

      callback();
    },
    [core, collateralToken, arthAmount, arthXAmountAfterFees, addTransaction],
  );

  return action;
}
