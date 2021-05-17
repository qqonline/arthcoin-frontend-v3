import { useCallback, useEffect, useState } from 'react';
import useCore from './useCore';
import { BigNumber } from 'ethers';

export default () => {
  const pow = BigNumber.from(10).pow(18)
  const [value, setValue] = useState({ maha: BigNumber.from(0), arthx: BigNumber.from(0) });
  const core = useCore();

  const fetchCashPrice = useCallback(async () => {
    const { PoolToken } = core.contracts;

    const tokenARTHXBalance = await core.ARTHX.balanceOf(PoolToken.address)
    const tokenMAHABalance = await core.MAHA.balanceOf(PoolToken.address)
    const tokenRTSupply = await core.PoolToken.totalSupply()

    const rateMaha = tokenMAHABalance.mul(pow).div(tokenRTSupply);
    const rateARTHX = tokenARTHXBalance.mul(pow).div(tokenRTSupply);

    const rates = { maha: rateMaha, arthx: rateARTHX }
    setValue(rates);
  }, [core.ARTHX, core.MAHA, core.PoolToken, core.contracts, pow]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch PoolToken price: ${err.stack}`));
  }, [setValue, core, fetchCashPrice]);

  return value
};
