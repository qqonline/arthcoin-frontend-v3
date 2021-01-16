import { Fetcher, Token } from '@uniswap/sdk';
import { useCallback, useEffect, useState } from 'react';
import useBasisCash from './useBasisCash';

import ERC20 from '../basis-cash/ERC20';
import config from '../config';


const useUniswapLiquidity = (assetA: ERC20, assetB: ERC20) => {
  const [price, setPrice] = useState<string>('-');
  const basisCash = useBasisCash();

  const assetAT = new Token(config.chainId, assetA.address, 18);
  const assetBT = new Token(config.chainId, assetB.address, 18);


  const fetchCashPrice = useCallback(async () => {
    const pair = await Fetcher.fetchPairData(assetAT, assetBT, basisCash.provider);

    const a = Number(pair.reserve0.toFixed(2))
    const b = Number(pair.reserve1.toFixed(2))

    setPrice(String(a + b)) // TODO; need to use price
  }, [assetAT, assetBT, basisCash.provider]);

  useEffect(() => {
    // fetchCashPrice().catch((err) => console.error(`Failed to fetch uniswap liquidity: ${err.stack}`));
  }, [setPrice, basisCash, fetchCashPrice]);

  return price;
};

export default useUniswapLiquidity;
