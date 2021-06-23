import config from '../config';

const useConfig = () => {
  const configs = Object.values(config);

  // @ts-ignore
  if (window.ethereum) {
    // @ts-ignore
    const currentNetworkId = Number(window.ethereum.networkVersion) || 137;
    const currentConfig = configs.find((c) => Number(c.chainId) === Number(currentNetworkId));

    if (!currentConfig) return config.matic;
    return currentConfig;
  }

  return config.ethereum
};

export default useConfig;
