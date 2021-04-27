import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useBasisCash from '../../../hooks/useBasisCash';
import Grid from '@material-ui/core/Grid';
import Button from '../../../components/Button';
import arrowDown from '../../../assets/svg/arrowDown.svg';
import { Divider } from '@material-ui/core';
import TransparentInfoDiv from './InfoDiv';
import CustomInputContainer from '../../../components/CustomInputContainer';
import CustomModal from '../../../components/CustomModal';
import { CustomSnack } from '../../../components/SnackBar';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import CustomToolTip from '../../../components/CustomTooltip';

const SellContent = (props: WithSnackbarProps) => {
  useEffect(() => window.scrollTo(0, 0), []);
  const basisCash = useBasisCash();
  const [mintColl, setCollateralValue] = useState<number>(0);
  const [mintArthxShare, setArthxShare] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [mintReceive, setReceive] = useState<number>(0);
  const [redeemAmount, setRedeemAmount] = useState<number>(0);

  const [type, setType] = useState<'Buy' | 'Sell'>('Sell');
  const [openModal, setOpenModal] = useState<0 | 1 | 2>(0);

  const [selectedSwap, setSelectedSwap] = useState<'Uniswap' | 'Sushiswap'>('Uniswap');
  const [selectedAmountCoin, setSelectedAmountCoin] = useState<string>('ETH');
  const [dropDownValues] = useState<string[]>(basisCash.getCollateralTypes());

  // const isLaunched = Date.now() >= config.boardroomLaunchesAt.getTime();
  if (!basisCash) return <div />;

  const buyTabContent = () => {
    return (
      <Grid container style={{ marginTop: '24px' }}>
        <Grid item lg={3} sm={'auto'}></Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <LeftTopCard className={'custom-mahadao-container'}>
            <LeftTopCardHeader className={'custom-mahadao-container-header'}>
              <TabContainer>
                <ActiveTab></ActiveTab>
                <TabText>Buy</TabText>
              </TabContainer>
              <TabContainer onClick={() => setType('Sell')}>
                <TabText>Sell</TabText>
              </TabContainer>
            </LeftTopCardHeader>
            <LeftTopCardContainer className={'custom-mahadao-container-content'}>
              <CustomInputContainer
                ILabelValue={'Enter Amount'}
                IBalanceValue={`Balance ${balance}`}
                // ILabelInfoValue={'How can i get it?'}
                DefaultValue={mintArthxShare.toString()}
                LogoSymbol={selectedAmountCoin}
                hasDropDown={true}
                dropDownValues={dropDownValues}
                ondropDownValueChange={(data) => {
                  setSelectedAmountCoin(data);
                }}
                SymbolText={selectedAmountCoin}
                inputMode={'decimal'}
                setText={(val: string) => setArthxShare(Number(val.replace(/[^0-9]/g, '')))}
                tagText={'MAX'}
              />
              <PlusMinusArrow>
                <img src={arrowDown} />
              </PlusMinusArrow>
              <CustomInputContainer
                ILabelValue={'You receive'}
                IBalanceValue={`Balance ${balance}`}
                ILabelInfoValue={''}
                DefaultValue={mintReceive.toString()}
                LogoSymbol={'ARTH'}
                hasDropDown={false}
                SymbolText={'ARTH'}
              />
              <div>
                <TcContainer>
                  <OneLineInputwomargin>
                    <div style={{ flex: 1 }}>
                      <TextWithIcon>Liquidity on Uniswap</TextWithIcon>
                    </div>
                    <OneLineInputwomargin>
                      <BeforeChip>$ 9,760,068</BeforeChip>
                    </OneLineInputwomargin>
                  </OneLineInputwomargin>
                  <OneLineInputwomargin style={{ marginTop: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <TextWithIcon>Price</TextWithIcon>
                    </div>
                    <OneLineInputwomargin>
                      <BeforeChip>0.05</BeforeChip>
                      <TagChips style={{ marginRight: '4px' }}>ARTH</TagChips>
                      <BeforeChip>per</BeforeChip>
                      <TagChips>ETH</TagChips>
                    </OneLineInputwomargin>
                  </OneLineInputwomargin>
                </TcContainer>
                <Button
                  text={'Buy'}
                  size={'lg'}
                  variant={'default'}
                  disabled={false}
                  onClick={() => setOpenModal(1)}
                />
              </div>
            </LeftTopCardContainer>
          </LeftTopCard>
        </Grid>
        <Grid item lg={3} sm={'auto'}></Grid>
      </Grid>
    );
  };

  const sellTabContent = () => {
    return (
      <Grid container style={{ marginTop: '24px' }}>
        <Grid item lg={3} sm={'auto'}></Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <LeftTopCard className={'custom-mahadao-container'}>
            <LeftTopCardHeader className={'custom-mahadao-container-header'}>
              <TabContainer onClick={() => setType('Buy')}>
                <TabText>Buy</TabText>
              </TabContainer>
              <TabContainer>
                <ActiveTab></ActiveTab>
                <TabText>Sell</TabText>
              </TabContainer>
            </LeftTopCardHeader>
            <LeftTopCardContainer className={'custom-mahadao-container-content'}>
              <CustomInputContainer
                ILabelValue={'Enter Amount'}
                IBalanceValue={'Balance 500.00'}
                ILabelInfoValue={''}
                DefaultValue={redeemAmount.toString()}
                LogoSymbol={'ARTH'}
                hasDropDown={false}
                SymbolText={'ARTH'}
                inputMode={'decimal'}
                tagText={'MAX'}
                setText={(val: string) => setRedeemAmount(Number(val.replace(/[^0-9]/g, '')))}
              />
              <PlusMinusArrow>
                <img src={arrowDown} />
              </PlusMinusArrow>
              <CustomInputContainer
                ILabelValue={'You receive'}
                IBalanceValue={'Balance 500.00'}
                // ILabelInfoValue={'How can i get it?'}
                DefaultValue={redeemAmount.toString()}
                LogoSymbol={selectedAmountCoin}
                dropDownValues={dropDownValues}
                ondropDownValueChange={(data) => {
                  setSelectedAmountCoin(data);
                }}
                hasDropDown={true}
                SymbolText={selectedAmountCoin}
              />
              <div>
                <TcContainer>
                  <OneLineInputwomargin>
                    <div style={{ flex: 1 }}>
                      <TextWithIcon>Liquidity on Uniswap</TextWithIcon>
                    </div>
                    <OneLineInputwomargin>
                      <BeforeChip>$ 9,760,068</BeforeChip>
                    </OneLineInputwomargin>
                  </OneLineInputwomargin>
                  <OneLineInputwomargin style={{ marginTop: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <TextWithIcon>Price</TextWithIcon>
                    </div>
                    <OneLineInputwomargin>
                      <BeforeChip>0.05</BeforeChip>
                      <TagChips>ARTH</TagChips>
                      <BeforeChip>per</BeforeChip>
                      <TagChips>ETH</TagChips>
                    </OneLineInputwomargin>
                  </OneLineInputwomargin>
                  <OneLineInputwomargin style={{ marginTop: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <TextWithIcon>
                        Trading fee
                        <CustomToolTip/>
                      </TextWithIcon>
                    </div>
                    <OneLineInputwomargin>
                      <BeforeChip>0.05</BeforeChip>
                      <TagChips>ARTH</TagChips>
                    </OneLineInputwomargin>
                  </OneLineInputwomargin>
                </TcContainer>
                <Button text={'Sell'} size={'lg'} onClick={() => setOpenModal(1)} />
              </div>
            </LeftTopCardContainer>
          </LeftTopCard>
        </Grid>
        <Grid item lg={3} sm={'auto'}></Grid>
      </Grid>
    );
  };

  return (
    <div>
      <CustomModal
        closeButton
        handleClose={() => setOpenModal(0)}
        open={openModal === 1}
        modalTitleStyle={{}}
        modalContainerStyle={{}}
        modalBodyStyle={{}}
        title={`Confirm ${type}`}
      >
        <>
          <TransparentInfoDiv
            labelData={`Your amount`}
            rightLabelUnit={'ARTH'}
            rightLabelValue={'1500.00'}
          />

          <TransparentInfoDiv
            labelData={`Trading Fee`}
            rightLabelUnit={'5.87'}
            rightLabelValue={'ARTH'}
          />
          {/*

            <TransparentInfoDiv
              labelData={`Stability Fee`}
              labelToolTipData={'testing'}
              rightLabelUnit={'MAHA'}
              rightLabelValue={'0.05'}
            />*/}

          <Divider
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              margin: '15px 0px',
            }}
            // variant={'middle'}
          />

          <TransparentInfoDiv
            labelData={`You will receive`}
            // labelToolTipData={'testing'}
            rightLabelUnit={'ETH'}
            rightLabelValue={'5.00'}
          />

          {/*<TransparentInfoDiv
              labelData={`You will receive share`}
              // labelToolTipData={'testing'}
              rightLabelUnit={'ARTHX'}
              rightLabelValue={'1000.00'}
            />*/}

          <div
            style={{
              flexDirection: 'row',
              display: 'flex',
              width: '100%',
              marginTop: '10%',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <div style={{ flex: 1, width: '50%', marginRight: 10 }}>
              <Button
                variant={'transparent'}
                text="Cancel"
                size={'lg'}
                onClick={() => {
                  setOpenModal(0);
                  let options = {
                    content: () =>
                      CustomSnack({
                        onClose: props.closeSnackbar,
                        type: 'red',
                        data1: `Sell order for ${123} ARTH cancelled`,
                      }),
                  };
                  props.enqueueSnackbar('timepass', options);
                }}
                // onClick={handleClose}
              />
            </div>
            <div style={{ width: '50%', marginLeft: 10 }}>
              <Button
                text={'Confirm Sell'}
                // textStyles={{ color: '#F5F5F5' }}
                size={'lg'}
                onClick={() => {
                  setOpenModal(0);
                  let options = {
                    content: () =>
                      CustomSnack({
                        onClose: props.closeSnackbar,
                        type: 'green',
                        data1: `Selling ${123} ARTH`,
                      }),
                  };
                  props.enqueueSnackbar('timepass', options);
                }}
              />
            </div>
          </div>
        </>
      </CustomModal>
      {sellTabContent()}
    </div>
  );
};

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

export default withSnackbar(SellContent);
