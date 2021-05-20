import { useCallback, useEffect, useState } from 'react';
import useCore from '../useCore';
import { BigNumber } from 'ethers';

export default () => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(1).pow(18));
  const core = useCore();

  const fetchValue = useCallback(async () => {
    setPrice(await core.ARTH.totalSupply());
  }, [core.ARTH]);

  useEffect(() => {
    fetchValue().catch((err) => console.error(`Failed to fetch ARTH supply: ${err.stack}`));
  }, [setPrice, core, fetchValue]);

  return price;
};
