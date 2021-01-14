import React, { useEffect } from 'react';
import PageHeader from '../../components/PageHeader';

import Boardroom from './components/Boardroom';
import { Switch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Page from '../../components/Page';
import Container from '../../components/Container';
import useBasisCash from '../../hooks/useBasisCash';
import config from '../../config';
import LaunchCountdown from '../../components/LaunchCountdown';
// import Notice from '../../components/Notice';
// import useBoardroomVersion from '../../hooks/useBoardroomVersion';
import DistributionIcon from './distribution.png';

const Boardrooms: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));
  const basisCash = useBasisCash();

  // const boardroomVersion = useBoardroomVersion('arth');
  // const migrateNotice = useMemo(() => {
  //   if (boardroomVersion === 'v2') {
  //     return (
  //       <StyledNoticeWrapper>
  //         <Notice color="green">
  //           <b>Please Migrate into New Boardroom</b>
  //           <br />
  //           The boardroom upgrade was successful. Please settle and withdraw your stake from the
  //           legacy boardroom, then stake again on the new boardroom contract{' '}
  //           <b>to continue earning ARTH seigniorage.</b>
  //         </Notice>
  //       </StyledNoticeWrapper>
  //     );
  //   }
  //   return <></>;
  // }, [boardroomVersion]);

  const isLaunched = Date.now() >= config.boardroomLaunchesAt.getTime();
  if (!isLaunched) {
    return (
      <Switch>
        <Page>
          <PageHeader
            icon={<img alt="distribution" src={DistributionIcon} />}
            title="ARTH Distribution"
            subtitle="Deposit tokens and earn inflationary rewards from an increase in ARTH supply."
          />
          <LaunchCountdown
            deadline={config.boardroomLaunchesAt}
            description="How does the boardroom work?"
            descriptionLink="https://docs.basis.cash/mechanisms/stabilization-mechanism#expansionary-policy"
          />
        </Page>
      </Switch>
    );
  }

  if (!basisCash) return <div />;

  return (
    <>
      <PageHeader
        icon={<img alt="distribution" src={DistributionIcon} width="200px" />}
        title="ARTH Distribution"
        subtitle="Deposit tokens and earn inflationary rewards from an increase in ARTH supply."
      />
      <Container size="lg">
        <div className="border-bottom width-100 margin-bottom-20" />
        <Grid container spacing={5} justify="center" alignItems="stretch">
          <Grid container item xs={12} md={6} lg={6} xl={6}>
            <Boardroom boardroom={'arth'} />
          </Grid>
          <Grid container item xs={12} md={6} lg={6} xl={6}>
            <Boardroom boardroom={'arthLiquidity'} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Boardrooms;
