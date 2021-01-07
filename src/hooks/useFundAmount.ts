import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useBasisCash from './useBasisCash';

const useFundAmount = (kind: 'development' | 'cdp' | 'ecosystem' | 'bonds') => {
  const [amount, setAmount] = useState(BigNumber.from(0));
  const basisCash = useBasisCash();


  useEffect(() => {
    if (basisCash) {
      const { Treasury, DevelopmentFund, BurnbackFund } = basisCash.contracts;


      if (kind === 'cdp') basisCash.ARTH.balanceOf(BurnbackFund.address).then(setAmount);
      else if (kind === 'bonds') basisCash.ARTH.balanceOf(Treasury.address).then(setAmount);
      else if (kind === 'ecosystem') basisCash.ARTH.balanceOf(DevelopmentFund.address).then(setAmount);
      else if (kind === 'development') basisCash.ARTH.balanceOf(DevelopmentFund.address).then(setAmount);
    }
  }, [basisCash, kind]);
  return amount;
};

export default useFundAmount;
