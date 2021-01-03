import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import { Switch } from 'react-router-dom';
import Page from '../../components/Page';

import useBasisCash from '../../hooks/useBasisCash';
import config from '../../config';
import LaunchCountdown from '../../components/LaunchCountdown';
import Notice from '../../components/Notice';
import useBoardroomVersion from '../../hooks/useBoardroomVersion';
import DistributionIcon from './distribution.png';

const Boardroom: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));
  const basisCash = useBasisCash();

  const boardroomVersion = useBoardroomVersion();
  const migrateNotice = useMemo(() => {
    if (boardroomVersion === 'v2') {
      return (
        <StyledNoticeWrapper>
          <Notice color="green">
            <b>Please Migrate into New Boardroom</b>
            <br />
            The boardroom upgrade was successful. Please settle and withdraw your stake from the
            legacy boardroom, then stake again on the new boardroom contract{' '}
            <b>to continue earning ARTH seigniorage.</b>
          </Notice>
        </StyledNoticeWrapper>
      );
    }
    return <></>;
  }, [boardroomVersion]);

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
    <Switch>
      <Page>
        <>
          <PageHeader
            icon={<img alt="distribution" src={DistributionIcon} />}
            title="ARTH Distribution"
            subtitle="Deposit tokens and earn inflationary rewards from an increase in ARTH supply."
          />
          {migrateNotice}
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
          </StyledBoardroom>
        </>
      </Page>
    </Switch>
  );
};

const StyledBoardroom = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledNoticeWrapper = styled.div`
  width: 768px;
  margin-top: -20px;
  margin-bottom: 40px;
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

export default Boardroom;
