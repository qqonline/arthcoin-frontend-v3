import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import StakingCard from './StakingCard';
import BankPage from '../Bank';
import BankCards from './BankCards';
import { Bank } from '../../basis-cash';
import useBanks from '../../hooks/useBanks';
import RSRIcon from '../../assets/img/RSR.webp';
import COMPIcon from '../../assets/img/Staking/COMP.webp';
import DOTIcon from '../../assets/img/Staking/DOT.webp';
import CURVEIcon from '../../assets/img/Staking/CURVE.webp';
import ESDIcon from '../../assets/img/Staking/ESD.webp';
import FRAIcon from '../../assets/img/Staking/FRAX SHARE.webp';
import MaticIcon from '../../assets/img/Staking/Matic.webp';
import SUSHIIcon from '../../assets/img/Staking/SUSHI.webp';
import YFIIcon from '../../assets/img/Staking/YFI.webp';


const BankCardsV2: React.FC = () => {
  const { path } = useRouteMatch();
  const [banks] = useBanks();
  const activeBanks = banks.filter((bank) => !bank.finished);
  const inactiveBanks = banks.filter((bank) => bank.finished);

  return (
    <Grid container spacing={5} justify="center" alignItems="stretch">
      {activeBanks.map((item) => (
          <Grid container item xs={12} md={6} lg={4} xl={4}>
            <StakingCard bank={item} />
          </Grid>
        ))}
    </Grid>
  );
};

export default BankCardsV2;
