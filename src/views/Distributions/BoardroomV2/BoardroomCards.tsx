import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Container from '../../../components/Container';
import { BoardroomInfo } from '../../../basis-cash';
import PageHeader from '../../../components/PageHeader';
import Button from '../../../components/Button/TransperantButton';
import useBasisCash from '../../../hooks/useBasisCash';
import HarvestMaha from './components/HarvestMaha';
import HarvestArth from './components/HarvestArth';
import BoardroomStaked from './components/BoardroomStaked';
import BoardroomEarned from './components/BoardroomEarned';
import HarvestMahaCard from './components/HarvestMahaCard';
import DistributionIcon from '../distribution.png';
import { Vaults } from '../../../basis-cash/config';

const Boardroom = () => {
  const { bankId } = useParams<{ bankId: Vaults }>();
  const basisCash = useBasisCash();
  const vault = basisCash.getBoardroomVault(bankId);

  return (
    <>
      <PageHeader
        title={`${vault.depositTokenName === 'ARTH' ? 'ARTH-DAI' : vault.depositTokenName}`}
        subtitle={`Deposit ${vault.depositTokenName} tokens and earn inflationary rewards from an increase in ${vault.depositTokenName} supply.`}
        parentLink="../"
        parentLinkTitle="ARTH-MAHA Distribution"
      // showEpoch
      />
      <Container size="lg">
        <Grid container spacing={2} justify="center">
          <Grid container item xs={12} md={6} lg={4} xl={4}>
            <BoardroomStaked vault={vault} />
          </Grid>
          <Grid container item xs={12} md={6} lg={4} xl={4}>
            <BoardroomEarned boardroomId={vault.arthBoardroom} />
          </Grid>
          <Grid container item xs={12} md={6} lg={4} xl={4}>
            <BoardroomEarned boardroomId={vault.mahaBoardroom} />
          </Grid>
        </Grid>
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
      {/* {`🦄  Provide liquidity to ${pairName} on Uniswap  🦄`} */}
    </StyledLink>
  );
};

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
