import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Container from '../../components/Container';
import StakingCard from './StakingCard';
import Bank from '../Bank';
import BankCards from './BankCards';
import StakingIcon from './staking.png';
import coinBaseIcon from '../../assets/img/coinBase.png';
import LaunchCountdown from '../../components/LaunchCountdown';
const stakeCardData = [
  {
    title: 'Earn ARTH',
    logo: coinBaseIcon,
    subtitle: 'by staking MAHA- DAI-LPv2',
    description: '23,000 MAHA deposited',
    appyPercentage: '40',
    buttonText: 'Stake Now',
  },
  {
    title: 'Earn ARTH',
    subtitle: 'by staking MAHA- DAI-LPv2',
    logo: StakingIcon,
    description: '23,000 MAHA deposited',
    appyPercentage: '40',
    buttonText: 'Stake Now',
  },
  {
    title: 'Earn ARTH',
    subtitle: 'by staking MAHA- DAI-LPv2',
    logo: coinBaseIcon,
    description: '23,000 MAHA deposited',
    appyPercentage: '40',
    buttonText: 'Stake Now',
  },
  {
    title: 'Earn ARTH',
    subtitle: 'by staking MAHA- DAI-LPv2',
    logo: coinBaseIcon,
    description: '23,000 MAHA deposited',
    appyPercentage: '40',
    buttonText: 'Stake Now',
  },
  {
    title: 'Earn ARTH',
    subtitle: 'by staking MAHA- DAI-LPv2',
    logo: coinBaseIcon,
    description: '23,000 MAHA deposited',
    appyPercentage: '40',
    buttonText: 'Stake Now',
  },
];


const Banks: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <PageHeader
            icon={<img alt="staking" src={StakingIcon} width="200px" />}
            title="Get the first distribution of ARTH"
            subtitle="To bootstrap the protocol, ARTH is given out linearly across various pools over a period of 5 days"
          />

          <LaunchCountdown
            deadline={new Date('2021-01-16T15:00:00Z')}
            description="How does ARTH Bond work?"
            descriptionLink="https://docs.basis.cash/mechanisms/stabilization-mechanism"
          />

          <br />
          <br />
          <br />
          <BankCards />
          {/* <Container size="lg">
            <div className="border-bottom width-100 margin-bottom-20" />
            <Grid container spacing={5} justify="center" alignItems="stretch">
              {stakeCardData &&
                stakeCardData.map((eachStake) => (
                  <Grid container item xs={12} md={6} lg={4} xl={4}>
                    <StakingCard {...eachStake} />
                  </Grid>
                ))}
            </Grid>
          </Container> */}
        </Route>
        <Route path={`${path}/:bankId`}>
          <Bank />
        </Route>
      </Page>
    </Switch>
  );
};

export default Banks;
