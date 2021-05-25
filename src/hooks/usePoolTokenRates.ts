import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import {useWallet} from 'use-wallet';

import config from '../config';
import useCore from './useCore';

export default () => {
  const core = useCore();
  const [value, setValue] = useState({ maha: BigNumber.from(0), arthx: BigNumber.from(0) });
  const {account} = useWallet();

  const pow = BigNumber.from(10).pow(18)

  const fetchCashPrice = useCallback(async () => {
    if (!account) {
      setValue({
        maha: BigNumber.from(0), 
        arthx: BigNumber.from(0)
      });
      return;
    }
    const { PoolToken } = core.contracts;

    const tokenARTHXBalance = await core.ARTHX.balanceOf(PoolToken.address)
    const tokenMAHABalance = await core.MAHA.balanceOf(PoolToken.address)
    const tokenRTSupply = await core.PoolToken.totalSupply()

    const rateMaha = tokenMAHABalance.mul(pow).div(tokenRTSupply);
    const rateARTHX = tokenARTHXBalance.mul(pow).div(tokenRTSupply);
    const rates = { maha: rateMaha, arthx: rateARTHX }

    setValue(rates);
  }, [core.ARTHX, core.MAHA, account, core.PoolToken, core.contracts, pow]);

  useEffect(() => {
    if (core.isUnlocked) {
      fetchCashPrice().catch((err) => console.error(`Failed to fetch PoolToken price: ${err.stack}`));

      const interval = setInterval(() => (
        fetchCashPrice().catch((err) => console.error(`Failed to fetch PoolToken price: ${err.stack}`))
      ), config.refreshInterval);

      return () => clearInterval(interval);
    }
  }, [setValue, core, account, fetchCashPrice]);

  return value
};
