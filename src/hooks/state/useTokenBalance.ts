import ERC20 from '../../basis-cash/ERC20';
import useCore from '../useCore';
import useTokenBalanceOf from './useTokenBalanceOf';

const useTokenBalance = (token: ERC20) => {
  const core = useCore();
  return useTokenBalanceOf(token, core.myAccount);
};

export default useTokenBalance;
