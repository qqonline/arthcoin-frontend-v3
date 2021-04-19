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
import warning from '../../assets/svg/warning.svg'
import InputContainer from './components/InputContainer';
import { Checkbox, CheckboxProps, createStyles, Divider, FormControlLabel, IconButton, LinearProgress, makeStyles, Slider, Snackbar, Theme, withStyles } from '@material-ui/core';
import TransparentInfoDiv from './components/InfoDiv';
import CheckIcon from '@material-ui/icons/Check';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Tooltip from '@material-ui/core/Tooltip';
import theme from '../../theme';
import HtmlTooltip from '../../components/HtmlTooltip';
import CustomInputContainer from '../../components/CustomInputContainer';
import CustomModal from '../../components/CustomModal';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { CustomSnack } from '../../components/SnackBar';
import CloseIcon from '../../assets/img/CloseIcon.svg';
import CustomSuccessModal from '../../components/CustomSuccesModal';
import BondingDiscount from '../Genesis/components/BondingDiscount';
import UnderstandMore from './components/UnderstandMore';
import PageHeader from '../../components/PageHeader';
import { useMediaQuery } from 'react-responsive';
import { KeyboardArrowRight } from '@material-ui/icons';


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

const bondingDiscount = [
  {
    label: 'Current discount',
    value: '0.2%',
  },
  {
    label: '1 day ago discount',
    value: '5%',
  },
  {
    label: 'Estimated discount 1 hour later',
    value: '~5%',
  },
  {
    label: 'ARTHX Price',
    value: '$7.55',
  }
]


const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
      width: 200
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#F7653B',
    },
  }),
)(LinearProgress);

const Boardrooms = (props: WithSnackbarProps) => {
  useEffect(() => window.scrollTo(0, 0), []);
  const basisCash = useBasisCash();
  const colletralRatio = 86;
  const [mintColl, setCollateralValue] = useState<number>(0.00)
  const [mintArthxShare, setArthxShare] = useState<number>(0.00)
  const [balance, setBalance] = useState<number>(0)
  const [mintReceive, setReceive] = useState<number>(0)
  const [redeemAmount, setRedeemAmount] = useState<number>(0)
  const [finalValue, setFinalValue] = useState<number>(100)
  const [calcDuration, setDuration] = useState<number>(DEFAULT_CALC)
  const [currentCounter, setCurrentCounter] = useState<number>(1000)
  const [type, setType] = useState<'Commit' | 'Swap'>('Commit')
  const [openModal, setOpenModal] = useState<0 | 1 | 2>(0);
  const [checked, setChecked] = React.useState(false);
  const [testnetDiv, showDiv] = React.useState(true);
  const sliderClasses = useSliderStyles();
  const [sliderValue, setSliderValue] = React.useState(1);
  const [successModal, setSuccessModal] = useState<boolean>(false)
  const isMobile = useMediaQuery({ 'maxWidth': '600px' })
  const [selectedCollateralCoin, setSelectedCollateralCoin] = useState<string>('USDT')
  const [CollateraldropDownValues, setCollateralDropDownValues] = useState<string[]>([]);
  const defaultCollateralDropdownValues = ['MAHA', 'ARTH', 'USDT', 'USDC', 'ETH', 'WBTC'];
  let arr: string[];
  useEffect(() => {
    arr = defaultCollateralDropdownValues.filter(e => e !== selectedCollateralCoin);
    setCollateralDropDownValues(arr);
  }, [selectedCollateralCoin])

  const [selectedReceiveRedeemCoin, setSelectedReceiveRedeemCoin] = useState<string>('USDT')
  const [ReceiveRedeemdropDownValues, setReceiveRedeemDropDownValues] = useState<string[]>([]);
  const defaultReceiveRedeemDropdownValues = ['MAHA', 'ARTH', 'USDT', 'USDC', 'ETH', 'WBTC'];
  let temp: string[];
  useEffect(() => {
    temp = defaultReceiveRedeemDropdownValues.filter(e => e !== selectedReceiveRedeemCoin);
    setReceiveRedeemDropDownValues(temp);
  }, [selectedReceiveRedeemCoin]);

  // const onBuyColletralValueChange = async (val: string) => {
  //   const valueInNumber = Number(val.replace(/[^0-9]/g, ''))
  //   setCollateralValue(valueInNumber);
  //   let arthxShareTemp = await ((100 * valueInNumber)/colletralRatio) * ((100 - colletralRatio)/100)
  //   setArthxShare(arthxShareTemp);
  //   setReceive(arthxShareTemp + valueInNumber);
  // }

  // const onARTHXValueChange = async (val: string) => {
  //   const valueInNumber = Number(val.replace(/[^0-9]/g, ''))
  //   setArthxShare(valueInNumber);
  //   let colletralTemp = await ((100 * valueInNumber)/(100-colletralRatio)) * ((colletralRatio)/100)
  //   setCollateralValue(colletralTemp);
  //   setReceive(colletralTemp + valueInNumber);
  // }

  // const TestNetSnack = () => {
  //   return (
  //     <TestNetDiv>
  //       <div />
  //       <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
  //         <img src={warning} height={24} />
  //         <span style={{ marginLeft: 5 }}>
  //           Please make sure that you are connected to matic mumbai TESTnet.
  //         </span>
  //       </div>
  //       <div style={{cursor: 'pointer'}}>
  //         <img src={CloseIcon} height={20} onClick={() => { showDiv(false) }} />
  //       </div>
  //     </TestNetDiv>
  //   )
  // }
  // const isLaunched = Date.now() >= config.boardroomLaunchesAt.getTime();
  if (!basisCash) return <div />;
  const handleCheck = (event: any) => {
    // console.log('check trig', event.target.checked)
    setChecked(event.target.checked);
  };
  const handleSliderChange = (event: any, value: any) => {
    console.log('check trig', value)
    setSliderValue(value);
    setDuration(DEFAULT_CALC - value * value)
  };

  const understandMore = [
    'Commited collateral will go to ARTH protocol',
    'Your collaterall is exchanged for ARTHX',
    'There is bonding curve exchange rate which changes as genesis ends'
  ]

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
        <>
          <TransparentInfoDiv
            labelData={`Your amount`}
            rightLabelUnit={'USDT'}
            rightLabelValue={mintColl.toString()}
          />

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
            rightLabelUnit={'ARTH'}
            rightLabelValue={'1000.00'}
          />

          <div style={{
            flexDirection: isMobile ? 'column-reverse' : 'row',
            display: 'flex',
            width: '100%',
            marginTop: '10%',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8
          }}
          >
            <div style={{ flex: 1, width: isMobile ? '100%' : '50%', marginTop: isMobile ? 10 : 0, marginRight: !isMobile ? 15 : 0 }}>

              <Button
                variant={'transparent'}
                text="Cancel"
                size={'lg'}
                onClick={() => {
                  setOpenModal(0)
                  let options = {
                    content: () => (CustomSnack({ onClose: props.closeSnackbar, type: 'red', data1: `Minting ${mintColl} ARTH cancelled` }))
                  }
                  props.enqueueSnackbar('timepass', options)
                }}
              />
            </div>
            <div style={{ width: isMobile ? '100%' : '50%' }}>
              <Button
                text={type === 'Commit' ? 'Commit Collateral' : 'Swap ARTH'}
                // textStyles={{ color: '#F5F5F5' }}
                size={'lg'}
                onClick={() => {
                  setOpenModal(2)
                  let options = {
                    content: () => (CustomSnack({ onClose: props.closeSnackbar, type: 'green', data1: `${type}ing ${type === 'Commit' ? 'collateral' : 'ARTH'}` }))
                  }
                  props.enqueueSnackbar('timepass', options)
                  setTimeout(() => {
                    setSuccessModal(true);
                  }, 3000)
                }}
              />
            </div>
          </div>
        </>
      </CustomModal>
      <div style={{}}>
        <PageHeading>
          GENESIS
        </PageHeading>
        <PageSubHeading>
          <div style={{}}>
            <BorderLinearProgress variant="determinate" value={73} />
          </div>
          <HeaderSpan>
            73% Completed
          </HeaderSpan>
        </PageSubHeading>
      </div>
      <Container size="lg">
        {/* {testnetDiv && TestNetSnack()} */}
        {/* {type === 'Mint' && mintTabContent()}
        {type === 'Redeem' && redeemTabContent()} */}
        <Grid container style={{ marginTop: '24px' }} spacing={2}>
          <Grid item lg={1} />
          <Grid item lg={5} md={12} sm={12} xs={12}>
             <CustomInfoCard>
              <CustomInfoCardDetails>
                <div>
                  <TextForInfoTitle>
                    Available to mint
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <ToolTipFont>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled</ToolTipFont>
                        </React.Fragment>
                      }>
                      <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)', marginBottom: '4px'}} />
                    </HtmlTooltip>
                  </TextForInfoTitle>
                  <BeforeChipDark>54.76M</BeforeChipDark>
                </div>
                <div style={{textAlign: 'end'}}>
                  <TextForInfoTitle>
                    Pool Balance
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <ToolTipFont>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled</ToolTipFont>
                        </React.Fragment>
                      }>
                      <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)', marginBottom: '4px'}} />
                    </HtmlTooltip>
                  </TextForInfoTitle>
                  <BeforeChipDark>157.89M</BeforeChipDark>
                </div>
              </CustomInfoCardDetails>
            </CustomInfoCard>
             <LeftTopCard>
              <LeftTopCardHeader>
                <TabContainer onClick={() => {
                  if (type !== 'Commit') setType('Commit')
                }}>
                  {type === 'Commit' && <ActiveTab/>}
                  <TabText>Commit Collateral</TabText>
                </TabContainer>
                <TabContainer onClick={() => {
                  if (type !== 'Swap') setType('Swap')
                }}>
                  {type === 'Swap' && <ActiveTab/>}
                  <TabText>Swap ARTH for ARTHX</TabText>
                </TabContainer>
              </LeftTopCardHeader>
              <LeftTopCardContainer>
                {type === "Commit"? <CustomInputContainer
                  ILabelValue={'Enter Collateral'}
                  IBalanceValue={`Balance ${balance}`}
                  ILabelInfoValue={''}
                  value={mintColl.toString()}
                  DefaultValue={mintColl.toString()}
                  LogoSymbol={selectedCollateralCoin}
                  hasDropDown={true}
                  dropDownValues={CollateraldropDownValues}
                  ondropDownValueChange={(data: string) => {
                    setSelectedCollateralCoin(data);
                  }}
                  SymbolText={selectedCollateralCoin}
                  inputMode={'numeric'}
                  setText={(val: string) => {
                    setCollateralValue(Number(val.replace(/[^0-9]/g, '')));
                  }}
                />:
                  <CustomInputContainer
                    ILabelValue={'Enter ARTH'}
                    IBalanceValue={`Balance ${balance}`}
                    ILabelInfoValue={''}
                    value={mintColl.toString()}
                    DefaultValue={mintColl.toString()}
                    LogoSymbol={'ARTH'}
                    hasDropDown={false}
                    SymbolText={'ARTH'}
                    inputMode={'numeric'}
                    setText={(val: string) => {
                      setCollateralValue(Number(val.replace(/[^0-9]/g, '')))
                    }}
                  />
                }
                <PlusMinusArrow>
                  <img src={arrowDown} />
                </PlusMinusArrow>
                <div style={{marginTop: '12px', marginBottom: '32px'}}>
                  <TextWithIcon>You Receive</TextWithIcon>
                  <ReceiveContainer>
                    <OneLineInputwomargin>
                      <div style={{ flex: 1 }}>
                        <TextWithIcon>
                          ARTHX
                          <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                        </TextWithIcon>
                      </div>
                      <OneLineInputwomargin>
                        <BeforeChip>2,000</BeforeChip>
                        <TagChips>ARTHX</TagChips>
                      </OneLineInputwomargin>
                    </OneLineInputwomargin>
                  </ReceiveContainer>
                </div>
                <Button text={'Mint'} size={'lg'} variant={'default'} disabled={false} onClick={() => setOpenModal(1)} />
              </LeftTopCardContainer>
            </LeftTopCard>
          </Grid>
          <Grid item lg={5} md={12} sm={12} xs={12}>

            {/* Deep's code here */}

            <BondingDiscount
              dataObj={bondingDiscount}
            />
            <UnderstandMore dataObj={understandMore} />
          </Grid>
          <Grid item lg={1} />
        </Grid>
      </Container>

      <CustomSuccessModal
        modalOpen={successModal}
        setModalOpen={() => setSuccessModal(false)}
        title={'Minting ARTH successful!'}
        subTitle={'View Transaction'}
        subsubTitle={'You should consider stake your ARTH to earn higher APY'}
        buttonText={'Stake your ARTH'}
        buttonType={'default'}
      />
    </>
  );
};

const CustomInfoCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(21px);
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 16px;
  @media (max-width: 600px) {
    padding: 16px;
  }
`

const CustomInfoCardDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`

const OneLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

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

const HeaderSpan = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  display: flex;
  margin: 0px 0px 0px 8px;
  color: #FFFFFF;
`;

const PageSubHeading = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: rgba(255, 255, 255, 0.64);
  text-align: center;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;

`
const ToolTipFont = styled.p`
  padding: 0px;
  margin: 0px;
`
const TestNetDiv = styled.div`
  width: 100%;
  background: #BA1E38;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align:center;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;
  opacity: 0.88;
  padding: 10px 25px;
`;

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
  padding: 32px 12px;
  background: linear-gradient(180deg, rgba(244, 127, 87, 0) 0%, #FD565620);
  height: 80px;
  z-index: 0;
  border-bottom: 2px solid #FD5656;
  width: 100%;
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

const ReceiveContainer = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 12px;
  margin-top: 12px;
`

const TextWithIcon = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.7);
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
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.64);
  margin-right: 5px;
`

const BeforeChipDark = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #FFFFFF;
`

const TagChips = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.64);
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 2px 4px;

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
padding: 5px 0px 0px 5px;
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
export default withSnackbar(Boardrooms);
