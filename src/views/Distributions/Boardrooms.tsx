import React, { useEffect } from 'react';
import styled from 'styled-components';
import PageHeader from '../../components/PageHeader';

import Boardroom from './components/Boardroom';
import { Switch } from 'react-router-dom';
import Page from '../../components/Page';

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
        icon={<img alt="distribution" src={DistributionIcon} />}
        title="ARTH Distribution"
        subtitle="Deposit tokens and earn inflationary rewards from an increase in ARTH supply."
      />

      <Boardroom
        boardroom={{
          contract: '0x93E710d539368B400C33468f235394B3748C8A0e',
          depositTokenName: 'ARTH',
          earnTokenName: 'ARTH',
          seionrageSupplyPercentage: 80,
          history7dayAPY: 30,
          lockInPeriodDays: 5,
        }}
      />

      <Boardroom
        boardroom={{
          contract: '0x93E710d539368B400C33468f235394B3748C8A0e',
          depositTokenName: 'MAHA',
          earnTokenName: 'ARTH',
          seionrageSupplyPercentage: 20,
          history7dayAPY: 30,
          lockInPeriodDays: 1,
        }}
      />
      {/* {migrateNotice}
          <StyledBoardroom>
            <StyledCardsWrapper>
              <StyledCardWrapper>
                <Stake />
              </StyledCardWrapper>
              <Spacer />
              <StyledCardWrapper>
                <Harvest />
              </StyledCardWrapper>
            </StyledCardsWrapper>
            <Spacer size="lg" />
          </StyledBoardroom>

          <StyledBoardroom>
            <StyledCardsWrapper>
              <StyledCardWrapper>
                <Stake />
              </StyledCardWrapper>
              <Spacer />
              <StyledCardWrapper>
                <Harvest />
              </StyledCardWrapper>
            </StyledCardsWrapper>
            <Spacer size="lg" />
          </StyledBoardroom> */}
    </>
  );
};

const StyledNoticeWrapper = styled.div`
  width: 768px;
  margin-top: -20px;
  margin-bottom: 40px;
`;

export default Boardrooms;
