import { useContext } from 'react';
import { Context } from '../contexts/BasisCashProvider';

const useCore = () => {
  const { core } = useContext(Context);
  return core;
};

export default useCore;
