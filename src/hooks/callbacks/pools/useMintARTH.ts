import { BigNumber } from 'ethers';
import { useCallback, useMemo } from 'react';
import { parseUnits } from 'ethers/lib/utils';

import useCore from '../../useCore';
import useTokenDecimals from '../../useTokenDecimals';
import { useAddPopup } from '../../../state/application/hooks';
import formatErrorMessage from '../../../utils/formatErrorMessage';
import { useTransactionAdder } from '../../../state/transactions/hooks';

export default function (
  collateralToken: string, 
  collateralAmount: number,
  arthOutMin: number, 
  mintingFee: BigNumber, 
  slippage: number
) {
  const core = useCore();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();
  const tokenDecimals = useTokenDecimals(collateralToken);

  const arthAmountAfterFees = useMemo(() => {
    return BigNumber
      .from(parseUnits(`${arthOutMin}`, 18))
      .mul(BigNumber.from(1e6).sub(mintingFee))
      .div(1e6);
  }, [arthOutMin, mintingFee]);

  const action = useCallback(async (callback: () => void): Promise<void> => {
    const pool = core.getCollatearalPool(collateralToken);

    try {
      const response = await pool.mint1t1ARTH(
        BigNumber.from(parseUnits(`${collateralAmount}`, tokenDecimals)),
        arthAmountAfterFees
      );
      
      addTransaction(response, {
        summary: `Mint ${arthOutMin} ARTH`
      });

      callback();
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
    tokenDecimals, 
    collateralToken, 
    collateralAmount, 
    arthAmountAfterFees, 
    addPopup,
    addTransaction, 
    arthOutMin
  ]);

  return action;
}
