import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useBasisCash from './useBasisCash';

const useTreasuryAmount = () => {
  const [amount, setAmount] = useState(BigNumber.from(0));
  const basisCash = useBasisCash();

  const fetchBalance = useCallback(async () => {
    const { Treasury } = basisCash.contracts;
    basisCash.ARTH.balanceOf(Treasury.address).then(setAmount);
  }, [basisCash]);


  useEffect(() => {
    fetchBalance()
  }, [basisCash, fetchBalance]);

  return amount;
};

export default useTreasuryAmount;
