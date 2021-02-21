import { BigNumber, Contract } from 'ethers';
import { Signer } from '@ethersproject/abstract-signer';
import { Provider } from '@ethersproject/abstract-provider';
import ERC20 from './ERC20';
import ABI from './deployments/abi/IUniswapV2Pair.json'

class UniswapPair extends ERC20 {
  constructor(address: string, provider: Signer | Provider, symbol: string) {
    super(address, provider, symbol, 18)
    this.contract = new Contract(address, ABI, provider);
  }

  token0(): Promise<string> {
    return this.contract.token0();
  }

  token1(): Promise<string> {
    return this.contract.token1();
  }

  reserves(): Promise<[BigNumber,BigNumber]> {
    return this.contract.getReserves();
  }


  price0CumulativeLast(): Promise<BigNumber> {
    return this.contract.price0CumulativeLast();
  }

  price1CumulativeLast(): Promise<BigNumber> {
    return this.contract.price1CumulativeLast();
  }
}

export default UniswapPair;
