import { useCallback, useEffect, useState } from 'react';
import { Configuration } from '../basis-cash/config';
import config from '../config';

const useConfig = () => {
  const configs = Object.values(config);

  // @ts-ignore
  const ethereum = window.ethereum || {}

  const getChain = useCallback(() => {
    const currentNetworkId = Number(ethereum.networkVersion) || 137;
    const currentConfig = configs.find((c) => Number(c.chainId) === Number(currentNetworkId));
    if (!currentConfig) return config.matic;
    return currentConfig;
  }, [configs, ethereum.networkVersion])

  const [finalConfig, setConfig] = useState<Configuration>(getChain())

  useEffect(() => {
    setConfig(getChain());
  }, [configs, ethereum.networkVersion, getChain])


  return finalConfig
};

export default useConfig;
