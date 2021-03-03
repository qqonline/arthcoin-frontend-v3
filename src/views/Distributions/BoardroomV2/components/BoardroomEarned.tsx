import React from 'react';
import styled from 'styled-components';

import TokenSymbol from '../../../../components/TokenSymbol';
import CardWithTitle from '../../../../components/CardWithTitle';
import useHarvestFromBoardroom from '../../../../hooks/useHarvestFromBoardroom';
import useEarningsOnBoardroomV2 from '../../../../hooks/useEarningsOnBoardroomV2';
import { getDisplayBalance } from '../../../../utils/formatBalance';
import { BoardroomsV2 } from '../../../../basis-cash/config';
import useBasisCash from '../../../../hooks/useBasisCash';
import Button from '../../../../components/Button';
import ProgressCountdown from './ProgressCountdown';
import { Info } from '@material-ui/icons';

const HarvestArth = ({ boardroomId }: { boardroomId: BoardroomsV2 }) => {
  const basisCash = useBasisCash()
  const boardroom = basisCash.getBoardroomV2(boardroomId)

  const {onReward} = useHarvestFromBoardroom(boardroom);
  // eslint-disable-next-line
  const [earnings, claimable] = useEarningsOnBoardroomV2('arthArth');
  const tokenName = boardroom.earnTokenName;

  return (
    <CardWithTitle titleComponent fullWidth>
      <StyledCardHeader>        
        <StyledCardIcon>
          <LogoContainer>
            <TokenSymbol symbol={tokenName} size={36} />
          </LogoContainer>
        </StyledCardIcon>
        <StyleLabel>{`${tokenName} Earned`} </StyleLabel>
      </StyledCardHeader>
      <StyledCardContent>
        <StyledCardContentInner>
          <StyledField>
            <StyledFieldName>{`${tokenName} Earned`}</StyledFieldName>
            <StyledFieldValue>{getDisplayBalance(earnings)}</StyledFieldValue>
          </StyledField>          
          <StyledField>
            <StyledFieldName>Available to Claim <Info style={{transform: "scale(0.7)"}} /> </StyledFieldName>
            <StyledFieldValue>{getDisplayBalance(earnings)}</StyledFieldValue>
          </StyledField>
        </StyledCardContentInner>

        {tokenName === "MAHA" && (
          <ProgressCountdown
            base={new Date()}
            deadline={new Date()}
            description={`Vesting Period`}
            tooltip="Vesting Period Tooltip"
          />
        )}
        
        <p style={{ color: '#fff9', fontSize: 13, fontWeight: 300, textAlign: 'justify', minHeight: 18 }}>
        {tokenName !== 'MAHA' && (
          <span>
              You earn ARTH when the <b style={{color: "#FF7F57"}}>Protocol Expands</b>. ARTH earned is vested linearly acorss a period of 8 hours.
          </span>
        )}
        </p>
        <StyledCardActions>
          <Button onClick={onReward} disabled={earnings.eq(0)} variant='outlined' text={`Claim ${tokenName}`} />
        </StyledCardActions>
      </StyledCardContent>
    </CardWithTitle>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  flex-direction: row;
`;
const StyledCardIcon = styled.div`
  background-color: ${(props) => props.theme.color.grey[900]};
  // width: 72px;
  height: 36px;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyleLabel = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-left: 15px;  
  color: #ffffff;
`;

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;

const StyledCardContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: ${props => props.theme.spacing[4]}px;
  width: 100%;
  height: 400px;
`

const StyledCardContentInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  flex: 1;
`;
const StyledField = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledFieldName = styled.span`
  color: rgba(255, 255, 255, 0.64);
  font-size: 16px;
  font-weight: 300;
  display: flex;
  align-items: center;
`;
const StyledFieldValue = styled.span`
  color: rgba(255, 255, 255, 0.95);
  font-size: 18px;
  font-weight: 600;
`;
export default HarvestArth;
