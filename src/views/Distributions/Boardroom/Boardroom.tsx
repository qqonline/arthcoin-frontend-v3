import React from 'react';

import styled from 'styled-components';
import { BoardroomInfo } from '../../../basis-cash';
import PageHeader from '../../../components/PageHeader';
import Spacer from '../../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';

const Boardroom = () => {
  const boardroom: BoardroomInfo = {
    kind: 'arth',
    contract: '0x93E710d539368B400C33468f235394B3748C8A0e',
    depositTokenName: 'ARTH',
    earnTokenName: 'ARTH',
    seionrageSupplyPercentage: 80,
    history7dayAPY: 30,
    lockInPeriodDays: 5,
  };

  return (
    <>
      <PageHeader
        title="ARTH Distribution"
        subtitle={`Deposit $${boardroom.depositTokenName} tokens and earn inflationary rewards from an increase in $ARTH supply.`}
      />
      <StyledBoardroom>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Stake boardroom={boardroom} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Harvest boardroom={boardroom} />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
      </StyledBoardroom>
    </>
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
