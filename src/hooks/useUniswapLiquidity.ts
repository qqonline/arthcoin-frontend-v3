import { Fetcher, Token } from '@uniswap/sdk';
import { useCallback, useEffect, useState } from 'react';
import useBasisCash from './useBasisCash';

import ERC20 from '../basis-cash/ERC20';
import config from '../config';
import { BigNumber } from 'ethers';


const useUniswapLiquidity = (assetA: ERC20, assetB: ERC20) => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(0));
  const basisCash = useBasisCash();

  const assetAT = new Token(config.chainId, assetA.address, 18);
  const assetBT = new Token(config.chainId, assetB.address, 18);


  const fetchCashPrice = useCallback(async () => {
    const pair = await Fetcher.fetchPairData(assetAT, assetBT, basisCash.provider);

    const a = BigNumber.from(Math.floor(Number(pair.reserve0.toFixed(0))))// ARTH
    const b = BigNumber.from(Math.floor(Number(pair.reserve1.toFixed(0)))) // DAI

    const decimals = BigNumber.from(10).pow(18)

    setPrice(a.add(b).mul(decimals)) // TODO; need to use price
  }, [assetAT, assetBT, basisCash.provider]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch uniswap liquidity: ${err.stack}`));
  }, [setPrice, basisCash, fetchCashPrice]);

  return price;
};

export default useUniswapLiquidity;
