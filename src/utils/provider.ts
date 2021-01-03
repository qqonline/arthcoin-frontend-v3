import { ethers } from 'ethers';
import config from '../config';
import { web3ProviderFrom } from '../basis-cash/ether-utils';

export function getDefaultProvider(): ethers.providers.JsonRpcProvider {
  return new ethers.providers.JsonRpcProvider(config.defaultProvider
  )
}



export function getGanacheProvider(): ethers.providers.JsonRpcProvider {
  return new ethers.providers.JsonRpcProvider(
    web3ProviderFrom(config.defaultProvider),
    config.chainId,
  )
}
