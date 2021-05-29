import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../../useCore';
import {useBlockNumber} from '../../../state/application/hooks';

export default () => {
  const [value, setValue] = useState<BigNumber>(BigNumber.from(0));
  
  const core = useCore();
  const blockNumber = useBlockNumber();

  const fetchCashPrice = useCallback(async () => {
    const controller = core.contracts.ArthController;
    setValue(await controller.getPercentCollateralized());
  }, [core.contracts.ArthController]);

  useEffect(() => {
    fetchCashPrice().catch((err) =>
      console.error(`Failed to fetch uniswap price: ${err.stack}`),
    );
  }, [blockNumber, fetchCashPrice]);

  return value;
};
