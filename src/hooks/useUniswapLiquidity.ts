import { Fetcher, Token } from '@uniswap/sdk';
import { useCallback, useEffect, useState } from 'react';
import useCore from './useCore';

import ERC20 from '../basis-cash/ERC20';
import { BigNumber } from 'ethers';

const useUniswapLiquidity = (assetA: ERC20, assetB: ERC20) => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(0));
  const core = useCore();

  const fetchCashPrice = useCallback(async () => {
    const tokenA = new Token(core.config.chainId, assetA.address, 18);
    const tokenB = new Token(core.config.chainId, assetB.address, 18);
    const pair = await Fetcher.fetchPairData(tokenA, tokenB, core.provider);

    const a = BigNumber.from(Math.floor(Number(pair.reserve0.toFixed(0)))); // ARTH
    const b = BigNumber.from(Math.floor(Number(pair.reserve1.toFixed(0)))); // DAI

    const decimals = BigNumber.from(10).pow(18);

    setPrice(a.add(b).mul(decimals)); // TODO; need to use price
  }, [core.config.chainId, core.provider, assetB, assetA]);

  useEffect(() => {
    fetchCashPrice().catch((err) =>
      console.error(`Failed to fetch uniswap liquidity: ${err.stack}`),
    );
  }, [fetchCashPrice]);

  return price;
};

export default useUniswapLiquidity;
