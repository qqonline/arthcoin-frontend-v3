import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Bank from '../Bank';
import BankCards from './BankCards';
import StakingIcon from './staking.png';

const Banks: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <PageHeader
            icon={<img alt="staking" src={StakingIcon} />}
            title="Pick a Staking Pool"
            subtitle="Stake tokens and earn rewards in MAHA or ARTH"
          />
          <BankCards />
        </Route>
        <Route path={`${path}/:bankId`}>
          <Bank />
        </Route>
      </Page>
    </Switch>
  );
};

export default Banks;
