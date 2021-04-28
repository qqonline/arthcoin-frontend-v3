import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import useCore from '../../hooks/useCore';
import Grid from '@material-ui/core/Grid';
import uniswapLogo from '../../assets/svg/uniswapLogo.svg';
import shushiswap from '../../assets/svg/sushiswapLogo.svg';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import CallMadeIcon from '@material-ui/icons/CallMade';
import SellContent from './components/SellContent';
import BuyContent from './components/BuyContent';

const Boardrooms = (props: WithSnackbarProps) => {
  useEffect(() => window.scrollTo(0, 0), []);
  const core = useCore();

  const [type, setType] = useState<'Buy' | 'Sell'>('Buy');

  const [selectedSwap, setSelectedSwap] = useState<'Uniswap' | 'Sushiswap'>('Uniswap');

  // const isLaunched = Date.now() >= config.boardroomLaunchesAt.getTime();
  if (!core) return <div />;

  const TabContent = () => {
    return (
      <Grid container>
        <Grid item lg={3} sm={'auto'}></Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <LeftTopCard className={'custom-mahadao-container'}>
            <LeftTopCardHeader className={'custom-mahadao-container-header'}>
              <TabContainer onClick={() => setType('Buy')}>
                {type === 'Buy' && <ActiveTab />}
                {type === 'Buy'? <TabTextActive>Buy</TabTextActive>: <TabText>Buy</TabText>}
              </TabContainer>
              <TabContainer onClick={() => setType('Sell')}>
                {type === 'Sell' && <ActiveTab />}
                {type === 'Sell'? <TabTextActive>Sell</TabTextActive>: <TabText>Sell</TabText>}
              </TabContainer>
            </LeftTopCardHeader>
            {type === 'Buy' && <BuyContent />}
            {type === 'Sell' && <SellContent />}
          </LeftTopCard>
        </Grid>
        <Grid item lg={3} sm={'auto'}></Grid>
      </Grid>
    );
  };

  return (
    <>
      <GradientDiv />
      <Container size="lg">
        <div>
          <PageHeading>TRADE</PageHeading>
          <PageSubHeading>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </PageSubHeading>
        </div>
        <Grid container>
          <Grid item lg={3}></Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <RadioSelectionConatiner>
              <RadioSubConatiner
                onClick={() => {
                  if (selectedSwap === 'Sushiswap') {
                    setSelectedSwap('Uniswap');
                  }
                }}
              >
                {selectedSwap === 'Uniswap' && <ActiveRadio />}
                <RadioText>
                  <RadioLogo>
                    <img src={uniswapLogo} style={{ marginTop: '-6px' }} />
                  </RadioLogo>
                  Uniswap
                </RadioText>
              </RadioSubConatiner>
              <RadioSubConatiner
                onClick={() => {
                  if (selectedSwap === 'Uniswap') {
                    setSelectedSwap('Sushiswap');
                  }
                }}
              >
                {selectedSwap === 'Sushiswap' && <ActiveRadio />}
                <RadioText>
                  <RadioLogo>
                    <img src={shushiswap} />
                  </RadioLogo>
                  Sushiswap
                </RadioText>
              </RadioSubConatiner>
            </RadioSelectionConatiner>
          </Grid>
          <Grid item lg={3}></Grid>
        </Grid>
        {TabContent()}
        <Grid container>
          <Grid item lg={3} sm={'auto'}></Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <CustomInfoCard className={'custom-mahadao-box'}>
              <CustomInfoCardDetails>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <InfoBoxTitle>ETH-ARTH Uniswap pool</InfoBoxTitle>
                    <InfoBoxSubTitle>Provide liquidity to ETH-ARTH on uniswap</InfoBoxSubTitle>
                  </Grid>
                </Grid>
              </CustomInfoCardDetails>
              <CustomInfoCardButton>
                <img src={uniswapLogo} style={{ marginTop: '-6px', marginRight: '10px' }} />
                <span>Add liquidity on Uniswap</span>
                <CallMadeIcon style={{ fontSize: 15, marginLeft: '10px' }} />
              </CustomInfoCardButton>
            </CustomInfoCard>
          </Grid>
          <Grid item lg={3} sm={'auto'}></Grid>
        </Grid>
      </Container>
    </>
  );
}

const GradientDiv = styled.div`
  background: linear-gradient(180deg, #2a2827 0%, rgba(42, 40, 39, 0) 100%);
  height: 270px;
  position: absolute;
  // border: 1px solid;
  width: 100%;
  z-index: -5;
`;

const CustomInfoCardButton = styled.div`
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.32);
  box-sizing: border-box;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  &:hover {
    background: #423b38;
  }
  /* identical to box height, or 143% */

  text-align: center;

  color: #ffffff;

  opacity: 0.88;
`;

const InfoBoxTitle = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin: 0;
`;

const InfoBoxSubTitle = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: rgba(255, 255, 255, 0.64);
  margin: 0;
`;

const PageHeading = styled.p`
  font-family: Syne;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-align: center;
  color: #ffffff;
  margin-top: 40px;
`;

const PageSubHeading = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: rgba(255, 255, 255, 0.64);
  text-align: center;
  margin-bottom: 40px;
`;

const RadioSelectionConatiner = styled.div`
  background: #2a2827;
  border-radius: 8px;
  padding: 6px;
  display: flex;
  flex-direction: row;
`;
const RadioSubConatiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  z-index: 1;
  cursor: pointer;
  flex: 0.5;
  position: relative;
`;

const RadioText = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.88);
  z-index: 1;
`;

const RadioLogo = styled.span`
  margin-left: 5px;
  margin-right: 5px;
`;

const ActiveRadio = styled.div`
  position: absolute;
  width: 100%;
  height: 40px;
  background: #423b38;
  border-radius: 4px;
  z-index: 0;
`;

const LeftTopCard = styled.div`
  margin-top: 24px;
  @media (max-width: 600px) {
    margin-top: 24px;
  }
`;

const LeftTopCardHeader = styled.div`
  display: flex;
  flex-direction: row;
`;
const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 12px;
  width: 100px;
  height: 80px;
  z-index: 1;
  cursor: pointer;
  flex: 0.5;
  position: relative;
`;

const TabText = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.64);
`;
const TabTextActive = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.88);
`;

const ActiveTab = styled.div`
  position: absolute;
  width: 100%;
  padding: 32px 12px;
  background: linear-gradient(180deg, rgba(244, 127, 87, 0) 0%, #fd565620);
  height: 80px;
  z-index: 0;
  border-bottom: 2px solid #fd5656;
`;

const CustomInfoCard = styled.div`
  margin-top: 16px;
  @media (max-width: 600px) {
    margin-top: 24px;
  }
`;

const CustomInfoCardDetails = styled.div`
  margin: 10px 0;
`;

export default withSnackbar(Boardrooms);
