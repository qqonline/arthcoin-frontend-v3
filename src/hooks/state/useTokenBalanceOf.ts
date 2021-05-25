import { useCallback, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import { BigNumber } from 'ethers';

import ERC20 from '../../basis-cash/ERC20';
import useCore from '../useCore';
import config from '../../config';

const useTokenBalanceOf = (token: ERC20, address: string) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const core = useCore();
  const { account } = useWallet();

  const fetchBalance = useCallback(async () => {
    if (!account) {
      setBalance(BigNumber.from(0))
      return;
    }
    const bal = await token.balanceOf(address);
    setBalance(bal);
  }, [address, account, token]);

  useEffect(() => {
    if (core.isUnlocked && address) {
      fetchBalance().catch((err) =>
        console.error(
          `Failed to fetch token balance of ${address} for ${token.address}: ${err.stack} `,
        ),
      );

      let refreshInterval = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [address, account, core.isUnlocked, fetchBalance, token]);

  return balance;
};

export default useTokenBalanceOf;
