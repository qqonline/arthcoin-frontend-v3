import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useBasisCash from './useBasisCash';
import config from '../config';
import { Vaults } from '../basis-cash/config';

const useStakedBalanceOnVault = (kind: Vaults) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const basisCash = useBasisCash();

  const fetchBalance = useCallback(async () => {
    const vault = await basisCash.getBoardroomVault(kind)
    setBalance(await vault.contract.balanceWithoutBonded(basisCash.myAccount));
  }, [basisCash, kind]);

  useEffect(() => {
    if (basisCash.isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));
      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [setBalance, basisCash.isUnlocked, fetchBalance]);

  return balance;
};

export default useStakedBalanceOnVault;
