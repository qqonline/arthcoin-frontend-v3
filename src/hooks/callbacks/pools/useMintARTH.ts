import { BigNumber } from 'ethers';
import { useCallback, useMemo } from 'react';
import { parseUnits } from 'ethers/lib/utils';
import useTokenDecimals from '../../useTokenDecimals';

import useCore from '../../useCore';
import { useTransactionAdder } from '../../../state/transactions/hooks';

export default function (
  collateralToken: string, 
  collateralAmount: number,
  arthOutMin: number, 
  mintingFee: BigNumber, 
  slippage: number
) {
  const core = useCore();
  const addTransaction = useTransactionAdder();
  const tokenDecimals = useTokenDecimals(collateralToken);

  const arthAmountAfterFees = useMemo(() => {
    const fee = BigNumber.from(1e6).sub(mintingFee)

    return BigNumber
      .from(parseUnits(`${arthOutMin}`, 18))
      .mul(fee)
      .div(1e6)
  }, [arthOutMin, mintingFee]);

  const action = useCallback(async (callback: () => void): Promise<void> => {
    const pool = core.getCollatearalPool(collateralToken)

    const response = await pool.mint1t1ARTH(
      BigNumber.from(parseUnits(`${collateralAmount}`, tokenDecimals)),
      arthAmountAfterFees
    );

    addTransaction(response, {
      summary: `Mint ${arthOutMin} ARTH`
    });

    callback()

  }, [
    core, 
    tokenDecimals, 
    collateralToken, 
    collateralAmount, 
    arthAmountAfterFees, 
    addTransaction, 
    arthOutMin
  ]);

  return action;
}
