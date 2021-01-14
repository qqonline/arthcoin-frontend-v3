import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Container from '../../../components/Container';
import ExchangeStat from '../../Bond/components/ExchangeStat';
import { BoardroomInfo } from '../../../basis-cash';
import PageHeader from '../../../components/PageHeader';
import Button from '../../../components/Button/TransperantButton';
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
      <Container size="lg">
        <div className="border-bottom width-100 margin-bottom-20" />
        <Grid container spacing={5} justify="center">
          <Grid item xs={12} md={9} lg={9} xl={9}>
            <Grid container spacing={5} justify="center">
              <Grid container item xs={12} md={6} lg={6} xl={6}>
                <Stake boardroom={boardroom} />
              </Grid>
              <Grid container item xs={12} md={6} lg={6} xl={6}>
                <Harvest boardroom={boardroom} />
              </Grid>
            </Grid>
            <div style={{ marginTop: '20px', maxWidth: '200px' }}>
              <Button size="sm" text="Settle & Withdraw" />
            </div>
          </Grid>
          <Grid container item xs={12} md={3} lg={3} xl={3}>
            <Grid container spacing={5} justify="center">
              <Grid container item xs={12} md={12} lg={12} xl={12}>
                <ExchangeStat description="MAHA Price(TWAP)" title="$1.150" />
              </Grid>
              <Grid container item xs={12} md={12} lg={12} xl={12}>
                <ExchangeStat description="Scaling Factor" title="5x" />
              </Grid>
              <Grid container item xs={12} md={12} lg={12} xl={12}>
                <ExchangeStat description="Treasury Amount" title="~$5" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {bankId === 'arthLiquidity' && <LPTokenHelpText boardroom={boardroom} />}
      </Container>
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
