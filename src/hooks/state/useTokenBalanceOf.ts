import { BigNumber } from 'ethers';
import { useWallet } from 'use-wallet';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../useCore';
import ERC20 from '../../basis-cash/ERC20';
import {useBlockNumber} from '../../state/application/hooks';

const useTokenBalanceOf = (token: ERC20, address: string) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  
  const core = useCore();
  const { account } = useWallet();
  const blockNumber = useBlockNumber();
  
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
    }
  }, [address, blockNumber, account, core.isUnlocked, fetchBalance, token]);

  return balance;
};

export default useTokenBalanceOf;
