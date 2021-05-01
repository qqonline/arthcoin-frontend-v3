import { BigNumber } from 'ethers';
import { useCallback } from 'react';
import { useTransactionAdder } from '../../../state/transactions/hooks';
import useCore from '../../useCore';


export default function (stakingContract: string, amount: number, depositToken: string) {
  const addTransaction = useTransactionAdder();
  const core = useCore();

  const action = useCallback(async (): Promise<void> => {
    const contract = core.contracts[stakingContract]

    const decmals = BigNumber.from(10).pow(15)

    console.log(contract.address, BigNumber.from(Math.floor(amount * 1000)).mul(decmals).toString())
    console.log(await contract.stakingToken())
    const response = await contract.withdraw(BigNumber.from(Math.floor(amount * 1000)).mul(decmals))
    addTransaction(response, {
      summary: `Wtihdraw ${amount} ${depositToken}`
    });

  }, [core.contracts, stakingContract, amount, addTransaction, depositToken]);

  return action;
}
