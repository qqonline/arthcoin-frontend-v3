import { useCallback, useEffect, useState } from 'react';
import useBasisCash from './useBasisCash';
import { BigNumber } from 'ethers';

const useStabilityFee = () => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(1));
  const basisCash = useBasisCash();

  const fetchCashPrice = useCallback(async () => {
    setPrice(await basisCash.getStabilityFees());
  }, [basisCash]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch stability fees: ${err.stack}`));
  }, [fetchCashPrice]);

  return price;
};

export default useStabilityFee;
