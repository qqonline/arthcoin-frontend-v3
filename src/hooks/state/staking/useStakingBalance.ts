import { useWallet } from 'use-wallet';
import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../../useCore';

export default (stakingContract: string) => {
  const [value, setValue] = useState(BigNumber.from(0));
  const core = useCore();
  const {account} = useWallet();

  const fetchValue = useCallback(async () => {
    if (!account) {
      setValue(BigNumber.from(0));
      return;
    }
    
    const contract = core.contracts[stakingContract]
    setValue(await contract.unlockedBalanceOf(core.myAccount));
  }, [core.contracts, account, core.myAccount, stakingContract]);

  useEffect(() => {
    if (core.isUnlocked) {
      fetchValue().catch((err) => console.error(`Failed to fetch staking balance: ${err}`));
    }
  }, [core.isUnlocked, account, fetchValue]);

  return value;
};
