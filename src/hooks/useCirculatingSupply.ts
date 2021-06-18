import { BigNumber } from 'ethers';
import { useEffect, useState, useCallback } from 'react';

import useTotalSupply from './useTotalSupply';
import useUniswapLiquidity from './useUniswapLiquidity';

type State = {
  isLoading: boolean;
  value: BigNumber;
}

const useCirculatingSupply = (asset: string) => {
  const [circulatingSupply, setCirculatingSupply] = useState<State>({isLoading: true, value: BigNumber.from(0)});
  
  const totalSupply = useTotalSupply(asset);
  const uniswapLiquidity = useUniswapLiquidity(asset);

  const fetchCashPrice = useCallback(async () => {
    setCirculatingSupply({
      isLoading: false,
      value: totalSupply.sub(uniswapLiquidity)
    });
  }, [uniswapLiquidity, totalSupply]);

  useEffect(() => {
    fetchCashPrice().catch((err) =>
      console.error(`Failed to fetch uniswap liquidity: ${err.stack}`),
    );
  }, [fetchCashPrice]);

  return circulatingSupply;
};

export default useCirculatingSupply;
