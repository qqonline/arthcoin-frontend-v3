import { useCallback, useEffect, useState } from 'react';
import useBasisCash from './useBasisCash';
import { BigNumber } from 'ethers';

const useStabilityFees = () => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(0));
  const basisCash = useBasisCash();

  const fetchCashPrice = useCallback(async () => {
    setPrice(await basisCash.getStabilityFees());
  }, [basisCash]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch stability fees: ${err.stack}`));
  }, [setPrice, basisCash, fetchCashPrice]);

  return price;
};

export default useStabilityFees;
