import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';

import useCore from '../useCore';

export default () => {
  const [value, setValue] = useState<BigNumber>(BigNumber.from(4));


  return value;
};
