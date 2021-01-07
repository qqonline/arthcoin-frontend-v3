import { Fetcher, Route, Token } from '@uniswap/sdk';
import { useCallback, useEffect, useState } from 'react';
import useBasisCash from './useBasisCash';

import ERC20 from '../basis-cash/ERC20';
import config from '../config';


const useUniswapPrice = (assetA: ERC20, assetB: ERC20) => {
  const [price, setPrice] = useState<string>('-');
  const basisCash = useBasisCash();

  const assetAT = new Token(config.chainId, assetA.address, 18);
  const assetBT = new Token(config.chainId, assetB.address, 18);


  const fetchCashPrice = useCallback(async () => {
    const pair = await Fetcher.fetchPairData(assetAT, assetBT, basisCash.provider);
    const price = new Route([pair], assetBT);
    setPrice(price.midPrice.toSignificant(3));
  }, [assetAT, assetBT, basisCash.provider]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch uniswap price price: ${err.stack}`));
  }, [setPrice, basisCash, fetchCashPrice]);

  return price;
};

export default useUniswapPrice;
