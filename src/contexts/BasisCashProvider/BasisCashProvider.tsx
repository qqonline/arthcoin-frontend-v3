import React, { createContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import BasisCash from '../../basis-cash';
import useConfig from '../../hooks/useConfig';

export interface BasisCashContext {
  core: BasisCash;
}

export const Context = createContext<BasisCashContext>({ core: null });

export const BasisCashProvider: React.FC = ({ children }) => {
  const { ethereum, account } = useWallet();
  const [core, setBasisCash] = useState<BasisCash>();

  const config = useConfig();

  useEffect(() => {
    if (!core && config) {
      const basis = new BasisCash(config);
      if (account) {
        // wallet was unlocked at initialization
        basis.unlockWallet(ethereum, account);
      }
      setBasisCash(basis);
    } else if (account) {
      core.unlockWallet(ethereum, account);
    }
  }, [account, config, core, ethereum]);

  return <Context.Provider value={{ core }}>{children}</Context.Provider>;
};
