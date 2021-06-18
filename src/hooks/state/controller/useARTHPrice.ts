import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../../useCore';

type State = {
  isLoading: boolean;
  value: BigNumber;
}

export default () => {
  const [customState, setCustomState] = useState<State>({ isLoading: true, value: BigNumber.from(0)});
  const core = useCore();

  const fetchCashPrice = useCallback(async () => {
    const controller = core.contracts.ArthController;
    setCustomState({
      isLoading: false,
      value: await controller.getARTHPrice()
    });
  }, [core.contracts.ArthController]);

  useEffect(() => {
    fetchCashPrice().catch((err) =>
      console.error(`Failed to fetch uniswap price: ${err.stack}`),
    );
  }, [fetchCashPrice]);

  return customState;
};
