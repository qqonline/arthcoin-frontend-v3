import { BigNumber } from 'ethers';
import { useCallback, useMemo } from 'react';
import { parseUnits } from 'ethers/lib/utils';

import useCore from '../../useCore';
import useTokenDecimals from '../../useTokenDecimals';
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
    return BigNumber
      .from(parseUnits(`${arthOutMin}`, 18))
      .mul(BigNumber.from(1e6).sub(mintingFee))
      .div(1e6);
  }, [arthOutMin, mintingFee]);

  const action = useCallback(async (callback: () => void): Promise<void> => {
    const pool = core.getCollatearalPool(collateralToken);

    let response;
    try {
      response = await pool.mint1t1ARTH(
        BigNumber.from(parseUnits(`${collateralAmount}`, tokenDecimals)),
        arthAmountAfterFees
      );
    } catch(e) {
      response = null;
    }
   
    if (response) addTransaction(response, {
      summary: `Mint ${arthOutMin} ARTH`
    });

    if (response) callback();
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
