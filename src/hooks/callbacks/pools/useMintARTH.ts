import { BigNumber } from 'ethers';
import { useCallback, useMemo } from 'react';
import { useTransactionAdder } from '../../../state/transactions/hooks';
import useCore from '../../useCore';


export default function (collateralToken: string, collateralAmount: number, arthxAmount: number, arthOutMin: number, mintingFee: BigNumber, slippage: number) {
  const addTransaction = useTransactionAdder();
  const core = useCore();

  const arthAmountAfterFees = useMemo(() => {
    const mintingAmount = BigNumber.from(Math.floor(Number(arthOutMin) * 1e6));
    return mintingAmount.mul(BigNumber.from(1e6).sub(mintingFee)).div(1e6);
  }, [arthOutMin, mintingFee]);

  const action = useCallback(async (): Promise<void> => {
    const pool = core.getCollatearalPool(collateralToken)

    const response = await pool.mint1t1ARTH(
      BigNumber.from(Math.floor(collateralAmount * 1e6)),
      arthAmountAfterFees
    )

    addTransaction(response, {
      summary: `Mint ${arthOutMin} ARTH`
    });

  }, [core, collateralToken, collateralAmount, arthAmountAfterFees, addTransaction, arthOutMin]);

  // TODO: do something about the apprve

  return action;
}
