import { BigNumber } from 'ethers';
import { useEffect, useState, useCallback } from 'react';

import useCore from './useCore';

type State = {
  isLoading: boolean;
  value: BigNumber;
}

const useUniswapLiquidity = (asset: string) => {
  const [liquidity, setLiquidity] = useState<State>({isLoading: true, value: BigNumber.from(0)});

  const core = useCore();
  const token = core.tokens[asset];
  const tradingPairs = core.tradingPairs[asset];

  const fetchCashPrice = useCallback(async () => {
    const pairBalances = await Promise.all(tradingPairs.map(pair => token.balanceOf(pair.address)));
    const totalBalance = pairBalances.reduce((a, b) => a.add(b), BigNumber.from(0));

    setLiquidity({isLoading: false, value: totalBalance});
  }, [token, tradingPairs]);

  useEffect(() => {
    fetchCashPrice().catch((err) =>
      console.error(`Failed to fetch uniswap liquidity: ${err.stack}`),
    );
  }, [fetchCashPrice]);

  return liquidity;
};

export default useUniswapLiquidity;
