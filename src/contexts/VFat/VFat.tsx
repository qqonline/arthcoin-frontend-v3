import React, { useCallback, useEffect, useState } from 'react';
import Context from './context';
import * as vfatCore from '../../vfat/core';

const VFat: React.FC = ({ children }) => {
  const [vfat, setVfat] = useState<vfatCore.IVFatApp>(null);

  const fetchPools = useCallback(async () => {
    const vfatApp = await vfatCore.init();
    setVfat(vfatApp);
  }, []);

  useEffect(() => {
    fetchPools().catch((err) => console.error(`Failed to fetch pools: ${err.stack}`));
  }, [fetchPools]);

  return <Context.Provider value={{ vfat }}>{children}</Context.Provider>;
};

export default VFat;
