import { useCallback } from 'react';
import { useTransactionAdder } from '../state/transactions/hooks';
import useBasisCash from './useBasisCash'


// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
function useAdvanceEpoch()  {

  const basisCash = useBasisCash();
  const addTransaction = useTransactionAdder();

  const approve = useCallback(async (): Promise<void> => {
    const treasury = basisCash.contracts.Treasury
    const response = await treasury.allocateSeigniorage();
    addTransaction(response, { summary: `Advancing Epoch` });
  }, [addTransaction, basisCash]);

  return approve;
}

export default useAdvanceEpoch;
