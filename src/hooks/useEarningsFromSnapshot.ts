import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useBasisCash from './useBasisCash';
import config from '../config';
import { VaultInfo } from '../basis-cash/types';

type Return = [BigNumber, () => Promise<void>, () => Promise<void>]
const useEarningsFromSnapshot = (vault: VaultInfo): Return => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const basisCash = useBasisCash();

  const fetchBalance = useCallback(async () => {
    setBalance(await vault.arthSnapshotBoardroom.earned(basisCash.myAccount));
  }, [basisCash.myAccount, vault.arthSnapshotBoardroom]);

  const claimRewards = useCallback(async () => {
    await vault.contract.claimReward()
  }, [vault.contract])


  const reinvestRewards = useCallback(async () => {
    await vault.arthSnapshotBoardroom.claimReward(vault.reinvestVault)
  }, [vault.arthSnapshotBoardroom, vault.reinvestVault])

  useEffect(() => {
    if (basisCash.isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));
      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [setBalance, basisCash.isUnlocked, fetchBalance]);

  return [balance, claimRewards, reinvestRewards];
};

export default useEarningsFromSnapshot;
