import { useCallback, useEffect, useState } from 'react';
import useCore from './useCore';
import { BigNumber } from 'ethers';

const useARTHMahaPrice = () => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(1).pow(18));
  const core = useCore();

  const fetchCashPrice = useCallback(async () => {
    const { Treasury } = core.contracts;
    setPrice(await Treasury.getArthMahaOraclePrice());
  }, [core]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch ARTHB price: ${err.stack}`));
  }, [setPrice, core, fetchCashPrice]);

  return price;
};

export default useARTHMahaPrice;
