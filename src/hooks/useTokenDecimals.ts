import { useCallback, useEffect, useState } from 'react';

import useCore from './useCore';

const useTokenDecimals = (token: string) => {
  const core = useCore();
  const [decimals, setDecimals] = useState(core.tokens[token].decimal);
  
  const fetchdecimals = useCallback(async () => {
    setDecimals(core.tokens[token].decimal);
  }, [token, core.tokens]);

  useEffect(() => {
    if (core.isUnlocked) {
      fetchdecimals().catch((err) =>
        console.error(
          `Failed to fetch token decimals for ${token}: ${err.stack} `,
        ),
      );
    }
  }, [core.isUnlocked, fetchdecimals, token]);

  return decimals;
};

export default useTokenDecimals;
