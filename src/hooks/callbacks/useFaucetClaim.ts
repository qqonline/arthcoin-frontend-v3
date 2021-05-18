import { useCallback } from 'react';
import { useTransactionAdder } from '../../state/transactions/hooks';
import useCore from '../useCore';


export default function () {
  const addTransaction = useTransactionAdder();
  const core = useCore();

  const action = useCallback(async (): Promise<void> => {
    const contract = core.contracts.Faucet

    const response = await contract.faucet()
    addTransaction(response, {
      summary: `Claim from Faucet`
    });

  }, [core, addTransaction]);

  // TODO: do something about the apprve

  return action;
}
