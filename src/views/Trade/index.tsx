import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import useBasisCash from '../../hooks/useBasisCash';
import Grid from '@material-ui/core/Grid';
import Button from '../../components/Button';
import arrowDown from '../../assets/svg/arrowDown.svg';
import uniswapLogo from '../../assets/svg/uniswapLogo.svg';
import shushiswap from '../../assets/svg/sushiswapLogo.svg';

import { Divider } from '@material-ui/core';
import TransparentInfoDiv from './components/InfoDiv';

import CustomInputContainer from '../../components/CustomInputContainer';
import CustomModal from '../../components/CustomModal';
import { CustomSnack } from '../../components/SnackBar';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import CallMadeIcon from '@material-ui/icons/CallMade';
import CustomToolTip from '../../components/CustomTooltip';
import SellContent from './components/SellContent';
import BuyContent from './components/BuyContent';

const Boardrooms = (props: WithSnackbarProps) => {
  useEffect(() => window.scrollTo(0, 0), []);
  const basisCash = useBasisCash();
  const [mintColl, setCollateralValue] = useState<number>(0);
  const [mintArthxShare, setArthxShare] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [mintReceive, setReceive] = useState<number>(0);
  const [redeemAmount, setRedeemAmount] = useState<number>(0);

  const [type, setType] = useState<'Buy' | 'Sell'>('Buy');
  const [openModal, setOpenModal] = useState<0 | 1 | 2>(0);

  const [selectedSwap, setSelectedSwap] = useState<'Uniswap' | 'Sushiswap'>('Uniswap');
  const [selectedAmountCoin, setSelectedAmountCoin] = useState<string>('ETH');
  const [dropDownValues] = useState<string[]>(basisCash.getCollateralTypes());

  // const isLaunched = Date.now() >= config.boardroomLaunchesAt.getTime();
  if (!basisCash) return <div />;

  const TabContent = () => {
    return (
      <Grid container style={{ marginTop: '24px' }}>
        <Grid item lg={3} sm={'auto'}></Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <LeftTopCard className={'custom-mahadao-container'}>
            <LeftTopCardHeader className={'custom-mahadao-container-header'}>
              <TabContainer onClick={() => setType('Buy')}>
                {type === 'Buy' && <ActiveTab />}
                <TabText>Buy</TabText>
              </TabContainer>
              <TabContainer onClick={() => setType('Sell')}>
                {type === 'Sell' && <ActiveTab />}
                <TabText>Sell</TabText>
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
        <Grid container style={{ marginTop: '16px' }}>
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

const TcContainer = styled.div`
  margin-top: 18px;
  margin-bottom: 18px;
`;

const OneLineInputwomargin = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
`;
const LeftTopCard = styled.div``;

const LeftTopCardHeader = styled.div`
  display: flex;
  flex-direction: row;
`;
const LeftTopCardContainer = styled.div``;
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

const PlusMinusArrow = styled.div`
  width: 100%;
  height: 32px;
  border-radius: 1.33px;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  font-size: 20px;
`;

const TextWithIcon = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  color: rgba(255, 255, 255, 0.88);
`;

const BeforeChip = styled.span`
  ont-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.64);
  margin-right: 5px;
`;

const TagChips = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 2px 8px;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.64);
`;

const CustomInfoCard = styled.div``;

const CustomInfoCardDetails = styled.div`
  margin: 10px 0;
`;

export default withSnackbar(Boardrooms);
