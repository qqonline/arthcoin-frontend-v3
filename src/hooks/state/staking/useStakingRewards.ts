import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';
import {useWallet} from 'use-wallet';

import config from '../../../config'
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
    setValue(await contract.earned(core.myAccount));
  }, [core.contracts, account, core.myAccount, stakingContract]);

  useEffect(() => {
    if (core.isUnlocked) {
      fetchValue().catch((err) =>
        console.error(`Failed to fetch staking balance: ${err}`),
      );

      const interval = setInterval(() => (
        fetchValue().catch((err) => console.error(`Failed to fetch staking balance: ${err}`))
      ), config.refreshInterval);

      return () => clearInterval(interval);
    }
  }, [core.isUnlocked, account, fetchValue]);

  return value;
};
