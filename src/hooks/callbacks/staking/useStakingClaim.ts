import { useCallback } from 'react';

import useCore from '../../useCore';
import { useTransactionAdder } from '../../../state/transactions/hooks';

export default function (stakingContract: string) {
  const core = useCore();
  const addTransaction = useTransactionAdder();

  const action = useCallback(async (callback: () => void): Promise<void> => {
    const contract = core.contracts[stakingContract];
    const response = await contract.getRewardAndDistribute();
    
    addTransaction(response, {
      summary: `Claim Rewards`
    });

    if (callback) callback();
  }, [core.contracts, stakingContract, addTransaction]);

  return action;
}
