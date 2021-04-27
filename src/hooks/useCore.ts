import { useContext } from 'react';
import { Context } from '../contexts/BasisCashProvider';

const useCore = () => {
  const { basisCash } = useContext(Context);
  return basisCash;
};

export default useCore;
