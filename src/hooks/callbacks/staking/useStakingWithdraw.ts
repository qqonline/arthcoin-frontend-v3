import { BigNumber } from 'ethers';
import { useCallback } from 'react';
import { parseUnits } from 'ethers/lib/utils';

import { useTransactionAdder } from '../../../state/transactions/hooks';
import useCore from '../../useCore';
import useTokenDecimals from '../../useTokenDecimals';


export default function (stakingContract: string, amount: number, depositToken: string) {
  const addTransaction = useTransactionAdder();
  const core = useCore();
  const tokenDecimals = useTokenDecimals(depositToken);

  const action = useCallback(async (callback: () => void): Promise<void> => {
    const contract = core.contracts[stakingContract]
    
    const response = await contract.withdraw(BigNumber.from(
      parseUnits(`${amount}`, tokenDecimals)
    ));

    addTransaction(response, {
      summary: `Withdraw ${amount} ${depositToken}`
    });

    if (callback) callback();
  }, [core.contracts, tokenDecimals, stakingContract, amount, addTransaction, depositToken]);

  return action;
}
