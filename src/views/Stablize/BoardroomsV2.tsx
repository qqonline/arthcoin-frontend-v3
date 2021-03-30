import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import useBasisCash from '../../hooks/useBasisCash';
import Grid from '@material-ui/core/Grid';
import InfoIcon from '@material-ui/icons/Info';
import Button from '../../components/Button';
import Modal from './components/modal';
import arrowDown from '../../assets/svg/arrowDown.svg'
import plus from '../../assets/svg/plus.svg'
import InputContainer from './components/InputContainer';
import { Checkbox, CheckboxProps, createStyles, Divider, FormControlLabel, makeStyles, Slider, Theme, withStyles } from '@material-ui/core';
import TransparentInfoDiv from './components/InfoDiv';
import CheckIcon from '@material-ui/icons/Check';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import PageHeader from '../../components/PageHeader';
import MinorInputContainer from './components/MinorInputContainer';

const OrangeCheckBox = withStyles({
  root: {
    color: 'rgba(255, 255, 255, 0.32)',
    '&$checked': {
      color: '#FF7F57',
    },
  },
  checked: {
    color: 'white'
  },
})((props: CheckboxProps) => <Checkbox {...props} />);

const useSliderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      color: 'white'
    },
    margin: {
      height: theme.spacing(3),
    },
  }),
);


function valuetext(value: number) {
  return `${value}`;
}

// function valueLabelFormat(value: number) {
//   return marks.findIndex((mark: any) => mark.value === value) + 1;
// }

const PrettoRestrictSlider = withStyles({
  root: {
    color: 'white',
    height: 15,
    width: '95%'
  },
  thumb: {
    height: 10,
    width: 10,
    // backgroundColor: '#fff',
    border: '2px solid currentColor',
    color: '#FFA981',
    marginTop: -3.5,
    marginLeft: -3,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-100% - 5px)',
    color: '#FF7F57',
  },
  marked: {
    // background: 'red'
  },
  markLabel: {
    // color: 'green'
  },
  track: {
    height: 3,
    borderRadius: 3,
    color: '#FFA981'
    // top: '2%'
  },
  rail: {
    height: 3,
    borderRadius: 3,
    color: '#D74D26'
    // background:'red'
    // border: '1px solid'
  },
  markLabelActive: {
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: '12px',
    lineHeight: '130%',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.88)',
  },
  mark: {
    height: '3px',
    width: '3px',
    borderRadius: '50%',
    color: '#F7653B'
  },

})(Slider);

const Boardrooms: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));
  const basisCash = useBasisCash();
  const [collateralValue, setCollateralValue] = useState<number>(98.12)
  const [algorithmicValue, setAlgorithmicValue] = useState<number>(2.34)
  const [finalValue, setFinalValue] = useState<number>(100)
  const [type, setType] = useState<'Mint' | 'Redeem'>('Mint')
  const [openModal, setOpenModal] = useState<0 | 1 | 2>(0);
  const [checked, setChecked] = React.useState(false);
  const sliderClasses = useSliderStyles();
  const [sliderValue, setSliderValue] = React.useState(1);
  const [buyback, setBuyback] = useState<boolean>(true);
  const [recollatateralize, setRecollatateralize] = useState<boolean>(false);

  // const isLaunched = Date.now() >= config.boardroomLaunchesAt.getTime();
  if (!basisCash) return <div />;

  const mintTabContent = () => {
    return (
      <Grid container style={{ marginTop: '24px' }}>
        <Grid item lg={6} style={{ paddingRight: '24px' }}>
          <LeftTopCard>
            <LeftTopCardHeader>
              <ActiveTab></ActiveTab>
              <TabContainer>
                <TabText>Mint</TabText>
              </TabContainer>
              <TabContainer onClick={() => setType('Redeem')}>
                <TabText>Redeem</TabText>
              </TabContainer>
            </LeftTopCardHeader>
            <LeftTopCardContainer>
              <InputContainer
                ILabelValue={'Enter Collateral'}
                IBalanceValue={'Balance 500.00'}
                ILabelInfoValue={''}
                DefaultValue={'0.00'}
                LogoSymbol={'MAHA'}
                hasDropDown={true}
                SymbolText={'USDT'}
              />
              <PlusMinusArrow>
                <img src={plus} />
              </PlusMinusArrow>
              <InputContainer
                ILabelValue={'Enter ARTHX Share'}
                IBalanceValue={'Balance 500.00'}
                ILabelInfoValue={'How can i get it?'}
                DefaultValue={'0.00'}
                LogoSymbol={'MAHA'}
                hasDropDown={false}
                SymbolText={'ARTHX'}
              />
              <PlusMinusArrow>
                <img src={arrowDown} />
              </PlusMinusArrow>
              <InputContainer
                ILabelValue={'You will receive'}
                IBalanceValue={'Balance 500.00'}
                ILabelInfoValue={''}
                DefaultValue={'0.00'}
                LogoSymbol={'MAHA'}
                hasDropDown={false}
                SymbolText={'ARTH'}
              />
              <div style={{ marginTop: '24px' }}>
                <OneLineInput>
                  <div style={{ flex: 1 }}>
                    <TextWithIcon>
                      Trading Fee
                      <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                    </TextWithIcon>
                  </div>
                  <OneLineInput>
                    <BeforeChip>1.08</BeforeChip>
                    <TagChips>ARTH/ETH</TagChips>
                  </OneLineInput>
                </OneLineInput>
                <Button text={'Confirm Mint'} size={'lg'} variant={'default'} disabled={false} onClick={() => setOpenModal(1)}/>
              </div>
            </LeftTopCardContainer>
          </LeftTopCard>
        </Grid>
        <Grid item lg={5} style={{ paddingRight: '24px' }}>
          <RightTopCard>
            <div style={{ marginBottom: '12px' }}>
              <OneLineInput>
                <div style={{ flex: 1 }}>
                  <TextForInfoTitle>ARTHX Price</TextForInfoTitle>
                </div>
                <InputLabelSpanRight>$5.4</InputLabelSpanRight>
              </OneLineInput>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <OneLineInput>
                <div style={{ flex: 1 }}>
                  <TextForInfoTitle>
                    Collateral Ratio
                    <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                  </TextForInfoTitle>
                </div>
                <InputLabelSpanRight>86%</InputLabelSpanRight>
              </OneLineInput>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <OneLineInput>
                <div style={{ flex: 1 }}>
                  <TextForInfoTitle>
                    Pool Balance
                  </TextForInfoTitle>
                </div>
                <InputLabelSpanRight>154.6M</InputLabelSpanRight>
              </OneLineInput>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <OneLineInput>
                <div style={{ flex: 1 }}>
                  <TextForInfoTitle>
                    Avaiable to Mint
                  </TextForInfoTitle>
                </div>
                <InputLabelSpanRight>$54.7M</InputLabelSpanRight>
              </OneLineInput>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <OneLineInput>
                <div style={{ flex: 1 }}>
                  <TextForInfoTitle>
                    Stability Fee
                    <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                  </TextForInfoTitle>
                </div>
                <InputLabelSpanRight>2%</InputLabelSpanRight>
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
                <InputLabelSpanRight>2%</InputLabelSpanRight>
              </OneLineInput>
            </div>
          </RightTopCard>
          <RightBottomCard>
            <RightBottomCardTitle>
              Farming pools are greate way to earn higher APY by staking your $ARTH
            </RightBottomCardTitle>
            <Grid container style={{ marginTop: '16px' }}>
              <Grid item lg={4}>
                <Button text={'Earn Rewards'} size={'sm'} />
              </Grid>
            </Grid>
          </RightBottomCard>
        </Grid>
      </Grid>
    )
  };

  const handleCheck = (event: any) => {
    // console.log('check trig', event.target.checked)
    setChecked(event.target.checked);
  };
  const handleSliderChange = (event: any, value: any) => {
    console.log('check trig', value)
    setSliderValue(value);
  };
  const redeemTabContent = () => {
    return (
      <Grid container style={{ marginTop: '24px' }}>
        <Grid item lg={6} style={{ paddingRight: '24px' }}>
          <LeftTopCard>
            <LeftTopCardHeader>
              <TabContainer onClick={() => setType('Mint')}>
                <TabText>Mint</TabText>
              </TabContainer>
              <TabContainer>
                <ActiveTab></ActiveTab>
                <TabText>Redeem</TabText>
              </TabContainer>
            </LeftTopCardHeader>
            <LeftTopCardContainer>
              <InputContainer
                ILabelValue={'Enter Redeem Amount'}
                IBalanceValue={'Balance 500.00'}
                ILabelInfoValue={''}
                DefaultValue={'0.00'}
                LogoSymbol={'MAHA'}
                hasDropDown={false}
                SymbolText={'ARTH'}
              />
              <PlusMinusArrow>
                <img src={arrowDown} />
              </PlusMinusArrow>
              <InputContainer
                ILabelValue={'You receive'}
                IBalanceValue={'Balance 500.00'}
                ILabelInfoValue={'How can i get it?'}
                DefaultValue={'0.00'}
                LogoSymbol={'MAHA'}
                hasDropDown={true}
                SymbolText={'USDT'}
              />
              <PlusMinusArrow>
                <img src={plus} />
              </PlusMinusArrow>
              <InputContainer
                ILabelValue={'You receive'}
                IBalanceValue={'Balance 500.00'}
                ILabelInfoValue={''}
                DefaultValue={'0.00'}
                LogoSymbol={'MAHA'}
                hasDropDown={false}
                SymbolText={'ARTHX'}
              />
              <div style={{ marginTop: '24px' }}>
                <OneLineInput>
                  <div style={{ flex: 1 }}>
                    <TextWithIcon>
                      Trading Fee
                      <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                    </TextWithIcon>
                  </div>
                  <OneLineInput>
                    <BeforeChip>0.05</BeforeChip>
                    <TagChips>USDT</TagChips>
                  </OneLineInput>
                </OneLineInput>
                <OneLineInput>
                  <div style={{ flex: 1 }}>
                    <TextWithIcon>
                      Stability Fee
                      <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                    </TextWithIcon>
                  </div>
                  <OneLineInput>
                    <BeforeChip>0.05</BeforeChip>
                    <TagChips>MAHA</TagChips>
                  </OneLineInput>
                </OneLineInput>
                <Button text={'Redeem'} size={'lg'} onClick={() => setOpenModal(1)} />
              </div>
            </LeftTopCardContainer>
          </LeftTopCard>
        </Grid>
        <Grid item lg={5} style={{ paddingRight: '24px' }}>
          <RightTopCard>
            <div style={{ marginBottom: '12px' }}>
              <OneLineInput>
                <div style={{ flex: 1 }}>
                  <TextForInfoTitle>ARTHX Price</TextForInfoTitle>
                </div>
                <InputLabelSpanRight>$5.4</InputLabelSpanRight>
              </OneLineInput>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <OneLineInput>
                <div style={{ flex: 1 }}>
                  <TextForInfoTitle>
                    Collateral Ratio
                    <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                  </TextForInfoTitle>
                </div>
                <InputLabelSpanRight>86%</InputLabelSpanRight>
              </OneLineInput>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <OneLineInput>
                <div style={{ flex: 1 }}>
                  <TextForInfoTitle>
                    Pool Balance
                  </TextForInfoTitle>
                </div>
                <InputLabelSpanRight>154.6M</InputLabelSpanRight>
              </OneLineInput>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <OneLineInput>
                <div style={{ flex: 1 }}>
                  <TextForInfoTitle>
                    Avaiable to Mint
                  </TextForInfoTitle>
                </div>
                <InputLabelSpanRight>$54.7M</InputLabelSpanRight>
              </OneLineInput>
            </div>
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
          </RightTopCard>
          <RightBottomCard>
            <RightBottomCardTitle>
              Farming pools are greate way to earn higher APY by staking your $ARTH
            </RightBottomCardTitle>
            <Grid container style={{ marginTop: '16px' }}>
              <Grid item lg={4}>
                <Button text={'Earn Rewards'} size={'sm'} />
              </Grid>
            </Grid>
          </RightBottomCard>
        </Grid>
      </Grid>
    )
  };

  const buyBackContainer = () => {
    return (
      <LeftTopCard>
        <LeftTopCardHeader>
          <HeaderTitle>
            Buyback
            <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
          </HeaderTitle>
          {buyback? <HeaderSubtitle>
            342.450K <HardChip>USDT</HardChip> <TextForInfoTitle>available in protocol</TextForInfoTitle>
          </HeaderSubtitle>:
            <HeaderSubtitle>
              <TextForInfoTitle>Buy is not needed for now</TextForInfoTitle>
            </HeaderSubtitle>}
        </LeftTopCardHeader>
        {buyback? <LeftTopCardContainer>
          <InputContainer
            ILabelValue={'Enter Redeem Amount'}
            IBalanceValue={'Balance 500.00'}
            ILabelInfoValue={''}
            DefaultValue={'0.00'}
            LogoSymbol={'MAHA'}
            hasDropDown={false}
            SymbolText={'ARTH'}
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
          <div style={{ marginTop: '24px' }}>
            <OneLineInputwomargin style={{ marginBottom: '-14px' }}>
              <div style={{ flex: 1 }}>
                <TextWithIcon>
                  Trading Fee
                  <InfoIcon fontSize='default' style={{ transform: 'scale(0.6)' }} />
                </TextWithIcon>
              </div>
              <OneLineInput>
                <BeforeChip>0.05</BeforeChip>
                <TagChips>USDT</TagChips>
              </OneLineInput>
            </OneLineInputwomargin>
            <OneLineInputwomargin>
              <div style={{ flex: 1 }}>
                <TextWithIcon>
                  Stability Fee
                  <InfoIcon fontSize='default' style={{ transform: 'scale(0.6)' }} />
                </TextWithIcon>
              </div>
              <OneLineInput>
                <BeforeChip>0.05</BeforeChip>
                <TagChips>MAHA</TagChips>
              </OneLineInput>
            </OneLineInputwomargin>
            <Button text={'Buyback'} size={'lg'} onClick={() => {
              setBuyback(false)
              setRecollatateralize(true)
            }} />
          </div>
        </LeftTopCardContainer>:
          <LeftTopCardContainer>

          </LeftTopCardContainer>
        }
      </LeftTopCard>
    )
  }

  const recollatateralizeConatiner = () => {
    return (
      <LeftTopCard>
        <LeftTopCardHeader>
          <HeaderTitle>
            Recollatateralize
            <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
          </HeaderTitle>
          {recollatateralize?
            <HeaderSubtitle>
              342.450K <HardChip>USDT</HardChip> <TextForInfoTitle>Amount required</TextForInfoTitle>
            </HeaderSubtitle>:
            <HeaderSubtitle>
            <TextForInfoTitle>The Protocol is currently collateralised</TextForInfoTitle>
          </HeaderSubtitle>}
        </LeftTopCardHeader>
        {recollatateralize? <LeftTopCardContainer>
          <InputContainer
            ILabelValue={'Enter collateral'}
            IBalanceValue={'Balance 500.00'}
            ILabelInfoValue={''}
            DefaultValue={'0.00'}
            LogoSymbol={'MAHA'}
            hasDropDown={false}
            SymbolText={'ARTH'}
          />
          <PlusMinusArrow>
            <img src={arrowDown} />
          </PlusMinusArrow>
          <PrimaryText>You receive</PrimaryText>
          <ReYouReceiveContain>
            <OneLineInputwomargin style={{ marginBottom: '2px' }}>
              <PrimaryText>ARTH Share</PrimaryText>
              <OneLineInputwomargin>
                <BeforeHardChip>1.08</BeforeHardChip>
                <HardChip>ARTHX</HardChip>
              </OneLineInputwomargin>
            </OneLineInputwomargin>
            <OneLineInputwomargin>
              <PrimaryText>ARTH Share</PrimaryText>
              <OneLineInputwomargin>
                <BeforeHardChip>1.08</BeforeHardChip>
                <HardChip>ARTHX</HardChip>
              </OneLineInputwomargin>
            </OneLineInputwomargin>
          </ReYouReceiveContain>
          <div style={{ marginTop: '24px' }}>
            <OneLineInputwomargin>
              <div style={{ flex: 1 }}>
                <TextWithIcon>
                  Bonus
                  <InfoIcon fontSize='default' style={{ transform: 'scale(0.6)' }} />
                </TextWithIcon>
              </div>
              <OneLineInput>
                <BeforeChip>1.06</BeforeChip>
                <TagChips>ARTHX</TagChips>
              </OneLineInput>
            </OneLineInputwomargin>
            <Button text={'Recollatateralize'} size={'lg'} onClick={() => {
              setBuyback(true)
              setRecollatateralize(false)
            }} />
          </div>
        </LeftTopCardContainer>: null}
      </LeftTopCard>
    )
  }

  return (
    <>
      <Modal
        open={openModal === 1}
        modalTitleStyle={{
          color: 'rgba(255, 255, 255, 0.88)',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}
        modalContainerStyle={{
          width: '600px',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        modalBodyStyle={{
          background: 'linear-gradient(180deg, #48423E 0%, #373030 100%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '24px 32px'
        }}
        title={`Confirm ${type} ARTH`}
      >
        {
          type === 'Mint' ?
            <>
              <TransparentInfoDiv
                labelData={`Your collateral supply`}
                rightLabelUnit={'USDT'}
                rightLabelValue={'1500.00'}
              />

              <TransparentInfoDiv
                labelData={`Your share supply`}
                // labelToolTipData={'testing'}
                rightLabelUnit={'ARTHX'}
                rightLabelValue={'1000.00'}
              />


              <TransparentInfoDiv
                labelData={`Trading Fee`}
                labelToolTipData={'testing'}
                rightLabelUnit={'USDT'}
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
                labelData={`You receive`}
                // labelToolTipData={'testing'}
                rightLabelUnit={'ARTH'}
                rightLabelValue={'1000.00'}
              />

              {/* <TransparentInfoDiv
                labelData={`You will receive share`}
                // labelToolTipData={'testing'}
                rightLabelUnit={'ARTHX'}
                rightLabelValue={'1000.00'}
              /> */}
              <CheckboxDiv>
                <FormControlLabel
                  value=""
                  checked={checked}
                  control={
                    <OrangeCheckBox
                      icon={<CheckBoxOutlineBlankIcon fontSize={'inherit'} />}
                      checkedIcon={
                        <CheckIcon
                          style={{
                            background: '#FF7F57',
                            color: 'white',
                            borderRadius: '6px'
                          }}
                          fontSize={'inherit'}
                        />
                      }
                      size={'medium'}
                    />
                  }
                  label="Deposit $ARTH in staking pool to earn reward APY"
                  labelPlacement="end"
                  onChange={handleCheck}
                />
              </CheckboxDiv>
              {checked &&
                <StakingDiv>
                  <div>
                    <OneLineInput>
                      <div>
                        <InputLabel>Select how long would you like to stake</InputLabel>
                      </div>
                      <InputNoDisplay>
                        <InternalSpan>
                          1 year
                        </InternalSpan>
                      </InputNoDisplay>
                    </OneLineInput>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: 'white',
                      flexDirection: 'row',
                      width: '100%',
                      paddingLeft: '16px',
                      // marginTop: '10px'
                    }}
                  >
                    <div className={sliderClasses.root}>
                      <PrettoRestrictSlider
                        // defaultValue={sliderValue ?? 1}
                        // onChange={handleSliderChange}
                        // // valueLabelFormat={valueLabelFormat}
                        // getAriaValueText={valuetext}
                        // aria-labelledby="discrete-slider-small-steps"
                        // step={1}
                        // min={1}
                        // max={36}
                        // valueLabelDisplay="on"
                        // // marks={marks}
                        // ValueLabelComponent={"strong"}
                        defaultValue={1}
                        getAriaValueText={valuetext}
                        valueLabelFormat={valuetext}
                        // ValueLabelComponent={'span'}
                        // value={sliderValue}
                        aria-labelledby="discrete-slider"
                        step={1}
                        marks
                        min={1}
                        max={36}
                        valueLabelDisplay="auto"
                      />
                      <div style={{ marginTop: -15, marginLeft: -15, marginBottom: 15, display: 'flex', justifyContent: 'space-between' }}>
                        <TimeSpan>1 month</TimeSpan>
                        <TimeSpan>3 Years</TimeSpan>
                      </div>
                    </div>

                  </div>
                  <TransparentInfoDiv
                    labelData={`Estimated earning`}
                    // labelToolTipData={'testing'}
                    rightLabelUnit={'MAHA'}
                    rightLabelValue={'1000.00'}
                  />

                  <TransparentInfoDiv
                    labelData={`ROR`}
                    // labelToolTipData={'testing'}
                    // rightLabelUnit={''}
                    rightLabelValue={'88%'}
                  />

                  <TransparentInfoDiv
                    labelData={`APY`}
                    // labelToolTipData={'testing'}
                    // rightLabelUnit={'MAHA'}
                    rightLabelValue={'66%'}
                  />
                </StakingDiv>
              }
              <div style={{
                flexDirection: 'row',
                display: 'flex',
                width: '100%',
                marginTop: '10%',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8
              }}
              >
                <div style={{ flex: 1, width: '50%', marginRight: 10 }}>
                  <Button
                    variant={'transparent'}
                    text="Cancel"
                    size={'lg'}
                    onClick={() => setOpenModal(0)}
                  // onClick={handleClose}
                  />
                </div>
                <div style={{ width: '50%', marginLeft: 10 }}>
                  <Button
                    text={'Confirm Mint'}
                    // textStyles={{ color: '#F5F5F5' }}
                    size={'lg'}
                    onClick={() => {
                      setOpenModal(2)
                    }}
                  />
                </div>
              </div>
            </> :
            <>
              <TransparentInfoDiv
                labelData={`Your ${type.toLocaleLowerCase()} amount`}
                rightLabelUnit={'ARTH'}
                rightLabelValue={'1500.00'}
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
                labelData={`You will receive collateral`}
                // labelToolTipData={'testing'}
                rightLabelUnit={'USDT'}
                rightLabelValue={'1000.00'}
              />

              <TransparentInfoDiv
                labelData={`You will receive share`}
                // labelToolTipData={'testing'}
                rightLabelUnit={'ARTHX'}
                rightLabelValue={'1000.00'}
              />

              <div style={{
                flexDirection: 'row',
                display: 'flex',
                width: '100%',
                marginTop: '10%',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8
              }}
              >
                <div style={{ flex: 1, width: '50%', marginRight: 10 }}>
                  <Button
                    variant={'transparent'}
                    text="Cancel"
                    size={'lg'}
                    onClick={() => setOpenModal(0)}
                  // onClick={handleClose}
                  />
                </div>
                <div style={{ width: '50%', marginLeft: 10 }}>
                  <Button
                    text={'Redeem ARTH'}
                    // textStyles={{ color: '#F5F5F5' }}
                    size={'lg'}
                    onClick={() => {
                      // setType('Redeem')
                      setOpenModal(0)
                    }}
                  />
                </div>
              </div>
            </>
        }
      </Modal>
      <PageHeader

        title="Stablize"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
      <Container size="lg">
        <Grid container spacing={2}>
          <Grid item lg={4} >
            {buyBackContainer()}
          </Grid>
          <Grid item lg={4} >
            {recollatateralizeConatiner()}
          </Grid>
          <Grid item lg={4}>
            <RightTopCard>
              <div style={{ marginBottom: '12px' }}>
                <OneLineInput>
                  <div style={{ flex: 1 }}>
                    <TextForInfoTitle>ARTHX Price</TextForInfoTitle>
                  </div>
                  <InputLabelSpanRight>$7.55</InputLabelSpanRight>
                </OneLineInput>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <OneLineInput>
                  <div style={{ flex: 1 }}>
                    <TextForInfoTitle>
                      Collateral Ratio
                      <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                    </TextForInfoTitle>
                  </div>
                  <InputLabelSpanRight>86%</InputLabelSpanRight>
                </OneLineInput>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <OneLineInput>
                  <div style={{ flex: 1 }}>
                    <TextForInfoTitle>
                      Bonus Rate
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
                      MAHA reward
                      <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                    </TextForInfoTitle>
                  </div>
                  <InputLabelSpanRight>5%</InputLabelSpanRight>
                </OneLineInput>
              </div>
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
            </RightTopCard>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const PrimaryText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.64);
  margin: 0px;
  flex: 1;
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

const ReYouReceiveContain = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 10px;
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

const StyledTableHeaderTextCenter = styled.h6`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[600]};
  margin: 10px 30px;
  text-align: center;
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

const LeftTopCard = styled.div`
  background: linear-gradient(180deg, #48423E 0%, #373030 100%);
  border-radius: 12px;
`

const RightTopCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(21px);
  border-radius: 12px;
  padding: 32px;
`

const RightBottomCard = styled.div`
  margin-top: 24px;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(21px);
  border-radius: 12px;
  padding: 32px;
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
  padding: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`
const LeftTopCardContainer = styled.div`
  padding: 24px 32px;

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
const StakingDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0px 0px 0px;
`;

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
  margin: 15px 0px 0px 0px;
`

const OneLineInputwomargin = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
s`

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
  color: #FFFFFF;
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

const InputLabel = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.64);
  margin: 0px;
`
const StyledTableHeaderTextRight = styled.h6`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[600]};
  margin: 10px 10px;
`;

const InternalSpan = styled.span`
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 150%;
letter-spacing: 0.08em;
text-transform: uppercase;
color: #FFFFFF;
`

const InputNoDisplay = styled.span`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 2px 10px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 0px 0px 8px;
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

const InfoDiv = styled.div`
background: rgba(255, 255, 255, 0.08);
border-radius: 6px;
padding: 6px 4px;
height: fit-content;
justify-content: space-between;
display: flex;
align-items: center;
`;

// const TransparentInfoDiv = styled.div`
// // background: rgba(255, 255, 255, 0.08);
// // border-radius: 6px;
// // padding: 6px 4px;
// height: fit-content;
// justify-content: space-between;
// display: flex;
// align-items: center;
// `;

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

const CheckboxDiv = styled.div`
background: rgba(255, 255, 255, 0.08);
border-radius: 6px;
padding: 5px 0px 0px 0px;
display: flex;
justify-content: center;
align-items: center;
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
text-align: center;
color: rgba(255, 255, 255, 0.88);
margin: 15px 0px 0px 0px;
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
export default Boardrooms;
