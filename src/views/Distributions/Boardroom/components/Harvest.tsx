import React from 'react';
import styled from 'styled-components';

import Button from '../../../../components/Button';
import TokenSymbol from '../../../../components/TokenSymbol';
import CardContent from '../../../../components/CardContent';
import CardIcon from '../../../../components/CardIcon';
import useHarvestFromBoardroom from '../../../../hooks/useHarvestFromBoardroom';
import useEarningsOnBoardroom from '../../../../hooks/useEarningsOnBoardroom';
import { getDisplayBalance } from '../../../../utils/formatBalance';
import { BoardroomInfo } from '../../../../basis-cash';

const Harvest = ({ boardroom }: { boardroom: BoardroomInfo }) => {
  const { onReward } = useHarvestFromBoardroom(boardroom);
  const earnings = useEarningsOnBoardroom(boardroom.kind);

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyleLabel>ARTH Earned </StyleLabel>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol="ARTH" />
            </CardIcon>
            <StyledValue>{getDisplayBalance(earnings)}</StyledValue>
            <StyledCardActions>
              <Button onClick={onReward} text="Claim Reward" disabled={earnings.eq(0)} />
            </StyledCardActions>
          </StyledCardHeader>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};
const StyledValue = styled.div`
  color: rgba(255, 255, 255, 0.88);
  font-size: 36px;
  margin-left: 20px;
  font-weight: 700;
`;
const StyleLabel = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 10px;
  align-self: start;
  line-height: 24px;
  color: #ffffff;
  opacity: 0.64;
`;
const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  flex-direction: row;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-left: ${(props) => props.theme.spacing[4]}px;
  width: 100%;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Card = styled.div`
  background: linear-gradient(180deg, #1f1a1a 0%, #251c1d 100%);
  border-radius: 12px;
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
`;
export default Harvest;
