import React, { useEffect } from 'react';
import styled from 'styled-components';
import CardWithTitle from '../../components/CardWithTitle';
import PageHeader from '../../components/PageHeader';
import Container from '../../components/Container';
import config from '../../config';
import useBasisCash from '../../hooks/useBasisCash';
import Boardroom from './components/BoardroomV2';
import Grid from '@material-ui/core/Grid';
import InfoIcon from '@material-ui/icons/Info';

const Boardrooms: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));
  const basisCash = useBasisCash();
  

  const isLaunched = Date.now() >= config.boardroomLaunchesAt.getTime();
  if (!basisCash) return <div />;
  
  return (
    <>
      <PageHeader
        
        title="ARTH Distribution"
        subtitle="Bond/Stake tokens and earn inflationary rewards when the ARTH supply expands. Rewards are redeemable only if the protocol is in expansion mode."
      />
      <Container size="lg">
        <CardWithTitle title="Bonding Pools">
          <Grid container>
            <Grid container item direction="row" justify="space-between" style={{padding: 10}}>
              <Grid item xs={12} lg={4}>
                <StyledTableHeaderTextLeft>PAIR</StyledTableHeaderTextLeft>
              </Grid>
              <Grid item lg={2}>
                <StyledTableHeaderTextCenter>POOL</StyledTableHeaderTextCenter>
              </Grid>
              <Grid item lg={2}>
                <StyledTableHeaderTextCenter>Seigniorage Supply</StyledTableHeaderTextCenter>
              </Grid>
              <Grid item lg={2}>
                <StyledTableHeaderText>APY</StyledTableHeaderText>
              </Grid>
              <Grid item lg={2}>
                <StyledTableHeaderTextRight>
                  Withdrawal Period
                  <InfoIcon fontSize="small" style={{transform: 'scale(0.6)'}} />
                </StyledTableHeaderTextRight>                
              </Grid>
            </Grid>
            
            <Grid container item direction="column" justify="space-around">
              {/* <Boardroom boardroom={"arthDai"}/>
              <Boardroom boardroom={"arth"}/>
              <Boardroom boardroom={"maha"}/> */}
              <Boardroom boardroom={"arth"}/>
              <Boardroom boardroom={"arthUniLiquidity"}/>
              <Boardroom boardroom={"mahaLiquidity"}/>
            </Grid>
          </Grid>
        </CardWithTitle>
      </Container>
    </>
  );
};

const StyledTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255, 0.02);
  border-radius: 12px;
  border-top: 1px solid rgba(255, 116, 38, 0.1);
  border-left: 1px solid rgba(255, 116, 38, 0.08);
  border-right: 1px solid rgba(255, 116, 38, 0.08);
  border-bottom: 1px solid rgba(255, 116, 38, 0.01);
  backdrop-filter: blur(70px);
`;

const StyledHeader = styled.header`
  border-bottom: 1px solid rgb(255, 255, 255, 0.08);
  padding: 20px 24px;
  margin-bottom: 10px;
`;

const StyledHeaderText = styled.h6`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[300]};
  margin: 0;
`;

const StyledTableHeaderTextCenter = styled.h6`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[600]};
  margin: 10px 30px;
  text-align: center;
`;

const StyledTableHeaderTextLeft = styled.h6`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[600]};
  margin: 10px 40px;
`;

const StyledTableHeaderText = styled.h6`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[600]};
  margin: 10px 30px;
`;

const StyledTableHeaderTextRight = styled.h6`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[600]};
  margin: 10px 10px;
`;

const StyledToolTip = styled.div`
  transform: scale(0.5);
`;

export default Boardrooms;
