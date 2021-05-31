import { useWallet } from 'use-wallet';
import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../../useCore';
import { useBlockNumber } from '../../../state/application/hooks';

export default (stakingContract: string) => {
  const [value, setValue] = useState(BigNumber.from(0));
  const [initialValue, setInitialValue] = useState(BigNumber.from(0));
  
  const core = useCore();
  const {account} = useWallet();
  const blockNumber = useBlockNumber();

  const fetchValue = useCallback(async () => {
    if (!account) {
      setValue(BigNumber.from(0));
      return;
    }

    const contract = core.contracts[stakingContract];
    if (initialValue.eq(0)) setInitialValue(await contract.earned(core.myAccount));
    else setValue(await contract.earned(core.myAccount));
  }, [core.contracts, initialValue, account, core.myAccount, stakingContract]);

  useEffect(() => {
    if (core.isUnlocked) {
      fetchValue().catch((err) =>
        console.error(`Failed to fetch staking balance: ${err}`),
      );
    }
  }, [core.isUnlocked, account, blockNumber, fetchValue]);

  return [initialValue, value];
};
