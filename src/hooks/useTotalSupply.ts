import { BigNumber } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

import useCore from './useCore';
import { useBlockNumber } from '../state/application/hooks';

export default (tokenSymbol: string) => {
  const [totalSupply, setTotalSupply] = useState<BigNumber>(BigNumber.from(0));

  const core = useCore();
  const blockNumber = useBlockNumber();

  const fetchValue = useCallback(async () => {
    setTotalSupply(await core.tokens[tokenSymbol].totalSupply());
  }, [core.tokens, tokenSymbol]);

  useEffect(() => {
    fetchValue().catch((err) => console.error(`Failed to fetch ARTH supply: ${err.stack}`));
  }, [blockNumber, totalSupply, core, fetchValue]);

  return totalSupply;
};
