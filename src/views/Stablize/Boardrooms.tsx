import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';

import Boardroom from './components/Vault';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '../../components/Container';
import useBasisCash from '../../hooks/useBasisCash';
import DistributionIcon from '../../assets/svg/Boardroom.svg';
import { Vaults } from '../../basis-cash/config';
import Button from '../../components/Button';
import Modal from './components/modal';
import TokenSymbol from '../../components/TokenSymbol';
import arrowDown from '../../assets/svg/arrowDown.svg'
import plus from '../../assets/svg/plus.svg'
import styled from 'styled-components';
import InfoIcon from '@material-ui/icons/Info';
import InputContainer from './Boardroom/components/InputContainer';
import TransparentInfoDiv from './components/InfoDiv';
import CheckIcon from '@material-ui/icons/Check';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { Checkbox, CheckboxProps, createStyles, Divider, FormControlLabel, LinearProgress, makeStyles, Slider, Theme, withStyles } from '@material-ui/core';
import CollaterallizeCheckmark from './components/Collaterallize';
import MinorInputContainer from './components/MinorInputContainer';
import StabilizePageHeader from '../../components/PageHeader/StabilizePageHeader';
import CustomInputContainer from '../../components/CustomInputContainer';
import CustomModal from '../../components/CustomModal';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { CustomSnack } from '../../components/SnackBar';

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }),
)(LinearProgress);
const Boardrooms = (props: WithSnackbarProps) => {

  const [buyback, setBuyback] = useState<boolean>(true);
  const [recollatateralize, setRecollatateralize] = useState<boolean>(false);
  const [collateralAmount, setCollateralAmount] = useState<number>(0)
  const [redeemAmount, setRedeemAmount] = useState<number>(0)
  const [shareAmount, setShareAmount] = useState<number>(1500)
  const [receiveShare, setReceiveShare] = useState<number>(1500)
  const [receiveMAHA, setReceiveMAHA] = useState<number>(1500)
  const [balance, setBalance] = useState<number>(0)
  const [receiveBonus, setReceiveBonus] = useState<number>(1500)
  const [algorithmicValue, setAlgorithmicValue] = useState<number>(2.34)
  const [finalValue, setFinalValue] = useState<number>(100)
  const [type, setType] = useState<'Buyback' | 'Recollateralize'>('Buyback')
  const [openModal, setOpenModal] = useState<0 | 1 | 2>(0);
  const [selectedAmountCoin, setSelectedAmountCoin] = useState<string>('ETH')
  const [dropDownValues, setDropDownValues] = useState<string[]>([]);
  const defaultDropdownValues = ['MAHA', 'ARTH', 'USDT', 'USDC', 'ETH', 'WBTC'];
  let arr: string[];
  useEffect(() => window.scrollTo(0, 0), []);
  useEffect(() => {
    arr = defaultDropdownValues.filter(e => e !== selectedAmountCoin);
    setDropDownValues(arr);
  }, [selectedAmountCoin])

  const buyBackContainer = () => {
    if (buyback) return (
      <LeftTopCard>
        <LeftTopCardHeader>
          <HeaderTitle>
            Buyback
            <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
          </HeaderTitle>
          {buyback ? <HeaderSubtitle>
            342.450K <HardChip>USDT</HardChip> <TextForInfoTitle>Available in Protocol</TextForInfoTitle>
          </HeaderSubtitle> :
            <HeaderSubtitle>
              <TextForInfoTitle>Buy is not needed for now</TextForInfoTitle>
            </HeaderSubtitle>}
        </LeftTopCardHeader>
        <LeftTopCardContainer>
          <CustomInputContainer
            ILabelValue={'Enter Redeem Amount'}
            IBalanceValue={`Balance ${balance}`}
            ILabelInfoValue={''}
            DefaultValue={redeemAmount.toString()}
            hasDropDown={true}
            LogoSymbol={selectedAmountCoin}
            dropDownValues={dropDownValues}
            ondropDownValueChange={(data) => {
              setSelectedAmountCoin(data);
            }}
            SymbolText={selectedAmountCoin}
            inputMode={'decimal'}
            setText={(val: string) => { setRedeemAmount(Number(val.replace(/[^0-9]/g, ''))) }}
          />
          <PlusMinusArrow>
            <img src={arrowDown} />
          </PlusMinusArrow>
          <MinorInputContainer
            ILabelValue={'You receive'}
            IBalanceValue={''}
            ILabelInfoValue={''}
            DefaultValue={'0.00'}
            LogoSymbol={'MAHA'}
            hasDropDown={true}
            SymbolText={'ARTH'}
          />
          <div>
            <TcContainer>
              <OneLineInputwomargin style={{ marginBottom: '5px' }}>
                <div style={{ flex: 1 }}>
                  <TextWithIcon>
                    Trading Fee
                    <InfoIcon fontSize='default' style={{ transform: 'scale(0.6)' }} />
                  </TextWithIcon>
                </div>
                <OneLineInputwomargin>
                  <BeforeChip>0.05</BeforeChip>
                  <TagChips>USDT</TagChips>
                </OneLineInputwomargin>
              </OneLineInputwomargin>
              <OneLineInputwomargin>
                <div style={{ flex: 1 }}>
                  <TextWithIcon>
                    Stability Fee
                    <InfoIcon fontSize='default' style={{ transform: 'scale(0.6)' }} />
                  </TextWithIcon>
                </div>
                <OneLineInputwomargin>
                  <BeforeChip>0.05</BeforeChip>
                  <TagChips>MAHA</TagChips>
                </OneLineInputwomargin>
              </OneLineInputwomargin>
            </TcContainer>
            <div style={{ marginTop: 35 }}>
              <Button text={'Buyback'} size={'lg'} onClick={() => {
                setType('Buyback')
                setOpenModal(1)
              }} />
            </div>
          </div>
        </LeftTopCardContainer>
      </LeftTopCard>
    )
    else return (
      <LeftTopCardChecked>
        <LeftTopCardHeader>
          <HeaderTitle>
            Buyback
        <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
          </HeaderTitle>
          {buyback ? <HeaderSubtitle>
            342.450K <HardChip>USDT</HardChip> <TextForInfoTitle>Available in Protocol</TextForInfoTitle>
          </HeaderSubtitle> :
            <HeaderSubtitle>
              <TextForInfoTitle>Buy is not needed for now</TextForInfoTitle>
            </HeaderSubtitle>}
        </LeftTopCardHeader>
        <CollaterallizeCheckmark subText={'Buyback is not needed for now'} />

      </LeftTopCardChecked>
    )
  };

  const recollatateralizeConatiner = () => {
    if (recollatateralize) return (
      <LeftTopCard>
        <LeftTopCardHeader>
          <HeaderTitle>
            {recollatateralize ? 'Add Collateral' : 'Recollatateralize'}
            <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
          </HeaderTitle>
          {recollatateralize ?
            <HeaderSubtitle>
              342.450K <HardChip>USDT</HardChip> <TextForInfoTitle>Remaining to Generate</TextForInfoTitle>
            </HeaderSubtitle> :
            <HeaderSubtitle>
              <TextForInfoTitle>The Protocol is currently collateralised</TextForInfoTitle>
            </HeaderSubtitle>}
        </LeftTopCardHeader>
        <LeftTopCardContainer>
          <CustomInputContainer
            ILabelValue={'Enter Collateral'}
            IBalanceValue={`Balance ${balance}`}
            ILabelInfoValue={''}
            DefaultValue={collateralAmount.toString()}
            hasDropDown={true}
            LogoSymbol={selectedAmountCoin}
            dropDownValues={dropDownValues}
            ondropDownValueChange={(data) => {
              setSelectedAmountCoin(data);
            }}
            SymbolText={selectedAmountCoin}
            setText={(val: string) => setCollateralAmount(Number(val.replace(/[^0-9]/g, '')))}
            inputMode={'decimal'}
          />
          <PlusMinusArrow>
            <img src={arrowDown} />
          </PlusMinusArrow>
          <PrimaryText>You Receive</PrimaryText>
          <ReYouReceiveContain>
            <OneLineInputwomargin style={{ marginBottom: '10px' }}>
              <PrimaryText>ARTH Share</PrimaryText>
              <OneLineInputwomargin>
                <BeforeHardChip>1.08</BeforeHardChip>
                <HardChip>ARTHX</HardChip>
              </OneLineInputwomargin>
            </OneLineInputwomargin>
            <OneLineInputwomargin style={{ marginBottom: '10px' }}>
              <PrimaryText>MAHA Reward</PrimaryText>
              <OneLineInputwomargin>
                <BeforeHardChip>1.08</BeforeHardChip>
                <HardChip>ARTHX</HardChip>
              </OneLineInputwomargin>
            </OneLineInputwomargin>
            <OneLineInputwomargin>
              <PrimaryText>
                Bonus
                <InfoIcon fontSize='default' style={{ transform: 'scale(0.6)' }} />
              </PrimaryText>
              <OneLineInputwomargin>
                <BeforeHardChip>1.08</BeforeHardChip>
                <HardChip>ARTHX</HardChip>
              </OneLineInputwomargin>
            </OneLineInputwomargin>
          </ReYouReceiveContain>
          <div>
            <TcContainer>
              <OneLineInputwomargin>
                <div style={{ flex: 1 }}>
                  <TextWithIcon>
                    {/* Bonus */}
                    {/* <InfoIcon fontSize='default' style={{ transform: 'scale(0.6)' }} /> */}
                  </TextWithIcon>
                </div>
                <OneLineInputwomargin>
                  {/* <BeforeChip>1.06</BeforeChip> */}
                  {/* <TagChips>ARTHX</TagChips> */}
                </OneLineInputwomargin>
              </OneLineInputwomargin>
            </TcContainer>
            <div style={{ flex: 1, marginTop: 15 }}>
              <Button text={'Recollatateralize'} size={'lg'} onClick={() => {
                // setBuyback(true)
                // setRecollatateralize(false)
                setType('Recollateralize')
                setOpenModal(1)
              }} />
            </div>
          </div>
        </LeftTopCardContainer>

      </LeftTopCard>
    )
    else return (
      <LeftTopCardChecked>
        <LeftTopCardHeader>
          <HeaderTitle>
            {recollatateralize ? 'Add Collateral' : 'Recollatateralize'}
            <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
          </HeaderTitle>
          {recollatateralize ?
            <HeaderSubtitle>
              342.450K <HardChip>USDT</HardChip> <TextForInfoTitle>Remaining to Generate</TextForInfoTitle>
            </HeaderSubtitle> :
            <HeaderSubtitle>
              <TextForInfoTitle>The Protocol is currently collateralised</TextForInfoTitle>
            </HeaderSubtitle>}
        </LeftTopCardHeader>
        <CollaterallizeCheckmark subText={'The Protocol is currently collateralised'} />
      </LeftTopCardChecked>
    )
  };
  return (
    <>
      <CustomModal
        closeButton
        handleClose={() => setOpenModal(0)}
        open={openModal === 1}
        modalTitleStyle={{}}
        modalContainerStyle={{}}
        modalBodyStyle={{}}
        title={`Confirm ${type} ARTH`}
      >
        {type === 'Buyback' ?
          <>
            <TransparentInfoDiv
              labelData={`Your share amount`}
              rightLabelUnit={'ARTH'}
              rightLabelValue={redeemAmount.toString()}
            />

            <TransparentInfoDiv
              labelData={`Trading Fee`}
              labelToolTipData={'testing'}
              rightLabelUnit={'USDT'}
              rightLabelValue={'0.05'}
            />


            <TransparentInfoDiv
              labelData={`Stability Fee`}
              labelToolTipData={'testing'}
              rightLabelUnit={'MAHA'}
              rightLabelValue={'0.05'}
            />


            <Divider
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                margin: '15px 0px'
              }}
            // variant={'middle'}
            />

            <TransparentInfoDiv
              labelData={`You will Receive Collateral`}
              // labelToolTipData={'testing'}
              rightLabelUnit={'USDT'}
              rightLabelValue={'1000.00'}
            />

            <div style={{
              flexDirection: 'column-reverse',
              display: 'flex',
              width: '100%',
              marginTop: '10%',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8
            }}
            >
              <div style={{ flex: 1, width: '100%', marginTop: 10 }}>
                <Button
                  variant={'transparent'}
                  text="Cancel"
                  size={'lg'}
                  onClick={() => {
                    setOpenModal(0)
                    let options = {
                      content: () => (CustomSnack({ onClose: props.closeSnackbar, type: 'red', data1: `Buyback for ${redeemAmount} ARTH cancelled` }))
                    }
                    props.enqueueSnackbar('timepass', options)
                  }}
                // onClick={handleClose}
                />
              </div>
              <div style={{ width: '100%', }}>
                <Button
                  text={'Buyback'}
                  // textStyles={{ color: '#F5F5F5' }}
                  size={'lg'}
                  onClick={() => {
                    // setType('Redeem')
                    setBuyback(false)
                    setRecollatateralize(true)
                    setOpenModal(0)
                    let options = {
                      content: () => (CustomSnack({ onClose: props.closeSnackbar, type: 'green', data1: `Buyback for ${redeemAmount} ARTH :- processing` }))
                    }
                    props.enqueueSnackbar('timepass', options)
                  }}
                />
              </div>
            </div>
          </>
          :
          <>
            <TransparentInfoDiv
              labelData={`Your Collateral Amount`}
              rightLabelUnit={'ARTH'}
              rightLabelValue={collateralAmount.toString()}
            />

            <Divider
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                margin: '15px 0px'
              }}
            // variant={'middle'}
            />

            <TransparentInfoDiv
              labelData={`You will Receive Share`}
              // labelToolTipData={'testing'}
              rightLabelUnit={'ARTHX'}
              rightLabelValue={receiveShare.toString()}
            />

            <TransparentInfoDiv
              labelData={`You will Receive MAHA`}
              // labelToolTipData={'testing'}
              rightLabelUnit={'MAHA'}
              rightLabelValue={receiveMAHA.toString()}
            />

            <TransparentInfoDiv
              labelData={`You will Receive Bonus`}
              // labelToolTipData={'testing'}
              rightLabelUnit={'ARTHX'}
              rightLabelValue={receiveBonus.toString()}
            />

            <div style={{
              flexDirection: 'column-reverse',
              display: 'flex',
              width: '100%',
              marginTop: '10%',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8
            }}
            >
              <div style={{ flex: 1, width: '100%', marginTop: 10 }}>
                <Button
                  variant={'transparent'}
                  text="Cancel"
                  size={'lg'}
                  onClick={() => {
                    setOpenModal(0)
                    let options = {
                      content: () => (CustomSnack({ onClose: props.closeSnackbar, type: 'red', data1: `Recollateralize for ${collateralAmount} ARTH cancelled` }))
                    }
                    props.enqueueSnackbar('timepass', options)
                  }}
                // onClick={handleClose}
                />
              </div>
              <div style={{ width: '100%', }}>
                <Button
                  text={'Recollateralize'}
                  // textStyles={{ color: '#F5F5F5' }}
                  size={'lg'}
                  onClick={() => {
                    // setType('Redeem')
                    setBuyback(true)
                    setRecollatateralize(false)
                    setOpenModal(0)
                    let options = {
                      content: () => (CustomSnack({ onClose: props.closeSnackbar, type: 'green', data1: `Recollateralize for ${collateralAmount} ARTH:- processing` }))
                    }
                    props.enqueueSnackbar('timepass', options)
                  }}
                />
              </div>
            </div>
          </>
        }

      </CustomModal>
      <StabilizePageHeader
        mobile
        title="Stablize"
        subtitle="Earn MAHA and ARTH Share by Stablize the collateral in the protocol"
      />
      <Container size="lg">
        <Grid direction={'column'}>
          <Grid container sm={12}>
            <Grid item sm={12} style={{ marginTop: '5px', zIndex: 1 }}>
              {buyback ? buyBackContainer() : recollatateralizeConatiner()}
            </Grid>
            <Grid item sm={12} style={{ width: '100%', marginTop: -3 }}>
              {buyback ?
                <RightTopCard>
                  <RightTopCardHeader style={{}}>
                    Current Fee Rates
                </RightTopCardHeader>
                  <div style={{ marginBottom: '12px' }}>
                    <OneLineInput>
                      <div style={{ flex: 1 }}>
                        <TextForInfoTitle>
                          Stability Fee
                      <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                        </TextForInfoTitle>
                      </div>
                      <InputLabelSpanRight>0.1%</InputLabelSpanRight>
                    </OneLineInput>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <OneLineInput>
                      <div style={{ flex: 1 }}>
                        <TextForInfoTitle>
                          Trading Fee
                      <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                        </TextForInfoTitle>
                      </div>
                      <InputLabelSpanRight>0.1%</InputLabelSpanRight>
                    </OneLineInput>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <OneLineInput>
                      <div style={{ flex: 1 }}>
                        <TextForInfoTitle>ARTHX Price</TextForInfoTitle>
                      </div>
                      <InputLabelSpanRight>$7.55</InputLabelSpanRight>
                    </OneLineInput>
                  </div>
                </RightTopCard>
                :
                <RightTopCard>
                  <RightTopCardHeader>
                    Bonding Curve Discount on ARTHX
                </RightTopCardHeader>
                  <div style={{ marginBottom: '12px' }}>
                    <OneLineInput>
                      <div style={{ flex: 1 }}>
                        <TextForInfoTitle>Current Discount</TextForInfoTitle>
                      </div>
                      <InputLabelSpanRight>0.2%</InputLabelSpanRight>
                    </OneLineInput>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <OneLineInput>
                      <div style={{ flex: 1 }}>
                        <TextForInfoTitle>
                          1 day ago Discount
                      {/* <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} /> */}
                        </TextForInfoTitle>
                      </div>
                      <InputLabelSpanRight>5%</InputLabelSpanRight>
                    </OneLineInput>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <OneLineInput>
                      <div style={{ flex: 1 }}>
                        <TextForInfoTitle>
                          Estimated Discount 1 hour later
                      {/* <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} /> */}
                        </TextForInfoTitle>
                      </div>
                      <InputLabelSpanRight>5%</InputLabelSpanRight>
                    </OneLineInput>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <OneLineInput>
                      <div style={{ flex: 1 }}>
                        <TextForInfoTitle>
                          ARTHX Price
                      {/* <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} /> */}
                        </TextForInfoTitle>
                      </div>
                      <InputLabelSpanRight>$7.55</InputLabelSpanRight>
                    </OneLineInput>
                  </div>
                  <RightTopCardHeader style={{ marginTop: 20 }}>
                    Current Reward Rates
                </RightTopCardHeader>
                  <div style={{ marginBottom: '12px' }}>
                    <OneLineInput>
                      <div style={{ flex: 1 }}>
                        <TextForInfoTitle>
                          Bonus rate
                      <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                        </TextForInfoTitle>
                      </div>
                      <InputLabelSpanRight>0.2%</InputLabelSpanRight>
                    </OneLineInput>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <OneLineInput>
                      <div style={{ flex: 1 }}>
                        <TextForInfoTitle>
                          MAHA Reward
                      <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                        </TextForInfoTitle>
                      </div>
                      <InputLabelSpanRight>5%</InputLabelSpanRight>
                    </OneLineInput>
                  </div>
                </RightTopCard>
              }
            </Grid>
          </Grid>
          <Grid item sm={12} style={{ marginTop: '15px' }}>
            {!buyback ? buyBackContainer() : recollatateralizeConatiner()}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const TcContainer = styled.div`
  margin-top: 18px;
  margin-bottom: 15px;
`

const PrimaryText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.64);
  margin: 0px;
  flex: 1;
`

const ReYouReceiveContain = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 10px;
  margin: 10px 0px;
`

const HeaderTitle = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #FFFFFF;
  opacity: 0.88;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
`
const HeaderSubtitle = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.88);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  margin: 8px 0px 0px 0px
`


const BeforeHardChip = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: right;
  color: rgba(255, 255, 255, 0.88);

`

const HardChip = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 2px 8px;
  font-family: Inter;
  font-style: normal;
  color: rgba(255, 255, 255, 0.64);
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin-left: 10px;
  margin-right: 10px;
`

const OneLineInputwomargin = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
`


const LeftTopCard = styled.div`
  background: linear-gradient(180deg, #48423E 0%, #373030 100%);
  border-radius: 12px;
  padding: 5px 0px;
  min-height: 500px;
  align-items: center;
  justify-content: center;
`
const LeftTopCardChecked = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  padding: 5px 0px;
  min-height: 500px;
  align-items: center;
  justify-content: center;
`

const RightTopCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(21px);
  border-radius: 0px 0px 12px 12px;
  padding: 24px;
  width: 100%;
`
// const RightTopCard = styled.div`
//   background: rgba(255, 255, 255, 0.02);
//   // backdrop-filter: blur(21px);
//   border-radius: 0px 12px 12px 0px;
//   padding: 32px;
//   height: 560px;
// `

const RightTopCardHeader = styled.div`
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 24px;
color: #FFFFFF;
margin: 12px 0px;
`

const RightBottomCard = styled.div`
  margin-top: 24px;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(21px);
  border-radius: 12px;
  padding: 24px;
`

const RightBottomCardTitle = styled.div`
  padding: 0px;
  margin: 0px;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.88);

`

const LeftTopCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`
const LeftTopCardContainer = styled.div`
  padding: 12px 12px;
  // display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const LeftTopCardContainer2 = styled.div`
  padding: 12px 12px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 12px;
  width: 100px;
  height: 80px;
  z-index: 1;
  cursor: pointer;
`

const TabText = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.88);
`

const ActiveTab = styled.div`
  position: absolute;
  width: 100px;
  padding: 32px 12px;
  background: linear-gradient(180deg, rgba(244, 127, 87, 0) 0%, #FD565620);
  height: 80px;
  z-index: 0;
  border-bottom: 2px solid #FD5656;
`

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
`

const OneLineInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
`

const TextWithIcon = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  color: rgba(255, 255, 255, 0.88);
`

const TextForInfoTitle = styled.div`
font-family: Inter;
font-style: normal;
font-weight: 300;
font-size: 16px;
line-height: 150%;
color: rgba(255, 255, 255, 0.88);
opacity: 0.64;
`

const BeforeChip = styled.span`
  ont-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.64);
  margin-right: 5px;
`

const TagChips = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 2px 8px;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.64);
`

const InputLabelSpanRight = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.88);
  margin-right: 5px;
`



const LabelDiv = styled.div`
// background: rgba(255, 255, 255, 0.08);
// border-radius: 6px;
// padding: 6px 4px;
height: fit-content;
justify-content: space-between;
display: flex;
align-items: center;
// margin: 5px 0px 0px 0px;
`;

const LabelInfo = styled.div`
// background: rgba(255, 255, 255, 0.08);
// border-radius: 6px;
padding: 3px 4px;
height: fit-content;
// justify-content: space-between;
display: flex;
align-items: center;
font-family: Inter;
font-style: normal;
font-weight: 300;
font-size: 12px;
line-height: 130%;
color: rgba(255, 255, 255, 0.88);
`;

const LabelInfoData = styled.div`
// background: yellow;
padding: 3px 4px;
// height: fit-content;
width: fit-content;
justify-content: space-between;
display: flex;
flex-direction: row;
align-items: center;
font-family: Inter;
font-style: normal;
font-weight: 300;
font-size: 12px;
line-height: 130%;
color: rgba(255, 255, 255, 0.88);
`;

const LabelInfoDataChip = styled.div`
background: rgba(255, 255, 255, 0.08);
border-radius: 4px;
padding: 3px 4px;
height: fit-content;
// justify-content: space-between;
display: flex;
align-items: center;
font-family: Inter;
font-style: normal;
font-weight: 300;
font-size: 12px;
line-height: 130%;
margin: 0px 2px;
color: rgba(255, 255, 255, 0.64);
`;

const InfoDiv = styled.div`
background: rgba(255, 255, 255, 0.08);
border-radius: 6px;
padding: 6px 4px;
height: fit-content;
justify-content: space-between;
display: flex;
align-items: center;
`;

const InfoTitle = styled.div`
padding: 6px 4px;
height: fit-content;
display: flex;
align-items: center;
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
color: rgba(255, 255, 255, 0.88);
`;

const CurrencyTag = styled.div`
padding: 6px 4px;
width: 85px;
justify-content: space-around;
height: fit-content;
display: flex;
align-items: center;
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
color: rgba(255, 255, 255, 0.64);
`;

const CheckboxDiv = styled.div`
background: rgba(255, 255, 255, 0.08);
border-radius: 6px;
padding: 10px 5px 5px 15px;
display: flex;
justify-content: center;
align-items: center;
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
text-align: left;
color: rgba(255, 255, 255, 0.88);
margin: 15px 0px 0px 0px;
`;

const InfoSpan = styled.span`
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
color: rgba(255, 255, 255, 0.64);
// margin: 10px 30px;
text-align: center;
`;

const StakingDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0px 0px 0px;
`;


const InputLabel = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.64);
  margin: 0px;
`
const LabelSpan = styled.span`
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
color: rgba(255, 255, 255, 0.88);
text-align: left;
`

const LabelInfoDataChipText = styled.div`
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 150%;
letter-spacing: 0.08em;
text-transform: uppercase;
color: rgba(255, 255, 255, 0.64);
`;


const LabelInfoText = styled.div`
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
text-align: right;
color: rgba(255, 255, 255, 0.88);
`;

const TimeSpan = styled.div`
font-family: Inter;
font-style: normal;
font-weight: 300;
font-size: 12px;
line-height: 130%;
color: rgba(255, 255, 255, 0.88);
`;

const InternalSpan = styled.span`
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 150%;
letter-spacing: 0.08em;
text-transform: uppercase;
text-align: center;
display: flex;
align-items: center;
color: #FFFFFF;
min-width: 30%;
height: fit-content;
// padding: 10px
`

const InputNoDisplay = styled.span`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 2px 10px;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 0px 0px 8px;
`
export default withSnackbar(Boardrooms);
