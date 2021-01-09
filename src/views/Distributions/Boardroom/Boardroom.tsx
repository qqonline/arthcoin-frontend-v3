import React from 'react';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';
import { BoardroomInfo } from '../../../basis-cash';
import PageHeader from '../../../components/PageHeader';
import Spacer from '../../../components/Spacer';
import useBasisCash from '../../../hooks/useBasisCash';
import Harvest from './components/Harvest';
import Stake from './components/Stake';

const Boardroom = () => {
  const { bankId } = useParams<{ bankId: 'arth' | 'arthLiquidity' }>();
  const basisCash = useBasisCash();
  const boardroom = basisCash.getBoardroom(bankId);

  return (
    <>
      <PageHeader
        title="ARTH Distribution"
        subtitle={`Deposit ${boardroom.depositTokenName} tokens and earn inflationary rewards from an increase in $ARTH supply.`}
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
        {bankId === 'arthLiquidity' && <LPTokenHelpText boardroom={boardroom} />}
      </StyledBoardroom>
    </>
  );
};

const LPTokenHelpText: React.FC<{ boardroom: BoardroomInfo }> = ({ boardroom }) => {
  let pairName: string;
  let uniswapUrl: string;

  const basisCash = useBasisCash();

  if (boardroom.depositTokenName.includes('ARTH')) {
    pairName = 'ARTH-DAI pair';
    uniswapUrl = `https://app.uniswap.org/#/add/${basisCash.ARTH.address}/${basisCash.DAI.address}`;
  } else {
    pairName = 'MAHA-WETH pair';
    uniswapUrl =
      'https://app.uniswap.org/#/add/0xa7ED29B253D8B4E3109ce07c80fc570f81B63696/0x6B175474E89094C44Da98b954EedeAC495271d0F';
  }

  return (
    <StyledLink href={uniswapUrl} target="_blank">
      {`🦄  Provide liquidity to ${pairName} on Uniswap  🦄`}
    </StyledLink>
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

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
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
