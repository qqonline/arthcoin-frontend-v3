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
import DistributionIcon from '../distribution.png';
import { Boardrooms } from '../../../basis-cash/config';

const Boardroom = () => {
  const { bankId } = useParams<{ bankId: Boardrooms }>();
  const basisCash = useBasisCash();
  const boardroom = basisCash.getBoardroom(bankId);

  console.log('hit333');
  return (
    <>
      <PageHeader
        title="ARTH Distribution"
        icon={<img alt="distribution" src={DistributionIcon} width="200px" />}
        subtitle={`Deposit ${boardroom.depositTokenName} tokens and earn inflationary rewards from an increase in $ARTH supply.`}
        showEpoch
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
            <div style={{ marginTop: 20, marginBottom: 20, maxWidth: '200px' }}>
              <Button size="sm" text="Settle & Withdraw" />
            </div>
            {/* <Grid container spacing={5} justify="center">
              <Grid container item xs={12} md={4} lg={4} xl={4}>
                <ExchangeStat description="Total Tokens Staked" title="1,150,200" />
              </Grid>
              <Grid container item xs={12} md={4} lg={4} xl={4}>
                <ExchangeStat description="Your Pool %" title="0.002%" />
              </Grid>
              <Grid container item xs={12} md={4} lg={4} xl={4}>
                <ExchangeStat description="ARTH Price(1hr TWAP)" title="$1.150" />
              </Grid>
            </Grid> */}
          </Grid>
        </Grid>
        {(bankId === 'arthLiquidity' || bankId === 'mahaLiquidity') && (
          <LPTokenHelpText boardroom={boardroom} />
        )}
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
    uniswapUrl = 'https://app.uniswap.org/#/add/ETH/0xB4d930279552397bbA2ee473229f89Ec245bc365';
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
  text-align: center;
  display: block;
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
