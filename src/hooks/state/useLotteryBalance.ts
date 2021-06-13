import { BigNumber } from 'ethers';
import { useWallet } from 'use-wallet';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../useCore';
import { useBlockNumber } from '../../state/application/hooks';

const useLotteryBalance = (address: string) => {
  const [balance, setBalance] = useState(BigNumber.from(0));

  const core = useCore();
  const { account } = useWallet();
  const blockNumber = useBlockNumber();
  const lottery = core.contracts['LotteryRaffle'];

  const fetchBalance = useCallback(async () => {
    if (!account) {
      setBalance(BigNumber.from(0))
      return;
    }
 
    const bal = await lottery.balanceOf(core.myAccount);
    setBalance(bal);
  }, [core, account, lottery]);

  useEffect(() => {
    if (core.isUnlocked && address) {
      fetchBalance().catch((err) =>
        console.error(
          `Failed to fetch token balance of ${address} for ${lottery.address}: ${err.stack} `,
        ),
      );
    }
  }, [address, blockNumber, account, core.isUnlocked, fetchBalance, lottery]);

  return balance;
};

export default useLotteryBalance;
