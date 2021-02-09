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
import DistributionIcon from '../../assets/svg/Boardroom.svg';

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
  // if (!isLaunched) {
  //   return (
  //     <LaunchCountdown
  //       deadline={config.boardroomLaunchesAt}
  //       description="How does the boardroom work?"
  //       descriptionLink="https://docs.basis.cash/mechanisms/stabilization-mechanism#expansionary-policy"
  //     />
  //   );
  // }

  if (!basisCash) return <div />;

  return (
    <>
      <PageHeader
        icon={<img alt="distribution" src={DistributionIcon} width="200px" />}
        title="ARTH Distribution"
        subtitle="Bond/Stake tokens and earn inflationary rewards when the ARTH supply expands. Rewards are redeemable only if the protocol is in expansion mode."
      />
      <Container size="lg">
        {/* <div className="border-bottom width-100 margin-bottom-20" /> */}
        <Grid container spacing={5} justify="center" alignItems="stretch">
          {/* <Grid container item xs={12} md={4} lg={4} xl={4}>
            <Boardroom boardroom={'arthMlpLiquidity'} />
          </Grid> */}
          <Grid container item xs={12} md={4} lg={4} xl={4}>
            <Boardroom
              boardroom={'arth'}
              // toolTipTitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            />
          </Grid>
          <Grid container item xs={12} md={4} lg={4} xl={4}>
            <Boardroom
              boardroom={'arthUniLiquidity'}
              // toolTipTitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            />
          </Grid>

          <Grid container item xs={12} md={4} lg={4} xl={4}>
            <Boardroom boardroom={'mahaLiquidity'} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Boardrooms;
