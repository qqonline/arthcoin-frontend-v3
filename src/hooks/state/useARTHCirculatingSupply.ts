import { BigNumber } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../useCore';
import { useBlockNumber } from '../../state/application/hooks';

export default () => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(1).pow(18));
  
  const core = useCore();
  const blockNumber = useBlockNumber();

  const fetchValue = useCallback(async () => {
    setPrice(await core.ARTH.totalSupply());
  }, [core.ARTH]);

  useEffect(() => {
    fetchValue().catch((err) => console.error(`Failed to fetch ARTH supply: ${err.stack}`));
  }, [blockNumber, setPrice, core, fetchValue]);

  return price;
};
