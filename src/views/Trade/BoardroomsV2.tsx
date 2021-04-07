import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import useBasisCash from '../../hooks/useBasisCash';
import Grid from '@material-ui/core/Grid';
import InfoIcon from '@material-ui/icons/Info';
import Button from '../../components/Button';
import Modal from './components/modal';
import arrowDown from '../../assets/svg/arrowDown.svg'
import uniswapLogo from '../../assets/svg/uniswapLogo.svg'
import shushiswap from '../../assets/svg/sushiswapLogo.svg'
import plus from '../../assets/svg/plus.svg'
import InputContainer from './components/InputContainer';
import { Checkbox, CheckboxProps, createStyles, Divider, FormControlLabel, makeStyles, Slider, Theme, withStyles } from '@material-ui/core';
import TransparentInfoDiv from './components/InfoDiv';
import CheckIcon from '@material-ui/icons/Check';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Tooltip from '@material-ui/core/Tooltip';
import theme from '../../theme';
import HtmlTooltip from '../../components/HtmlTooltip';
import CustomInputContainer from '../../components/CustomInputContainer';
import CustomModal from '../../components/CustomModal';

// const HtmlTooltip = withStyles((theme1: Theme) => ({
//   tooltip: {
//     backgroundColor: theme.color.dark[200],
//     color: 'white',
//     fontWeight: 300,
//     fontSize: '13px',
//     borderRadius: '6px',
//     padding: '20px',
//   },
// }))(Tooltip);

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
      // color: 'white'
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
    // color: 'white',
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
    // color: '#FF7F57',
  },
  marked: {
    color: 'red'
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
    // height: '3px',
    // width: '3px',
    // borderRadius: '50%',
    color: 'transparent'
  },

})(Slider);
const DEFAULT_CALC = 1440;

// const HtmlTooltip = withStyles((theme) => ({
//   tooltip: {
//     backgroundColor: '#f5f5f9',
//     color: 'rgba(0, 0, 0, 0.87)',
//     maxWidth: 220,
//     fontSize: theme.typography.pxToRem(12),
//     border: '1px solid #dadde9',
//   },
// }))(Tooltip);



const Boardrooms: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  const basisCash = useBasisCash();
  const [mintColl, setCollateralValue] = useState<number>(0.00)
  const [mintArthxShare, setArthxShare] = useState<number>(0.00)
  const [balance, setBalance] = useState<number>(0)
  const [mintReceive, setReceive] = useState<number>(0)
  const [redeemAmount, setRedeemAmount] = useState<number>(0)
  const [finalValue, setFinalValue] = useState<number>(100)
  const [calcDuration, setDuration] = useState<number>(DEFAULT_CALC)
  const [currentCounter, setCurrentCounter] = useState<number>(1000)
  const [type, setType] = useState<'Buy' | 'Sell'>('Buy')
  const [openModal, setOpenModal] = useState<0 | 1 | 2>(0);
  const [checked, setChecked] = React.useState(false);
  const sliderClasses = useSliderStyles();
  const [sliderValue, setSliderValue] = React.useState(1);
  const [selectedSwap, setSelectedSwap] = useState<'Uniswap' | 'Sushiswap'>('Uniswap');
  const [selectedAmountCoin, setSelectedAmountCoin] = useState<string>('ETH')
  const [dropDownValues, setDropDownValues] = useState<string[]>([]);
  const defaultDropdownValues = ['MAHA', 'ARTH', 'USDT', 'USDC', 'ETH', 'WBTC'];
  let arr: string[];
  useEffect(() => {
    arr = defaultDropdownValues.filter(e => e !== selectedAmountCoin);
    setDropDownValues(arr);
  }, [selectedAmountCoin])

  // const isLaunched = Date.now() >= config.boardroomLaunchesAt.getTime();
  if (!basisCash) return <div />;



  const buyTabContent = () => {
    return (
      <Grid container style={{ marginTop: '24px' }}>
        <Grid item lg={3} sm={'auto'}></Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <LeftTopCard>
            <LeftTopCardHeader>
              <TabContainer>
                <ActiveTab></ActiveTab>
                <TabText>Buy</TabText>
              </TabContainer>
              <TabContainer onClick={() => setType("Sell")}>
                <TabText>Sell</TabText>
              </TabContainer>
            </LeftTopCardHeader>
            <LeftTopCardContainer>
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
                      <TextWithIcon>
                        Liquidity on Uniswap
                      </TextWithIcon>
                    </div>
                    <OneLineInputwomargin>
                      <BeforeChip>$ 9,760,068</BeforeChip>
                    </OneLineInputwomargin>
                  </OneLineInputwomargin>
                  <OneLineInputwomargin style={{marginTop: "10px"}}>
                    <div style={{ flex: 1 }}>
                      <TextWithIcon>
                        Price
                      </TextWithIcon>
                    </div>
                    <OneLineInputwomargin>
                      <BeforeChip>0.05</BeforeChip>
                      <TagChips>ARTH</TagChips>
                      <BeforeChip>per</BeforeChip>
                      <TagChips>ETH</TagChips>
                    </OneLineInputwomargin>
                  </OneLineInputwomargin>
                </TcContainer>
                <Button text={'Buy'} size={'lg'} variant={'default'} disabled={false} onClick={() => setOpenModal(1)} />
              </div>
            </LeftTopCardContainer>
          </LeftTopCard>
        </Grid>
        <Grid item lg={3} sm={'auto'}></Grid>
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
    setDuration(DEFAULT_CALC - value * value)
  };
  const sellTabContent = () => {
    return (
      <Grid container style={{ marginTop: '24px' }}>
        <Grid item lg={3} sm={'auto'}></Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <LeftTopCard>
            <LeftTopCardHeader>
              <TabContainer onClick={() => setType("Buy")}>
                <TabText>Buy</TabText>
              </TabContainer>
              <TabContainer>
                <ActiveTab></ActiveTab>
                <TabText>Sell</TabText>
              </TabContainer>
            </LeftTopCardHeader>
            <LeftTopCardContainer>
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
                      <TextWithIcon>
                        Liquidity on Uniswap
                      </TextWithIcon>
                    </div>
                    <OneLineInputwomargin>
                      <BeforeChip>$ 9,760,068</BeforeChip>
                    </OneLineInputwomargin>
                  </OneLineInputwomargin>
                  <OneLineInputwomargin style={{marginTop: "10px"}}>
                    <div style={{ flex: 1 }}>
                      <TextWithIcon>
                        Price
                      </TextWithIcon>
                    </div>
                    <OneLineInputwomargin>
                      <BeforeChip>0.05</BeforeChip>
                      <TagChips>ARTH</TagChips>
                      <BeforeChip>per</BeforeChip>
                      <TagChips>ETH</TagChips>
                    </OneLineInputwomargin>
                  </OneLineInputwomargin>
                  <OneLineInputwomargin style={{marginTop: "10px"}}>
                    <div style={{ flex: 1 }}>
                      <TextWithIcon>
                        Trading fee
                        <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
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
        title={`Confirm ${type}`}
      >
        {
          type === "Buy" ?
            <>
              <TransparentInfoDiv
                labelData={`Your collateral supply`}
                rightLabelUnit={'ETH'}
                rightLabelValue={mintColl.toString()}
              />
{/*
              <TransparentInfoDiv
                labelData={`Your share supply`}
                // labelToolTipData={'testing'}
                rightLabelUnit={'ARTHX'}
                rightLabelValue={mintArthxShare.toString()}
              />


              <TransparentInfoDiv
                labelData={`Trading Fee`}
                labelToolTipData={'testing'}
                rightLabelUnit={'USDT'}
                rightLabelValue={'0.05'}
              />*/}


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
                    text={'Confirm Buy'}
                    // textStyles={{ color: '#F5F5F5' }}
                    size={'lg'}
                    onClick={() => {
                      setOpenModal(0)
                      setType('Sell')
                    }}
                  />
                </div>
              </div>
            </> :
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
                  margin: '15px 0px'
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
                    text={'Confirm Sell'}
                    // textStyles={{ color: '#F5F5F5' }}
                    size={'lg'}
                    onClick={() => {
                      setOpenModal(0)
                    }}
                  />
                </div>
              </div>
            </>
        }
      </CustomModal>
      <Container size="lg">
        <div>
          <PageHeading>
            TRADE
          </PageHeading>
          <PageSubHeading>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </PageSubHeading>
        </div>
        <Grid container>
          <Grid item lg={3}></Grid>
          <Grid item lg={6} md={12} sm={12} xs={12} >
            <RadioSelectionConatiner>
              <RadioSubConatiner onClick={() => {
                if(selectedSwap === 'Sushiswap'){
                  setSelectedSwap('Uniswap')
                }
              }}>
                {selectedSwap === 'Uniswap' && <ActiveRadio />}
                <RadioText>
                  <RadioLogo>
                    <img src={uniswapLogo} style={{marginTop: '-6px'}}/>
                  </RadioLogo>
                  Uniswap
                </RadioText>
              </RadioSubConatiner>
              <RadioSubConatiner onClick={() => {
                if(selectedSwap === 'Uniswap'){
                  setSelectedSwap('Sushiswap')
                }
              }}>
                {selectedSwap === 'Sushiswap' && <ActiveRadio />}
                <RadioText>
                  <RadioLogo>
                    <img src={shushiswap}/>
                  </RadioLogo>
                  Sushiswap
                </RadioText>
              </RadioSubConatiner>
            </RadioSelectionConatiner>
          </Grid>
          <Grid item lg={3}></Grid>
        </Grid>
        {type === "Buy" && buyTabContent()}
        {type === "Sell" && sellTabContent()}
      </Container>
    </>
  );
}

const PageHeading = styled.p`
  font-family: Syne;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-align: center;
  color: #FFFFFF;
  margin-top: 40px;
`

const PageSubHeading = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: rgba(255, 255, 255, 0.64);
  text-align: center;
  margin-bottom: 40px;

`

const RadioSelectionConatiner = styled.div`
  background: #2A2827;
  border-radius: 8px;
  padding: 6px;
  display: flex;
  flex-direction: row;
`
const RadioSubConatiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  z-index: 1;
  cursor: pointer;
  flex: 0.5;
  position: relative;
`

const RadioText = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.88);
  z-index: 1;
`

const RadioLogo = styled.span`
  margin-left: 5px;
  margin-right: 5px;
`

const ActiveRadio = styled.div`
  position: absolute;
  width: 100%;
  height: 40px;
  background: #423B38;
  border-radius: 4px;
  z-index: 0;
`


const ToolTipFont = styled.p`
  padding: 0px;
  margin: 0px;
`

const TcContainer = styled.div`
  margin-top: 18px;
  margin-bottom: 18px;
`

const OneLineInputwomargin = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
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
  display: flex;
  flex-direction: row;
  padding-right: 32px;
  padding-left: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  @media (max-width: 600px) {
    padding-right: 16px;
    padding-left: 16px;
  }
`
const LeftTopCardContainer = styled.div`
  padding: 24px 32px;
  @media (max-width: 600px) {
    padding: 12px 16px;
  }

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
  flex: 0.5;
  position: relative;
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
  width: 100%;
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
  margin: 5px 0px 10px 0px;
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
