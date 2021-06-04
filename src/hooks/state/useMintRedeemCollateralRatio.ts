import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';
import useCore from '../useCore';

export default () => {
  const [value, setValue] = useState<BigNumber>(BigNumber.from(1000000));
  const core = useCore();

  const fetchValue = useCallback(async () => {
    const controller = core.contracts.ArthController;
    setValue(await controller.getGlobalCRForMintRedeem());
  }, [core.contracts.ArthController]);

  useEffect(() => {
    fetchValue().catch((err) => console.error(`Failed to fetch mint CR: ${err.stack}`));
  }, [fetchValue]);

  return value;
};
