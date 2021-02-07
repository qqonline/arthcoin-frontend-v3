import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import Boardroom from './Boardroom';
import Boardrooms from './Boardrooms';
import BoardroomsV2 from './BoardroomV2';

const Distribution: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <Boardrooms />
        </Route>
        <Route path={`${path}/v1/:bankId`}>
          <Boardroom />
        </Route>
        <Route path={`${path}/v2/:bankId`}>
          <BoardroomsV2 />
        </Route>
      </Page>
    </Switch>
  );
};

export default Distribution;
