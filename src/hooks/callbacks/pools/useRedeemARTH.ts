import { BigNumber } from 'ethers';
import { useCallback, useMemo } from 'react';
import { useTransactionAdder } from '../../../state/transactions/hooks';
import useCore from '../../useCore';

export default function (
  collateralToken: string,
  arthAmount: number,
  arthxAmount: number,
  collatearlOutMin: number,
  redeemFee: BigNumber,
  slippage: number,
) {
  const addTransaction = useTransactionAdder();
  const core = useCore();

  const collateralAmountAfterFees = useMemo(() => {
    const mintingAmount = BigNumber.from(Math.floor(Number(collatearlOutMin) * 1e6));
    return mintingAmount.mul(BigNumber.from(1e6).sub(redeemFee)).div(1e6);
  }, [collatearlOutMin, redeemFee]);

  const action = useCallback(
    async (callback: () => void): Promise<void> => {
      const pool = core.getCollatearalPool(collateralToken);

      console.log(
        BigNumber.from(Math.floor(arthAmount * 1e6)).toString(),
        collateralAmountAfterFees.toString(),
      );

      const response = await pool.redeem1t1ARTH(
        BigNumber.from(Math.floor(arthAmount * 1e6)),
        collateralAmountAfterFees,
      );

      addTransaction(response, {
        summary: `Redeem ${collatearlOutMin} ARTH`,
      });

      callback();
    },
    [
      core,
      collateralToken,
      arthAmount,
      collateralAmountAfterFees,
      addTransaction,
      collatearlOutMin,
    ],
  );

  return action;
}
