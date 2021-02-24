import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Container from '../../components/Container';
import BankPage from '../Bank';
import BankCards from './BankCardsV2';
import StakingIcon from '../../assets/svg/Staking.svg';

const Banks: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <PageHeader
            icon={<img alt="staking" src={StakingIcon} width="200px" />}
            title="Farm ARTH &amp; MAHA"
            subtitle="Here you'll find various places where you can farm ARTH &amp; MAHA for additional rewards"
          />
          <Container size="lg">
            <div className="border-bottom width-100 margin-bottom-20" />
            <BankCards />
          </Container>
        </Route>
        <Route path={`${path}/:bankId`}>
          <BankPage />
        </Route>
      </Page>
    </Switch>
  );
};

export default Banks;
