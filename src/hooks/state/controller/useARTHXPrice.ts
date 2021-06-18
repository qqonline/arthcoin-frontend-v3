import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../../useCore';
import { useBlockNumber } from '../../../state/application/hooks';

type State = {
  isLoading: boolean;
  value: BigNumber;
}

export default () => {
  const [customState, setCustomState] = useState<State>({ isLoading: true, value: BigNumber.from(0) });
  
  const core = useCore();
  const blockNumber = useBlockNumber();

  const fetchCashPrice = useCallback(async () => {
    const controller = core.contracts.ArthController;
    console.log(await controller.getARTHXPrice())
    setCustomState({
      isLoading: false,
      value: await controller.getARTHXPrice()
    });
  }, [core.contracts.ArthController]);

  useEffect(() => {
    fetchCashPrice().catch((err) =>
      console.error(`Failed to fetch uniswap price: ${err.stack}`),
    );
  }, [blockNumber, fetchCashPrice]);

  return customState;
};
