import { useWallet } from 'use-wallet';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Countdown from 'react-countdown';
import Grid from '@material-ui/core/Grid';
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
import { parseUnits } from 'ethers/lib/utils';
import { useMediaQuery } from 'react-responsive';
import { BigNumber } from '@ethersproject/bignumber';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import React, { useEffect, useMemo, useState } from 'react';
import makeUrls, { TCalendarEvent } from 'add-event-to-calendar';

import calendar from '../../assets/svg/calendar.svg';
import arrowDown from '../../assets/svg/arrowDown.svg';

import Button from '../../components/Button';
import Container from '../../components/Container';
import TransparentInfoDiv from './components/InfoDiv';
import CustomModal from '../../components/CustomModal';
import { CustomSnack } from '../../components/SnackBar';
import prettyNumber from '../../components/PrettyNumber';
import UnderstandMore from './components/UnderstandMore';
import BondingDiscount from './components/BondingDiscount';
import CustomToolTip from '../../components/CustomTooltip';
import SlippageContainer from '../../components/SlippageContainer';
import CustomSuccessModal from '../../components/CustomSuccesModal';
import { WalletAutoConnect } from '../../components/WalletAutoConnect';
import CustomInputContainer from '../../components/CustomInputContainer';
import { ValidateNumber } from '../../components/CustomInputContainer/RegexValidation';

import useCore from '../../hooks/useCore';
import useTokenDecimals from '../../hooks/useTokenDecimals';
import { getDisplayBalance } from '../../utils/formatBalance';
import useTokenBalance from '../../hooks/state/useTokenBalance';
import usePoolRedeemFees from '../../hooks/state/pools/usePoolRedeemFees';
import useApprove, { ApprovalState } from '../../hooks/callbacks/useApprove';
import useARTHXOraclePrice from '../../hooks/state/controller/useARTHXPrice';
import useGlobalCollateralValue from '../../hooks/state/useGlobalCollateralValue';
import useARTHCirculatingSupply from '../../hooks/state/useARTHCirculatingSupply';
import useRedeemableBalances from '../../hooks/state/pools/useRedeemableBalances';
import useCollectRedemption from '../../hooks/callbacks/pools/useCollectRedemption';
import useCollateralPoolPrice from '../../hooks/state/pools/useCollateralPoolPrice';
import usePercentageCompleted from '../../hooks/state/controller/usePercentageCompleted';
import usePerformRecollateralize from '../../hooks/callbacks/pools/performRecollateralize';
import useRedeemAlgorithmicARTH from '../../hooks/callbacks/pools/useRedeemAlgorithmicARTH';
import useRecollateralizationDiscount from '../../hooks/state/controller/useRecollateralizationDiscount';
import TicketGreen from '../../assets/svg/TicketGreen.svg';

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
    },
    margin: {
      height: theme.spacing(3),
    },
  }),
);

withStyles({
  root: {
    height: 15,
    width: '95%',
  },
  thumb: {
    height: 10,
    width: 10,
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
  },
  marked: {
    color: 'red',
  },
  markLabel: {
  },
  track: {
    height: 3,
    borderRadius: 3,
    color: '#FFA981',
  },
  rail: {
    height: 3,
    borderRadius: 3,
    color: '#D74D26',
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
    color: 'transparent',
  },
})(Slider);

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
  const [calendarLink, setLink] = useState('');
  const [arthValue, setArthValue] = useState<string>('0');
  const [openModal, setOpenModal] = useState<0 | 1 | 2>(0);
  const [type, setType] = useState<'Commit' | 'Swap'>('Commit');
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [collateralValue, setCollateralValue] = useState<string>('0');
  const [timerHeader, setHeader] = useState<boolean>(false);
  const [isInputFieldError, setIsInputFieldError] = useState<boolean>(false);
  const isMobile = useMediaQuery({ maxWidth: '600px' });

  const core = useCore();
  const { account, connect } = useWallet();
  const arthxPrice = useARTHXOraclePrice();
  const recollateralizationDiscount = useRecollateralizationDiscount();
  const collateralTypes = useMemo(() => core.getCollateralTypes(), [core]);
  const [selectedCollateral, setSelectedCollateralCoin] = useState(core.getDefaultCollateral());
  const collectRedeemption = useCollectRedemption(selectedCollateral);
  const redeemableBalances = useRedeemableBalances(selectedCollateral);
  const tokenDecimals = useTokenDecimals(selectedCollateral);
  const arthBalance = useTokenBalance(core.ARTH);
  const arthCirculatingSupply = useARTHCirculatingSupply();
  const collateralBalnace = useTokenBalance(core.tokens[selectedCollateral]);
  const collateralPool = core.getCollatearalPool(selectedCollateral);
  const committedCollateral = useGlobalCollateralValue();
  const percentageCompleted = usePercentageCompleted();
  const redeemFee = usePoolRedeemFees(selectedCollateral);
  const collateralGMUPrice = useCollateralPoolPrice(selectedCollateral);

  WalletAutoConnect();

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

    window.scrollTo(0, 0)
    onClick();
  }, []);

  const calcDiscountOnCommit = (amount: BigNumber, discount: BigNumber) => amount.mul(discount).div(1e6);

  const calcExpectReceiveAmount = (
    inAssetPrice: BigNumber,
    outAssetprice: BigNumber,
    amount: number | string,
    inAssetDecimals: number,
    outAssetDecimals: number) => (
    inAssetPrice
      .mul(BigNumber.from(
        parseUnits(`${amount}`, inAssetDecimals)
      ))
      .mul(
        BigNumber.from(10).pow(outAssetDecimals - inAssetDecimals)
      )
      .div(outAssetprice)
  );

  const tradingFee = useMemo(() => {
    return BigNumber
      .from(parseUnits(`${arthValue}`, 18))
      .mul(redeemFee)
      .div(1e6);
  }, [arthValue, redeemFee]);

  const arthxRecieve = useMemo(() => {
    if (arthxPrice.lte(0)) return BigNumber.from(0);

    if (type === 'Commit' && Number(collateralValue))
      return calcExpectReceiveAmount(
        collateralGMUPrice,
        arthxPrice,
        collateralValue,
        tokenDecimals,
        18
      );

    return calcExpectReceiveAmount(
      BigNumber.from(1e6),
      arthxPrice,
      Number(arthValue) - Number(getDisplayBalance(tradingFee, 18, 6)),
      18,
      18
    );
  }, [
    arthValue,
    tradingFee,
    collateralGMUPrice,
    arthxPrice,
    collateralValue,
    tokenDecimals,
    type
  ]);

  const arthxDiscount = useMemo(() => {
    if (arthxPrice.lte(0)) return BigNumber.from(0);
    return calcDiscountOnCommit(arthxRecieve, recollateralizationDiscount);
  }, [arthxRecieve, arthxPrice, recollateralizationDiscount]);

  const totalArthxRecieve = useMemo(() => {
    return arthxRecieve.add(arthxDiscount)
  }, [arthxDiscount, arthxRecieve]);

  const currentCoin = type === 'Commit' ? selectedCollateral : 'ARTH';
  const currentToken = core.tokens[currentCoin];
  const currentValue = type === 'Commit' ? collateralValue : arthValue;

  const [approveStatus, approve] = useApprove(
    currentToken,
    collateralPool.address
  );

  const [genesisApproveStatus, genesisApprove] = useApprove(
    currentToken,
    core.contracts['Genesis'].address
  );

  const redeemARTH = useRedeemAlgorithmicARTH(
    selectedCollateral,
    BigNumber.from(parseUnits(`${arthValue}`, 18)),
    arthxRecieve,
  );

  const recollateralize = usePerformRecollateralize(
    selectedCollateral,
    BigNumber.from(parseUnits(collateralValue, tokenDecimals)),
    totalArthxRecieve,
  );

  const bondingDiscount = [
    {
      label: 'Current discount',
      value: `${Number(getDisplayBalance(recollateralizationDiscount, 4, 4))
          .toLocaleString('en-US', { maximumFractionDigits: 4 })
        }%`,
    },
    {
      label: 'Starting ARTHX Price',
      value: '$0.01',
    },
    {
      label: 'Discounted ARTHX Price',
      value: `$${Number(getDisplayBalance(arthxPrice, 6, 6))
          .toLocaleString('en-US', { maximumFractionDigits: 6 })
        }`,
    },
  ];

  const understandMore = [
    'Users can either commit collateral or swap ARTH to receive ARTHX.',
    'ARTHX is a deflationary token that charges a 5% fee on every transfer which goes to stakers.',
    'ARTHX is minted whenever the protocol finds that it does not have enough collateral to back ARTH.',
    'ARTHX is burnt when a user mints ARTH or when the protocol buys back ARTHX with excess collateral.',
    'The discount decreases over time as more collateral is committed.',
  ];

  const isApproved = approveStatus === ApprovalState.APPROVED;
  const isApproving = approveStatus === ApprovalState.PENDING;

  const isGenesisApproved = genesisApproveStatus === ApprovalState.APPROVED;
  const isGenesisApproving = genesisApproveStatus === ApprovalState.PENDING;

  return (
    <>
      <CustomSuccessModal
        modalOpen={openModal === 2}
        setModalOpen={() => setOpenModal(0)}
        title={type === 'Commit' ? 'Committing collateral!' : 'Swapping ARTH'}
        // subTitle={'View Transaction'}
        subsubTitle={
          'Your transaction is now being mined on the blockchain. You should consider staking your tokens to earn extra rewards!'
        }
        buttonText={'Stake your ARTH'}
        buttonType={'default'}
        buttonTo={'/farming'}
      />
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
            labelData={`You will transfer`}
            rightLabelUnit={currentCoin}
            rightLabelValue={Number(currentValue).toLocaleString()}
          />
          {
            type !== 'Commit' &&
            <TransparentInfoDiv
              labelData={`Trading Fee`}
              rightLabelUnit={'ARTH'}
              rightLabelValue={
                Number(getDisplayBalance(tradingFee, 18, 6))
                  .toLocaleString('en-US', {maximumFractionDigits: 6})
                }
            />
          }
          <Divider style={{ background: 'rgba(255, 255, 255, 0.08)', margin: '15px 0px' }} />
          <TransparentInfoDiv
            labelData={`You will receive`}
            rightLabelUnit={'ARTHX'}
            rightLabelValue={
              Number(getDisplayBalance(
                type === 'Commit' ? totalArthxRecieve : arthxRecieve,
                18,
                3
              )).toLocaleString()
            }
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
                        data1: `${type} ${Number(currentValue).toLocaleString()} ${currentCoin} cancelled`
                      }),
                  };
                  props.enqueueSnackbar('timepass', options);
                }}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Button
                disabled={
                  // percentageCompleted.gt(BigNumber.from(10).pow(18)) ||
                  isInputFieldError ||
                  (type === 'Commit'
                    ? !Number(collateralValue) || percentageCompleted.gt(BigNumber.from(10).pow(18))
                    : !Number(arthValue)
                  ) ||
                  !Number(currentValue) ||
                  (type === 'Commit'
                    ? !Number(totalArthxRecieve) || percentageCompleted.gt(BigNumber.from(10).pow(18)) :
                    !Number(arthxRecieve)
                  )
                }
                text={type === 'Commit' ? 'Commit Collateral' : 'Swap ARTH'}
                size={'lg'}
                onClick={() => {
                  if (type === 'Commit') recollateralize(() => setOpenModal(2));
                  else redeemARTH(() => setOpenModal(2));
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
        <PageHeading>{timerHeader ? 'JOIN THE GENESIS' : 'GENESIS'}</PageHeading>
        {!timerHeader ? (
          <PageSubHeading>
            <div style={{}}>
              <BorderLinearProgress
                variant="determinate"
                value={
                  percentageCompleted.gt(BigNumber.from(10).pow(18))
                    ? 100
                    : Number(getDisplayBalance(percentageCompleted, 16, 3))
                }
              />
            </div>
            <HeaderSpan>
              {
                Number(getDisplayBalance(percentageCompleted, 16, 3))
                  .toLocaleString('en-US', { maximumFractionDigits: 2 })
              }% Completed
            </HeaderSpan>
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
                <img src={calendar} alt="calendar" height={24} />
                <span style={{ marginLeft: 8 }}>Add to Calendar</span>
              </HeaderButton>
            )}
          </div>
        )}
      </div>
      <Container size="lg">
        <Grid container style={{}} spacing={2}>
          <Grid item lg={1} />
          <Grid item lg={5} md={12} sm={12} xs={12}>
            <CustomInfoCard className={'custom-mahadao-box'}>
              <CustomInfoCardDetails>
                <OneLineInputwomargin style={{ marginBottom: '20px' }}>
                  <TextForInfoTitle>
                    ARTH Circulating Supply
                    <CustomToolTip toolTipText={'loreum ipsum'} />
                  </TextForInfoTitle>
                  <BeforeChipDark>
                    {prettyNumber(getDisplayBalance(arthCirculatingSupply))}
                  </BeforeChipDark>
                </OneLineInputwomargin>
                <OneLineInputwomargin>
                  <TextForInfoTitle>
                    Commited Collateral
                    <CustomToolTip toolTipText={'loreum ipsum'} />
                  </TextForInfoTitle>
                  <BeforeChipDark>
                    {prettyNumber(getDisplayBalance(committedCollateral, 18))}
                  </BeforeChipDark>
                </OneLineInputwomargin>
              </CustomInfoCardDetails>
            </CustomInfoCard>
            <LeftTopCard className={'custom-mahadao-container'}>
              <LeftTopCardHeader className={'custom-mahadao-container-header'}>
                <div style={{ display: 'flex', flex: '1' }}>
                  <TabContainer
                    onClick={() => {
                      if (type !== 'Commit') setType('Commit');
                    }}
                  >
                    {type === 'Commit' && <ActiveTab />}
                    {type !== 'Commit' ? (
                      <TabText>Commit Collateral</TabText>
                    ) : (
                      <TabTextActive>Commit Collateral</TabTextActive>
                    )}
                  </TabContainer>
                  <TabContainer
                    onClick={() => {
                      if (type !== 'Swap') setType('Swap');
                    }}
                  >
                    {type === 'Swap' && <ActiveTab />}
                    {type !== 'Swap' ? (
                      <TabText>Swap ARTH</TabText>
                    ) : (
                      <TabTextActive>Swap ARTH</TabTextActive>
                    )}
                  </TabContainer>
                  <SlippageContainer />
                </div>
              </LeftTopCardHeader>
              <LeftTopCardContainer className={'custom-mahadao-container-content'}>
                {type === 'Commit' ? (
                  <CustomInputContainer
                    ILabelValue={'Enter Collateral'}
                    IBalanceValue={getDisplayBalance(collateralBalnace, 6)}
                    ILabelInfoValue={''}
                    DefaultValue={collateralValue.toString()}
                    LogoSymbol={selectedCollateral}
                    hasDropDown={true}
                    dropDownValues={collateralTypes}
                    ondropDownValueChange={setSelectedCollateralCoin}
                    SymbolText={selectedCollateral}
                    inputMode={'numeric'}
                    disabled={percentageCompleted.gt(BigNumber.from(10).pow(18))}
                    setText={(val: string) => {
                      setCollateralValue(ValidateNumber(val) ? val : '0');
                    }}
                    tagText={'MAX'}
                    errorCallback={(flag: boolean) => { setIsInputFieldError(flag) }}
                    DisableMsg={
                      percentageCompleted.gt(BigNumber.from(10).pow(18))
                        ? 'Currently Genesis is 100% Completed'
                        : ''
                    }
                  />
                ) : (
                  <CustomInputContainer
                    ILabelValue={'Enter ARTH'}
                    IBalanceValue={getDisplayBalance(arthBalance)}
                    ILabelInfoValue={''}
                    // value={arthValue.toString()}
                    DefaultValue={arthValue.toString()}
                    LogoSymbol={'ARTH'}
                    hasDropDown={false}
                    SymbolText={'ARTH'}
                    // disabled={percentageCompleted.gt(BigNumber.from(10).pow(18))}
                    inputMode={'numeric'}
                    setText={(val: string) => {
                      setArthValue(ValidateNumber(val) ? val : '0');
                    }}
                    tagText={'MAX'}
                    errorCallback={(flag: boolean) => { setIsInputFieldError(flag) }}
                  // DisableMsg={
                  //   percentageCompleted.gt(BigNumber.from(10).pow(18))
                  //     ? 'Currently Genesis is 100% Completed'
                  //     : ''
                  // }
                  />
                )}
                <PlusMinusArrow>
                  <img src={arrowDown} alt={'Arrow down'} />
                </PlusMinusArrow>
                <div style={{ marginBottom: '32px' }}>
                  <TextWithIcon style={{ marginBottom: '12px' }}>You Receive</TextWithIcon>
                  <ReceiveContainer>
                    <OneLineInputwomargin>
                      <div style={{ flex: 1 }}>
                        <TextWithIcon>
                          ARTHX
                          <CustomToolTip toolTipText={'loreum ipsum'} />
                        </TextWithIcon>
                      </div>
                      <OneLineInputwomargin>
                        <BeforeChip className={'custom-mahadao-chip'}>
                          {Number(getDisplayBalance(arthxRecieve, 18, 3)).toLocaleString()}
                        </BeforeChip>
                        <TagChips>ARTHX</TagChips>
                      </OneLineInputwomargin>
                    </OneLineInputwomargin>
                    {
                      type === 'Commit'
                        ? (
                          <OneLineInputwomargin>
                            <div style={{ flex: 1 }}>
                              <TextWithIcon>
                                Bonus
                            <CustomToolTip toolTipText={'loreum ipsum'} />
                              </TextWithIcon>
                            </div>
                            <OneLineInputwomargin>
                              <BeforeChip className={'custom-mahadao-chip'}>
                                {Number(getDisplayBalance(arthxDiscount, 18, 3)).toLocaleString()}
                              </BeforeChip>
                              <TagChips>ARTHX</TagChips>
                            </OneLineInputwomargin>
                          </OneLineInputwomargin>
                        )
                        : (
                          <OneLineInputwomargin>
                            <div style={{ flex: 1 }}>
                              <TextWithIcon>
                                Trading Fee
                            <CustomToolTip toolTipText={'loreum ipsum'} />
                              </TextWithIcon>
                            </div>
                            <OneLineInputwomargin>
                              <BeforeChip className={'custom-mahadao-chip'}>
                                {
                                  Number(getDisplayBalance(tradingFee, 18, 6))
                                    .toLocaleString('en-US', { maximumFractionDigits: 6 })
                                }
                              </BeforeChip>
                              <TagChips>ARTH</TagChips>
                            </OneLineInputwomargin>
                          </OneLineInputwomargin>
                        )
                    }
                  </ReceiveContainer>
                </div>
                <CustomBadgeAlert>
                  <Logo src={TicketGreen} alt='TicketBg' />
                  <Text>You will get 3 lottery tickets to win prize.</Text>
                </CustomBadgeAlert>
                {!!!account ? (
                  <Button
                    text={'Connect Wallet'}
                    size={'lg'}
                    onClick={() => connect('injected').then(() => {
                      localStorage.removeItem('disconnectWallet')
                    })}
                  />
                ) : (type === 'Commit' && !isApproved) || (type === 'Swap' && !isGenesisApproved) ? (
                  <Button
                    text={!isApproving ? `Approve ${currentCoin}` : 'Approving...'}
                    size={'lg'}
                    disabled={
                      // percentageCompleted.gt(BigNumber.from(10).pow(18)) ||
                      isInputFieldError ||
                      isApproving ||
                      (type === 'Commit' && Number(collateralValue) === 0) ||
                      (type === 'Commit' && percentageCompleted.gt(BigNumber.from(10).pow(18))) ||
                      (type === 'Swap' && Number(arthValue) === 0)
                    }
                    onClick={
                      type === 'Commit'
                        ? approve
                        : genesisApprove
                    }
                    loading={isApproving}
                  />
                ) : (
                    <Button
                      text={type === 'Commit' ? 'Commit Collateral' : 'Swap ARTH'}
                      size={'lg'}
                      variant={'default'}
                      disabled={
                        // percentageCompleted.gt(BigNumber.from(10).pow(18)) ||
                        isInputFieldError ||
                        (type === 'Commit'
                          ? !Number(collateralValue) || percentageCompleted.gt(BigNumber.from(10).pow(18))
                          : !Number(arthValue)
                        ) ||
                        (type === 'Commit'
                          ? !isApproved
                          : !isGenesisApproved
                        )
                      }
                      onClick={() => setOpenModal(1)}
                    />
                )}
              </LeftTopCardContainer>
            </LeftTopCard>
          </Grid>
          <Grid item lg={5} md={12} sm={12} xs={12}>
            {/*<BondingDiscount dataObj={bondingDiscount} />*/}
            <UnderstandMore dataObj={understandMore} />
            <LotteryBox className={'custom-mahadao-box'}>
              <LotteryBoxText>
                Genesis participate can issue lottery tickets to win exiting MAHA Prizes
              </LotteryBoxText>
              <LotteryBoxAction>
                <Button text={'Learn More'} size={'lg'} variant={'transparent'} to={'/lottery'}/>
              </LotteryBoxAction>
            </LotteryBox>
          </Grid>
          <Grid item lg={1} />
        </Grid>
      </Container>

      <CustomSuccessModal
        modalOpen={successModal}
        setModalOpen={() => setSuccessModal(false)}
        title={'Minting ARTH successful!'}
        // subTitle={'View Transaction'}
        subsubTitle={'You should consider stake your ARTH to earn higher APY'}
        subTitleLink={'/#/farming'}
        buttonText={'Stake your ARTH'}
        buttonType={'default'}
        buttonHref={'/#/farming'}
      />
    </>
  );
};

const CustomBadgeAlert = styled.div`
  border: 1px solid #20C974;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px;
  display: flex;
  align-items: flex-start;
  margin-bottom: 32px;
`

const Logo = styled.img`
  width: 16px;
  height: 16px;
`

const Text = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  color: #20C974;
  flex: 1;
  padding-left: 10px;
  margin-bottom: 0;
`

const GradientDiv = styled.div`
  background: linear-gradient(180deg, #2a2827 0%, rgba(42, 40, 39, 0) 100%);
  height: 270px;
  position: absolute;
  width: 100%;
  z-index: -5;
`;

const CustomInfoCard = styled.div`
  margin-bottom: 16px;
  @media (max-width: 600px) {
    margin-bottom: 24px;
  }
`;

const CustomInfoCardDetails = styled.div``;

const StyledNavLink = styled(Link)`
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
  @media (max-width: 600px) {
    margin-bottom: 8px;
  }
`;

const LeftTopCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

const LotteryBox = styled.div`
  background: radial-gradient(145.27% 168.64% at 130.87% -118.64%, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),
  linear-gradient(252.98deg, #E44D75 10.74%, #EB822C 87.31%);
  margin-top: 24px;
`

const LotteryBoxText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 12px;
`

const LotteryBoxAction = styled.div`
  width: 50%;
`

export default withSnackbar(Genesis);
