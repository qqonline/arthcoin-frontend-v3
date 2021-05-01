import { useCallback } from 'react';
import { useTransactionAdder } from '../../../state/transactions/hooks';
import useCore from '../../useCore';


export default function (stakingContract: string) {
  const addTransaction = useTransactionAdder();
  const core = useCore();

  const action = useCallback(async (): Promise<void> => {
    const contract = core.contracts[stakingContract]
    const response = await contract.getReward()
    addTransaction(response, {
      summary: `Claim Rewards`
    });

  }, [core.contracts, stakingContract, addTransaction]);

  return action;
}
