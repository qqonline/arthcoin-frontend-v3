import { BigNumber } from 'ethers';
import { useCallback } from 'react';
import { parseUnits } from 'ethers/lib/utils';

import useCore from '../../useCore';
import useTokenDecimals from '../../useTokenDecimals';
import { useTransactionAdder } from '../../../state/transactions/hooks';

export default function (
  stakingContract: string, 
  amount: number, 
  depositToken: string
) {
  const core = useCore();
  const addTransaction = useTransactionAdder();
  const tokenDecimals = useTokenDecimals(depositToken);

  const action = useCallback(async (callback: () => void): Promise<void> => {
    const contract = core.contracts[stakingContract];

    const response = await contract.stake(
      BigNumber.from(parseUnits(`${amount}`, tokenDecimals))
    );
  
    addTransaction(response, {
      summary: `Stake ${amount} ${depositToken}`
    });

    if (callback) callback();
  }, [
    core.contracts, 
    stakingContract, 
    tokenDecimals, 
    amount, 
    addTransaction, 
    depositToken
  ]);

  return action;
}
