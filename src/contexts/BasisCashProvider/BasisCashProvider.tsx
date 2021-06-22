import React, { createContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import BasisCash from '../../basis-cash';
import config from '../../config';

export interface BasisCashContext {
  core: BasisCash;
}

export const Context = createContext<BasisCashContext>({ core: null });

export const BasisCashProvider: React.FC = ({ children }) => {
  const { ethereum, account } = useWallet();
  const [core, setBasisCash] = useState<BasisCash>();

  useEffect(() => {
    const configs = Object.values(config);

    if (!core && !config) {
      // @ts-ignore
      const currentNetworkId = window.ethereum.networkVersion;
      const currentConfig = configs.find((c) => Number(c.chainId) === Number(currentNetworkId));

      console.log(currentConfig, currentNetworkId, configs);

      const basis = new BasisCash(currentConfig);
      if (account) {
        // wallet was unlocked at initialization
        basis.unlockWallet(ethereum, account);
      }
      setBasisCash(basis);
    } else if (account) {
      core.unlockWallet(ethereum, account);
    }
  }, [account, core, ethereum]);

  return <Context.Provider value={{ core }}>{children}</Context.Provider>;
};
