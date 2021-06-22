import { useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import { Configuration } from '../basis-cash/config';
import config from '../config';

const useConfig = () => {
  const { ethereum, account } = useWallet();
  const [finalConfig, setConfig] = useState<Configuration>();

  useEffect(() => {
    const configs = Object.values(config);

    // @ts-ignore
    const currentNetworkId = window.ethereum.networkVersion;
    const currentConfig = configs.find((c) => Number(c.chainId) === Number(currentNetworkId));
    setConfig(currentConfig);
  }, [account, ethereum]);

  return finalConfig
};

export default useConfig
