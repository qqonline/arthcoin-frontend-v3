import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import ERC20 from '../../basis-cash/ERC20';
import useCore from '../useCore';
import config from '../../config';

const useTokenBalanceOf = (token: ERC20, address: string) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const basisCash = useCore();

  const fetchBalance = useCallback(async () => {
    setBalance(await token.balanceOf(address));
  }, [address, token]);

  useEffect(() => {
    if (basisCash.isUnlocked) {
      fetchBalance().catch((err) =>
        console.error(`Failed to fetch token balance: ${err.stack}`),
      );

      let refreshInterval = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [basisCash.isUnlocked, fetchBalance, token]);

  return balance;
};

export default useTokenBalanceOf;
