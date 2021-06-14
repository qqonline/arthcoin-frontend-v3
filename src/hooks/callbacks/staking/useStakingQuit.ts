import { useCallback } from 'react';

import useCore from '../../useCore';
import { useAddPopup } from '../../../state/application/hooks';
import formatErrorMessage from '../../../utils/formatErrorMessage';
import { useTransactionAdder } from '../../../state/transactions/hooks';

export default function (stakingContract: string) {
  const core = useCore();
  const addPopup = useAddPopup();
  const addTransaction = useTransactionAdder();

  const action = useCallback(async (callback: () => void): Promise<void> => {
    const contract = core.contracts[stakingContract];

    try {
      const response = await contract.exit();

      addTransaction(response, {
        summary: `Claim rewards and and withdraw`
      });

      if (callback) callback();
    } catch (e) {
      addPopup({
        error: {
          message: formatErrorMessage(e?.data?.message || e?.message),
          stack: e.stack
        }
      });
    }
  }, [
    core.contracts,
    stakingContract,
    addPopup,
    addTransaction
  ]);

  return action;
}
