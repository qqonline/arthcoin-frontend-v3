import { useCallback, useEffect, useState } from 'react';
import useVFat from './useVFat';
import { ContractName } from '../basis-cash';
import { IVFatAPY } from '../vfat/core';
// import config from '../config';

const usePoolAPY = (poolName: ContractName[]) => {
  const [apy, setAPY] = useState<IVFatAPY[]>([]);
  const vfat = useVFat();

  const fetchAPY = useCallback(async () => {
    const data = await Promise.all(poolName.map(p => vfat.getAPYFromPool(p)))
    setAPY(data);
  }, [vfat, poolName]);

  useEffect(() => {
    if (vfat && poolName) {
      fetchAPY().catch((err) => console.error(err.stack));
      // const refreshBalance = setInterval(fetchAPY, config.refreshInterval);
      // return () => clearInterval(refreshBalance);
    }
  }, [poolName, vfat, fetchAPY]);

  return apy;
};

export default usePoolAPY;
