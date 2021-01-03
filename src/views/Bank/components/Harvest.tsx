import React from 'react';
import useEarnings from '../../../hooks/useEarnings';
import useHarvest from '../../../hooks/useHarvest';
import { getDisplayBalance } from '../../../utils/formatBalance';

import { Bank } from '../../../basis-cash';
import Template from './Template';

interface HarvestProps {
  bank: Bank;
}

const Harvest: React.FC<HarvestProps> = ({ bank }) => {
  const earnings = useEarnings(bank.contract);
  const { onReward } = useHarvest(bank);

  const tokenName = bank.earnTokenName === 'MAHA' ? 'MAHA' : 'ARTH';
  return (
    <Template
      title={`${tokenName} Earned`}
      buttonLabel="Settle"
      buttonDisabled={earnings.eq(0)}
      buttonOnClick={onReward}
      amount={getDisplayBalance(earnings)}
      symbol={bank.earnToken.symbol}
    />
  );
};

export default Harvest;
