import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import Boardroom from './Boardroom';
import Boardrooms from './Boardrooms';

const Distribution: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <Boardrooms />
        </Route>
        <Route path={`${path}/:bankId`}>
          <Boardroom />
        </Route>
      </Page>
    </Switch>
  );
};

export default Distribution;
