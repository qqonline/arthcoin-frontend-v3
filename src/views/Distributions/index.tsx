import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import Boardroom from './Boardroom';
import Boardrooms_Desktop from './BoardroomsV2';
import Boardrooms_Mobile from './Boardrooms';
import BoardroomsV2 from './BoardroomV2';
import { useMediaQuery } from 'react-responsive';

const Distribution: React.FC = () => {
  const { path } = useRouteMatch();
  const isDesktopOrLaptop = useMediaQuery({query: '(min-device-width: 1284px)'})
  const isTabletOrMobile = useMediaQuery({ query: '(max-device-width: 1284px)' })

  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          {isDesktopOrLaptop && <Boardrooms_Desktop />}
          {isTabletOrMobile && <Boardrooms_Mobile />}
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
