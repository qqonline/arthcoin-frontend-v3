import { BigNumber } from 'ethers';
import { useWallet } from 'use-wallet';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../useCore';
import useTokenCounter from './useTokenCounter';

type State = {
  isLoading: boolean;
  balance: BigNumber;
}

const useLotteryBalance = (address: string) => {
  const [customState, setCustomState] = useState<State>({ isLoading: true, balance: BigNumber.from(0) });

  const core = useCore();
  const { account } = useWallet();
  const { isLoading: isTokenCounterLoading, value: tokenCounter } = useTokenCounter();
  
  const lottery = core.contracts['LotteryRaffle'];

  const fetchBalance = useCallback(async () => {
    if (isTokenCounterLoading) {
      setCustomState({ isLoading: true, balance: BigNumber.from(0) })
      return;
    }

    if (!account) {
      setCustomState({ isLoading: false, balance: BigNumber.from(0) })
      return;
    }

    let totalTickets = BigNumber.from(0);
    for (let i = 1; i <= Number(`${tokenCounter.toString()}`); i++) {
      const ticket = await lottery.lotteries(i);
      if (account === ticket?.owner) totalTickets = totalTickets.add(ticket?.weight || 0);
    }

    setCustomState({ isLoading: false, balance: totalTickets });
  }, [account, isTokenCounterLoading, lottery, tokenCounter]);

  useEffect(() => {
    if (core.isUnlocked && address) {
      fetchBalance().catch((err) =>
        console.error(
          `Failed to fetch token balance of ${address} for ${lottery.address}: ${err.stack} `,
        ),
      );
    }
  }, [address, account, core.isUnlocked, fetchBalance, lottery]);

  return customState;
};

export default useLotteryBalance;
