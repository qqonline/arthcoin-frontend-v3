import { BigNumber } from 'ethers';
import { useCallback } from 'react';

import useCore from '../useCore';

import { useAddPopup } from '../../state/application/hooks';
import { getDisplayBalance } from '../../utils/formatBalance';
import formatErrorMessage from '../../utils/formatErrorMessage';
import { useTransactionAdder } from '../../state/transactions/hooks';

export default function (symbol: string, amount: BigNumber) {
  const core = useCore();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();

  const action = useCallback(
    async (callback?: () => void): Promise<void> => {
      const weth = core.contracts.WETH_WRAPPER;

      try {
        const response = await weth.deposit({ value: amount });

        addTransaction(response, {
          summary: `Wrap ${Number(
            getDisplayBalance(amount, 18, 3),
          ).toLocaleString()} ${symbol}`,
        });

        if (callback) callback();
      } catch (e) {
        addPopup({
          error: {
            message: formatErrorMessage(e?.data?.message || e?.message),
            stack: e?.stack,
          },
        });
      }
    },
    [core.contracts.WETH_WRAPPER, amount, addTransaction, symbol, addPopup],
  );

  return action;
}
