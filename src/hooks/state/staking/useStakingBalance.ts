import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';

import config from '../../../config'
import useCore from '../../useCore';

export default (stakingContract: string) => {
  const [value, setValue] = useState(BigNumber.from(0));
  const core = useCore();

  const fetchValue = useCallback(async () => {
    const contract = core.contracts[stakingContract]
    setValue(await contract.unlockedBalanceOf(core.myAccount));
  }, [core.contracts, core.myAccount, stakingContract]);

  useEffect(() => {
    fetchValue().catch((err) => console.error(`Failed to fetch staking balance: ${err}`));

    const interval = setInterval(() => (
      fetchValue().catch((err) => console.error(`Failed to fetch staking balance: ${err}`))
    ), config.refreshInterval);

    return () => clearInterval(interval);
  }, [fetchValue]);

  return value;
};
