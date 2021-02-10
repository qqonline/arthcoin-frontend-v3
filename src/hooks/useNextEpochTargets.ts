import { useCallback, useEffect, useState } from 'react';
import useBasisCash from './useBasisCash';
import { BigNumber } from 'ethers';


const useNextEpochTargets = (currentPrice: BigNumber) => {
  const [supplyIncrease, setSupplyIncrease] = useState<BigNumber>(BigNumber.from(0));
  const [debtIncrease, setDebtIncrease] = useState<BigNumber>(BigNumber.from(0));
  const [isLoading, setLoading] = useState(true);
  const basisCash = useBasisCash();

  const fetchCashPrice = useCallback(async (price: BigNumber) => {
    const { Treasury } = basisCash.contracts;
    const _supplyIncrease = await Treasury.estimateSeignorageToMint(price);
    const _debtIncrease = await Treasury.estimateBondsToIssue(price);

    setSupplyIncrease(_supplyIncrease)
    setDebtIncrease(_debtIncrease)
    setLoading(false)
  }, [basisCash]);

  useEffect(() => {
    if (currentPrice.eq(0)) return
    fetchCashPrice(currentPrice).catch((err) => console.error(`Failed to fetch uniswap liquidity: ${err.stack}`));
  }, [fetchCashPrice, currentPrice]);

  return { supplyIncrease, debtIncrease, isLoading };
};

export default useNextEpochTargets;
