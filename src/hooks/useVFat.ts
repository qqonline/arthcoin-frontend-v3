import { useContext } from 'react';
import { Context } from '../contexts/VFat';

const useVFat = () => {
  const { vfat } = useContext(Context);
  return vfat
};

export default useVFat;
