import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import ERC20 from '../../basis-cash/ERC20';
import useCore from '../useCore';
import config from '../../config';

const useTokenBalanceOf = (token: ERC20, address: string) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const core = useCore();

  const fetchBalance = useCallback(async () => {
    const bal = await token.balanceOf(address);
    console.log(`balance of ${address} for ${token.address} is ${bal.toString()}`);
    setBalance(bal);
  }, [address, token]);

  useEffect(() => {
    if (core.isUnlocked) {
      fetchBalance().catch((err) =>
        console.error(
          `Failed to fetch token balance of ${address} for ${token.address}: ${err.stack} `,
        ),
      );

      let refreshInterval = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [address, core.isUnlocked, fetchBalance, token]);

  return balance;
};

export default useTokenBalanceOf;
