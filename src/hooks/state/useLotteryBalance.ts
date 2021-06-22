import { BigNumber } from 'ethers';
import { useWallet } from 'use-wallet';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../useCore';
import { useBlockNumber } from '../../state/application/hooks';

type State = {
  isLoading: boolean;
  balance: BigNumber;
}

const useLotteryBalance = (address: string) => {
  const [customState, setCustomState] = useState<State>({ isLoading: true, balance: BigNumber.from(0) });

  const core = useCore();
  const { account } = useWallet();
  const lottery = core.contracts['LotteryRaffle'];

  const fetchBalance = useCallback(async () => {
    if (!account) {
      setCustomState({ isLoading: false, balance: BigNumber.from(0) })
      return;
    }

    const bal = await lottery.balanceOf(core.myAccount);
    setCustomState({ isLoading: false, balance: bal });
  }, [core, account, lottery]);

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
