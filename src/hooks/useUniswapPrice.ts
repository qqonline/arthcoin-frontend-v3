import { Fetcher, Route, Token } from '@uniswap/sdk';
import { useCallback, useEffect, useState } from 'react';
import useBasisCash from './useBasisCash';

import ERC20 from '../basis-cash/ERC20';
import config from '../config';


const useUniswapPrice = (assetA: ERC20, assetB: ERC20) => {
  const [price, setPrice] = useState<string>('-');
  const basisCash = useBasisCash();

  const fetchCashPrice = useCallback(async () => {
    const assetAT = new Token(config.chainId, assetA.address, 18);
    const assetBT = new Token(config.chainId, assetB.address, 18);

    const pair = await Fetcher.fetchPairData(assetAT, assetBT, basisCash.provider);
    const price = new Route([pair], assetBT);
    setPrice(price.midPrice.toSignificant(3));
  }, [assetA, assetB, basisCash.provider]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch uniswap price: ${err.stack}`));
  }, [fetchCashPrice]);

  return price;
};

export default useUniswapPrice;
