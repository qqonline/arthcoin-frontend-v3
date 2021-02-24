import { useCallback, useEffect, useState } from 'react';
import useBasisCash from './useBasisCash';
 import { BigNumber } from 'ethers';

const useCashPriceInEstimatedTWAP = () => {
  const [stat, price] = useState<BigNumber>();
  const basisCash = useBasisCash();

  const fetchCashPrice = useCallback(async () => {
    price(await basisCash.getCashPriceInEstimatedTWAP());
  }, [basisCash]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch estimated 12hr twao ARTH price: ${err.stack}`));
  }, [price, basisCash, fetchCashPrice]);

  return stat;
};

export default useCashPriceInEstimatedTWAP;
