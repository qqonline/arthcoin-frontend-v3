import { useCallback, useEffect, useState } from 'react';
import useBasisCash from './useBasisCash';
import { BigNumber } from 'ethers';

const useCashAvailableToConvert = () => {
  const [limit, setLimit] = useState<BigNumber>(BigNumber.from(0));
  const basisCash = useBasisCash();

  const fetchCashPrice = useCallback(async () => {
    const t = await basisCash.getTreasury()

    const cashToBondConversionLimit = await t.cashToBondConversionLimit()
    const accumulatedBonds = await t.accumulatedBonds()

    if (accumulatedBonds.gte(cashToBondConversionLimit)) setLimit(BigNumber.from(0))
    else setLimit(cashToBondConversionLimit.sub(accumulatedBonds))
  }, [basisCash]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch cashToBondConversionLimit: ${err.stack}`));
  }, [fetchCashPrice]);

  return limit;
};

export default useCashAvailableToConvert;
