import config from '../config';

const useConfig = () => {
  const configs = Object.values(config);

  // @ts-ignore
  const currentNetworkId = Number(window.ethereum.networkVersion) || 1;
  const currentConfig = configs.find((c) => Number(c.chainId) === Number(currentNetworkId));

  if (!currentConfig) return config.ethereum;
  return currentConfig;
};

export default useConfig;
