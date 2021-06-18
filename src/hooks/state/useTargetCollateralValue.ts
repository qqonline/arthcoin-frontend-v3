import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../useCore';
import { useBlockNumber } from '../../state/application/hooks';

type State = {
  isLoading: boolean;
  value: BigNumber;
}

export default () => {
  const [value, setValue] = useState<State>({isLoading: true, value: BigNumber.from(0)});

  const core = useCore();
  const blockNumber = useBlockNumber();

  const fetchValue = useCallback(async () => {
    const controller = core.contracts.ArthController;
    setValue({isLoading: false, value: await controller.getTargetCollateralValue()});
  }, [core.contracts.ArthController]);

  useEffect(() => {
    fetchValue().catch((err) => console.error(`Failed to fetch global CR: ${err.stack}`));
  }, [blockNumber, fetchValue]);

  return value;
};
