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
import useExitFromBoardroom from '../../../hooks/useExitFromBoardroom';

const Boardroom = () => {
  const { bankId } = useParams<{ bankId: Boardrooms }>();
  const basisCash = useBasisCash();
  const boardroom = basisCash.getBoardroom(bankId, 'v1');

  const { onRedeem } = useExitFromBoardroom(boardroom);

  return (
    <>
      <PageHeader
        title="ARTH Distribution"
        icon={<img alt="distribution" src={DistributionIcon} width="200px" />}
        subtitle={`Deposit ${boardroom.depositTokenName} tokens and earn inflationary rewards from an increase in $ARTH supply.`}
        // showEpoch
      />
      <Container size="lg">
        <div className="border-bottom width-100 margin-bottom-20" />
        {/* // eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <Notice>
          New Upgraded Distribution contracts are coming soon and will replace this contract!
          🚀🚀 These contracts will stop receiving rewards.
        </Notice>
        <Notice>
          You are advised to withdraw funds from these contracts and deposit into new ones when
          they go live.
        </Notice>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} md={8} lg={8} xl={8}>
            <Grid container spacing={2} justify="center">
              <Grid container item xs={12} md={12} lg={6} xl={6}>
                <Stake boardroom={boardroom} />
              </Grid>
              <Grid container item xs={12} md={12} lg={6} xl={6}>
                <Harvest boardroom={boardroom} />
              </Grid>
            </Grid>
            <div style={{ marginTop: '20px', maxWidth: '200px' }}>
              <Button onClick={onRedeem} size="sm" text="Settle & Withdraw" />
            </div>
          </Grid>
          {/* <Grid container item xs={12} md={4} lg={4} xl={4}>
            <Grid container spacing={3} justify="center">
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
          </Grid> */}
        </Grid>
        {/* {(bankId === 'arthUniLiquidity' || bankId === 'arthMlpLiquidity') && <LPTokenHelpText boardroom={boardroom} />} */}
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

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
`;

const Notice = styled.p`
  font-size: 18;
  text-align: center;
  color: #fff;
  max-width: 400px;
  margin: 15px auto;
  // text-decoration: none;
  // color: ${(props) => props.theme.color.primary.main};
`;

export default Boardroom;
