import React from 'react';
import styled from 'styled-components';

import { BoardroomInfo } from '../../../basis-cash';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import TokenSymbol from '../../../components/TokenSymbol';
import { useWallet } from 'use-wallet';

interface BoardroomProps {
  boardroom: BoardroomInfo;
}

const ArthBoardroom: React.FC<BoardroomProps> = ({ boardroom }) => {
  const { account, connect } = useWallet();

  return (
    <StyledCardWrapper>
      <Card>
        <CardContent>
          <StyledContent>
            <StyledTitle>
              Bond {boardroom.depositTokenName} to earn {boardroom.earnTokenName}
            </StyledTitle>
            <CardIcon>
              <TokenSymbol symbol={boardroom.depositTokenName} size={54} />
            </CardIcon>

            <StyledInfoSlots>
              <StyledInfoSlot>
                <SlotTitle>{boardroom.seionrageSupplyPercentage}%</SlotTitle>
                <SlotDescription>Seinorage Supply</SlotDescription>
              </StyledInfoSlot>

              <StyledInfoSlot>
                <SlotTitle>400,000</SlotTitle>
                <SlotDescription>Bonded</SlotDescription>
              </StyledInfoSlot>

              <StyledInfoSlot>
                <SlotTitle>{boardroom.lockInPeriodDays} day</SlotTitle>
                <SlotDescription>lock-in period</SlotDescription>
              </StyledInfoSlot>
            </StyledInfoSlots>

            <StyledInfoSlots>
              {/* <StyledInfoSlot>
                <SlotTitle>4%</SlotTitle>
                <SlotDescription>Staked</SlotDescription>
              </StyledInfoSlot> */}

              <StyledInfoSlot>
                <SlotTitle>{boardroom.history7dayAPY}%</SlotTitle>
                <SlotDescription>Historic 7-day APY</SlotDescription>
              </StyledInfoSlot>

              <StyledInfoSlot>
                <SlotTitle>{boardroom.history7dayAPY}%</SlotTitle>
                <SlotDescription>Historic 30-day APY</SlotDescription>
              </StyledInfoSlot>

              <StyledInfoSlot>
                <SlotTitle>{boardroom.history7dayAPY}%</SlotTitle>
                <SlotDescription>Estiamted APY</SlotDescription>
              </StyledInfoSlot>
            </StyledInfoSlots>

            {!!account ? (
              <Button text="Select" to={`/distribution/${boardroom.contract}`} />
            ) : (
              <Button onClick={() => connect('injected')} text="Unlock Wallet" />
            )}
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  );
};

const StyledCardWrapper = styled.div`
  display: flex;
  margin-bottom: 25px;
  max-width: 500px;
  width: 100%;
  position: relative;
`;

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const StyledInfoSlots = styled.div`
  display: flex;
  text-align: center;

  padding-top: 5px;
  padding-bottom: 15px;
`;

const StyledInfoSlot = styled.div`
  padding-left: 5px;
  padding-right: 5px;
`;

const SlotTitle = styled.div`
  color: #fff;
  font-family: Inter;
  font-weight: bold;
  font-size: 18px;
`;

const SlotDescription = styled.div`
  color: #fff;
  font-size: 14px;
`;

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[200]};
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: 0 0 ${(props) => props.theme.spacing[3]}px 0;
  padding: 0;
`;

export default ArthBoardroom;
