import config from '../config';

const useConfig = () => {
  const configs = Object.values(config);

  // @ts-ignore
  const currentNetworkId = Number(window.ethereum.networkVersion) || 137;
  const currentConfig = configs.find((c) => Number(c.chainId) === Number(currentNetworkId));


  return config.matic
  // if (!currentConfig) return config.matic;
  // return currentConfig
};

export default useConfig
