import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import Grid from '@material-ui/core/Grid';
import InfoIcon from '@material-ui/icons/Info';
import Button from '../../components/Button';
import arrowDown from '../../assets/svg/arrowDown.svg';
import calendar from '../../assets/svg/calendar.svg';
import {
  Checkbox,
  CheckboxProps,
  createStyles,
  Divider,
  LinearProgress,
  makeStyles,
  Slider,
  Theme,
  withStyles,
} from '@material-ui/core';
import TransparentInfoDiv from './components/InfoDiv';
import HtmlTooltip from '../../components/HtmlTooltip';
import CustomInputContainer from '../../components/CustomInputContainer';
import CustomModal from '../../components/CustomModal';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { CustomSnack } from '../../components/SnackBar';
import CustomSuccessModal from '../../components/CustomSuccesModal';
import BondingDiscount from './components/BondingDiscount';
import UnderstandMore from './components/UnderstandMore';
import { useMediaQuery } from 'react-responsive';
import Countdown from 'react-countdown';
import makeUrls, { TCalendarEvent } from 'add-event-to-calendar';
import { Link } from 'react-router-dom';
import CustomToolTip from '../../components/CustomTooltip';

// const HtmlTooltip = withStyles((theme1 : Theme) => ({
//   tooltip: {
//     backgroundColor: theme.color.dark[200],
//     color: 'white',
//     fontWeight: 300,
//     fontSize: '13px',
//     borderRadius: '6px',
//     padding: '20px',
//   },
// }))(Tooltip);

withStyles({
  root: {
    color: 'rgba(255, 255, 255, 0.32)',
    '&$checked': {
      color: '#FF7F57',
    },
  },
  checked: {
    color: 'white',
  },
})((props: CheckboxProps) => <Checkbox {...props} />);

makeStyles((theme: Theme) =>
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

// function valueLabelFormat(value: number) {
//   return marks.findIndex((mark: any) => mark.value === value) + 1;
// }

withStyles({
  root: {
    // color: 'white',
    height: 15,
    width: '95%',
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
    color: 'red',
  },
  markLabel: {
    // color: 'green'
  },
  track: {
    height: 3,
    borderRadius: 3,
    color: '#FFA981',
    // top: '2%'
  },
  rail: {
    height: 3,
    borderRadius: 3,
    color: '#D74D26',
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
    color: 'transparent',
  },
})(Slider);

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
  },
];

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
      width: 200,
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

const Genesis = (props: WithSnackbarProps) => {
  useEffect(() => window.scrollTo(0, 0), []);

  const [mintColl, setCollateralValue] = useState<string>('0.0');
  const [arthValue, setArthValue] = useState<string>('0.0');
  const [balance] = useState<number>(0);

  const [type, setType] = useState<'Commit' | 'Swap'>('Commit');
  const [openModal, setOpenModal] = useState<0 | 1 | 2>(0);
  const [calendarLink, setLink] = useState('');

  const [successModal, setSuccessModal] = useState<boolean>(false);
  const isMobile = useMediaQuery({ maxWidth: '600px' });
  const [selectedCollateralCoin, setSelectedCollateralCoin] = useState<string>('ETH');
  const defaultCollateralDropdownValues = ['ETH', 'MAHA', 'WBTC', 'USDT', 'USDC'];
  const [CollateraldropDownValues, setCollateralDropDownValues] = useState<string[]>(
    defaultCollateralDropdownValues,
  );
  const [timerHeader, setHeader] = useState<boolean>(true);

  // useEffect(() => {
  //   let arr: string[];
  //   arr = defaultCollateralDropdownValues.filter((e) => e !== selectedCollateralCoin);
  //   setCollateralDropDownValues(arr);
  // }, [defaultCollateralDropdownValues, selectedCollateralCoin]);

  useEffect(() => {
    const onClick = () => {
      let event: TCalendarEvent = {
        name: 'ARTH-v2 Genesis',
        location: 'Online',
        details: 'Genesis',
        startsAt: new Date('1 may 2021 12:30:00').toString(),
        endsAt: new Date('1 may 2021 20:30:00').toString(),
      };
      setLink(makeUrls(event).google);
    };
    onClick();
  }, []);

  const understandMore = [
    'Commited collateral will go to ARTH protocol',
    'Your collaterall is exchanged for ARTHX',
    'There is bonding curve exchange rate which changes as genesis ends',
  ];

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
            rightLabelUnit={type === 'Commit' ? selectedCollateralCoin : 'ARTH'}
            rightLabelValue={mintColl.toString()}
          />

          <Divider style={{ background: 'rgba(255, 255, 255, 0.08)', margin: '15px 0px' }} />

          <TransparentInfoDiv
            labelData={`You will receive`}
            rightLabelUnit={'ARTHX'}
            rightLabelValue={'1000.00'}
          />

          <Grid
            container
            spacing={2}
            style={{
              marginTop: '32px',
              display: 'flex',
              flexDirection: isMobile ? 'column-reverse' : 'row',
            }}
          >
            <Grid item lg={6} md={6} sm={12} xs={12}>
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
                        data1: `Minting ${mintColl} ARTH cancelled`,
                      }),
                  };
                  props.enqueueSnackbar('timepass', options);
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Button
                text={type === 'Commit' ? 'Commit Collateral' : 'Swap ARTH'}
                size={'lg'}
                onClick={() => {
                  setOpenModal(2);
                  let options = {
                    content: () =>
                      CustomSnack({
                        onClose: props.closeSnackbar,
                        type: 'green',
                        data1: `${type}ing ${type === 'Commit' ? 'collateral' : 'ARTH'}`,
                      }),
                  };
                  props.enqueueSnackbar('timepass', options);
                  setTimeout(() => {
                    setSuccessModal(true);
                  }, 3000);
                }}
              />
            </Grid>
          </Grid>
        </>
      </CustomModal>
      <GradientDiv />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '40px 0px',
        }}
      >
        <PageHeading>{timerHeader ? 'JOIN GENESIS' : 'GENESIS'}</PageHeading>
        {!timerHeader ? (
          <PageSubHeading>
            <div style={{}}>
              <BorderLinearProgress variant="determinate" value={73} />
            </div>
            <HeaderSpan>73% Completed</HeaderSpan>
          </PageSubHeading>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <PageSubHeading>
              <StartsIn>Starts in</StartsIn>
              <Countdown
                date={Date.now() + 550000000}
                renderer={({ days, hours, minutes, seconds, completed }) => {
                  return (
                    <HeaderSpan>
                      {days}d : {hours}h : {minutes}m : {seconds}s
                    </HeaderSpan>
                  );
                }}
              />
            </PageSubHeading>
            {calendarLink && (
              <HeaderButton onClick={() => window.open(calendarLink, '_blank')}>
                <img src={calendar} height={24} />
                <span style={{ marginLeft: 8 }}>Add to Calendar</span>
              </HeaderButton>
            )}
          </div>
        )}
      </div>
      <Container size="lg">
        {/* {testnetDiv && TestNetSnack()} */}
        {/* {type === 'Mint' && mintTabContent()}
        {type === 'Redeem' && redeemTabContent()} */}
        <Grid container style={{}} spacing={2}>
          <Grid item lg={1} />
          <Grid item lg={5} md={12} sm={12} xs={12}>
            <CustomInfoCard className={'custom-mahadao-box'}>
              <CustomInfoCardDetails>
                <OneLineInputwomargin style={{marginBottom: '20px'}}>
                  <TextForInfoTitle>
                    Amount Remaining to Raise
                    <CustomToolTip/>
                  </TextForInfoTitle>
                  <BeforeChipDark>54.76M</BeforeChipDark>
                </OneLineInputwomargin>
                <OneLineInputwomargin>
                  <TextForInfoTitle>
                    Commited Collateral
                    <CustomToolTip/>
                  </TextForInfoTitle>
                  <BeforeChipDark>157.89M</BeforeChipDark>
                </OneLineInputwomargin>
              </CustomInfoCardDetails>
            </CustomInfoCard>
            <LeftTopCard className={'custom-mahadao-container'}>
              <LeftTopCardHeader className={'custom-mahadao-container-header'}>
                <TabContainer
                  onClick={() => {
                    if (type !== 'Commit') setType('Commit');
                  }}
                >
                  {type === 'Commit' && <ActiveTab />}
                  {type !== 'Commit' ?<TabText>Commit Collateral</TabText>: <TabTextActive>Commit Collateral</TabTextActive>}
                </TabContainer>
                <TabContainer
                  onClick={() => {
                    if (type !== 'Swap') setType('Swap');
                  }}
                >
                  {type === 'Swap' && <ActiveTab />}
                  {type !== 'Swap' ?<TabText>Swap ARTH for ARTH</TabText>: <TabTextActive>Swap ARTH for ARTH</TabTextActive>}
                </TabContainer>
              </LeftTopCardHeader>
              <LeftTopCardContainer className={'custom-mahadao-container-content'}>
                {type === 'Commit' ? (
                  <CustomInputContainer
                    ILabelValue={'Enter Collateral'}
                    IBalanceValue={`Balance ${balance}`}
                    ILabelInfoValue={''}
                    // value={mintColl.toString()}
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
                      setCollateralValue(String(val));
                    }}
                  />
                ) : (
                  <CustomInputContainer
                    ILabelValue={'Enter ARTH'}
                    IBalanceValue={`Balance ${balance}`}
                    ILabelInfoValue={''}
                    // value={arthValue.toString()}
                    DefaultValue={arthValue.toString()}
                    LogoSymbol={'ARTH'}
                    hasDropDown={false}
                    SymbolText={'ARTH'}
                    inputMode={'numeric'}
                    setText={(val: string) => {
                      setArthValue(String(val));
                    }}
                  />
                )}
                <PlusMinusArrow>
                  <img src={arrowDown} />
                </PlusMinusArrow>
                <div style={{marginBottom: '32px'}}>
                  <TextWithIcon style={{marginBottom: '12px'}}>You Receive</TextWithIcon>
                  <ReceiveContainer>
                    <OneLineInputwomargin>
                      <div style={{ flex: 1 }}>
                        <TextWithIcon>
                          ARTHX
                        </TextWithIcon>
                      </div>
                      <OneLineInputwomargin>
                        <BeforeChip className={'custom-mahadao-chip'}>2,000</BeforeChip>
                        <TagChips>ARTHX</TagChips>
                      </OneLineInputwomargin>
                    </OneLineInputwomargin>
                  </ReceiveContainer>
                </div>
                <Button
                  text={type === 'Commit' ? 'Commit Collateral' : 'Swap ARTHX'}
                  size={'lg'}
                  variant={'default'}
                  disabled={false}
                  onClick={() => setOpenModal(1)}
                />
              </LeftTopCardContainer>
            </LeftTopCard>
          </Grid>
          <Grid item lg={5} md={12} sm={12} xs={12}>
            {/* Deep's code here */}

            <BondingDiscount dataObj={bondingDiscount} />
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

const GradientDiv = styled.div`
  background: linear-gradient(180deg, #2a2827 0%, rgba(42, 40, 39, 0) 100%);
  height: 270px;
  position: absolute;
  // border: 1px solid;
  width: 100%;
  z-index: -5;
`;

const CustomInfoCard = styled.div`
  margin-bottom: 16px;
  @media (max-width: 600px) {
    margin-bottom: 24px;
  }
`;

const CustomInfoCardDetails = styled.div`
`;

const StyledNavLink = styled(Link)`
  // color: ${(props) => props.theme.color.grey[400]};
  // font-size: 14px;
  // margin-right: -4px;
  // &:hover {
  //   color: white !important;
  // }
  background: rgba(97, 134, 242, 0.32);
  border-radius: 8px;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: rgba(255, 255, 255, 0.88);
  display: flex;
  flex-direction: row;
  padding: 15px;
  align-items: center;
  justify-content: space-around;
  max-width: 200px;
  cursor: pointer;
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
`;

const HeaderSpan = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  display: flex;
  margin: 0 0 0 8px;
  color: #ffffff;
`;
const StartsIn = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: rgba(255, 255, 255, 0.88);
  opacity: 0.64;
`;
const PageSubHeading = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: rgba(255, 255, 255, 0.64);
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderButton = styled.div`
  background: rgba(97, 134, 242, 0.32);
  border-radius: 8px;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: rgba(255, 255, 255, 0.88);
  display: flex;
  flex-direction: row;
  padding: 15px;
  align-items: center;
  justify-content: space-around;
  max-width: 200px;
  cursor: pointer;
`;
const ToolTipFont = styled.p`
  padding: 0;
  margin: 0;
`;

const OneLineInputwomargin = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LeftTopCard = styled.div`
  @media(max-width: 600px) {
    margin-bottom: 8px;
  }
`;

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
  padding: 32px 12px;
  background: linear-gradient(180deg, rgba(244, 127, 87, 0) 0%, #fd565620);
  height: 80px;
  z-index: 0;
  border-bottom: 2px solid #fd5656;
  width: 100%;
`;

const PlusMinusArrow = styled.div`
  width: 100%;
  border-radius: 1.33px;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  font-size: 20px;
  margin: 12px 0;
`;

const ReceiveContainer = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
`;

const TextWithIcon = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.7);
`;

const TextForInfoTitle = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: #ffffff;
  opacity: 0.64;
`;

const BeforeChip = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.64);
  margin-right: 5px;
`;

const BeforeChipDark = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
`;

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
`;

export default withSnackbar(Genesis);
