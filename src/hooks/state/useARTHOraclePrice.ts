import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';
import useCore from '../useCore';

export default () => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(0));
  const core = useCore();

  const fetchCashPrice = useCallback(async () => {
    const controller = core.contracts.ArthController;
    setPrice(await controller.getARTHPrice());
  }, [core.contracts.ArthController]);

  useEffect(() => {
    fetchCashPrice().catch((err) =>
      console.error(`Failed to fetch uniswap price: ${err.stack}`),
    );
  }, [fetchCashPrice]);

  return price;
};
