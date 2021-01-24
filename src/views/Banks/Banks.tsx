import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Bank from '../Bank';
import BankCards from './BankCards';
import StakingIcon from '../../assets/svg/Staking.svg';


const Banks: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <PageHeader
            icon={<img alt="staking" src={StakingIcon} width="200px" />}
            title="Stake and Earn Rewards in MAHA"
            subtitle=""
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
