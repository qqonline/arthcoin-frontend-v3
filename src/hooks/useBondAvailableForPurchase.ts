import { useCallback, useEffect, useState } from 'react';
import useBasisCash from './useBasisCash';
import { BigNumber } from 'ethers';

const useBondAvailableForPurchase = () => {
  const [limit, setLimit] = useState<BigNumber>(BigNumber.from(0));
  const basisCash = useBasisCash();

  const fetchCashPrice = useCallback(async () => {
    const t = await basisCash.getTreasury()

    const cashToBondConversionLimit = await t.cashToBondConversionLimit()
    const accumulatedBonds = await t.accumulatedBonds()

    // setLimit(BigNumber.from(10).pow(18).mul(200000)
    if (accumulatedBonds.gte(cashToBondConversionLimit)) setLimit(BigNumber.from(0))
    else setLimit(cashToBondConversionLimit.sub(accumulatedBonds).mul(120).div(100))
  }, [basisCash]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch stability fees: ${err.stack}`));
  }, [fetchCashPrice]);

  return limit;
};

export default useBondAvailableForPurchase;
