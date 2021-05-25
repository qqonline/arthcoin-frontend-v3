import { useCallback } from 'react';
import { useTransactionAdder } from '../../../state/transactions/hooks';
import useCore from '../../useCore';


export default function (stakingContract: string) {
  const addTransaction = useTransactionAdder();
  const core = useCore();

  const action = useCallback(async (callback: () => void): Promise<void> => {
    const contract = core.contracts[stakingContract]
    const response = await contract.getRewardAndDistribute()
    
    addTransaction(response, {
      summary: `Claim Rewards`
    });

    callback();
  }, [core.contracts, stakingContract, addTransaction]);

  return action;
}
