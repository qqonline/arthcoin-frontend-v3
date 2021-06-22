import config from '../config';

const useConfig = () => {
  const configs = Object.values(config);

  // @ts-ignore
  const currentNetworkId = window.ethereum.networkVersion;
  const currentConfig = configs.find((c) => Number(c.chainId) === Number(currentNetworkId));

  if (!currentConfig) return config.matic;

  return currentConfig
};

export default useConfig
