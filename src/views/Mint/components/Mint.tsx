import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import useCore from '../../../hooks/useCore';
import Grid from '@material-ui/core/Grid';
import Button from '../../../components/Button';
import arrowDown from '../../../assets/svg/arrowDown.svg';
import plus from '../../../assets/svg/plus.svg';
import {
  Checkbox,
  CheckboxProps,
  createStyles,
  Divider,
  FormControlLabel,
  makeStyles,
  Slider,
  Theme,
  withStyles,
} from '@material-ui/core';
import { BigNumber } from '@ethersproject/bignumber';
import { CustomSnack } from '../../../components/SnackBar';
import { getDisplayBalance } from '../../../utils/formatBalance';
import { useWallet } from 'use-wallet';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckIcon from '@material-ui/icons/Check';
import CustomInputContainer from '../../../components/CustomInputContainer';
import CustomModal from '../../../components/CustomModal';
import CustomSuccessModal from '../../../components/CustomSuccesModal';
import PoolInfo from './PoolInfo';
import TransparentInfoDiv from './InfoDiv';
import useApprove, { ApprovalState } from '../../../hooks/callbacks/useApprove';
import useARTHXOraclePrice from '../../../hooks/state/useARTHXOraclePrice';
import useCollateralPoolPrice from '../../../hooks/state/pools/useCollateralPoolPrice';
import useMintCollateralRatio from '../../../hooks/state/useMintCollateralRatio';
import usePoolMintingFees from '../../../hooks/state/pools/usePoolMintingFees';
import useTokenBalance from '../../../hooks/state/useTokenBalance';
import useMintARTH from '../../../hooks/callbacks/pools/useMintARTH';

const OrangeCheckBox = withStyles({
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

const PrettoRestrictSlider = withStyles({
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
const DEFAULT_CALC = 1440;

interface IProps {
  setType: (type: 'mint' | 'redeem') => void;
}
const MintTabContent = (props: WithSnackbarProps & IProps) => {
  useEffect(() => window.scrollTo(0, 0), []);
  const { account, connect } = useWallet();

  const core = useCore();
  const [calcDuration, setDuration] = useState<number>(DEFAULT_CALC);

  const [arthxValue, setArthxValue] = useState<string>('0');
  const [collateralValue, setCollateralValue] = useState<string>('0');
  const [arthValue, setArthValue] = useState<string>('0');

  const mintCR = useMintCollateralRatio();
  const colletralRatio = mintCR.div(10000).toNumber();

  const [checked, setChecked] = React.useState(false);
  const [openModal, setOpenModal] = useState<0 | 1 | 2>(0);
  const [sliderValue, setSliderValue] = React.useState(1);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const sliderClasses = useSliderStyles();

  const collateralTypes = useMemo(() => core.getCollateralTypes(), [core]);
  const [selectedCollateralCoin, setSelectedCollateralCoin] = useState(
    core.getDefaultCollateral(),
  );

  const mintingFee = usePoolMintingFees(selectedCollateralCoin);

  const collateralToGMUPrice = useCollateralPoolPrice(selectedCollateralCoin);
  const arthxToGMUPrice = useARTHXOraclePrice();

  const onCollateralValueChange = async (val: string) => {
    if (val === '') {
      setArthxValue('0');
      setArthValue('0');
    }
    setCollateralValue(val);
    const valueInNumber = Number(val);
    if (!valueInNumber || arthxToGMUPrice.eq(0)) return;

    const arthxShareValueInCollatTerms =
      ((100 * valueInNumber) / colletralRatio) * ((100 - colletralRatio) / 100);

    const finalArthxValue = collateralToGMUPrice
      .mul(Math.floor(arthxShareValueInCollatTerms * 1e6))
      .div(arthxToGMUPrice);

    const finalArthValue = collateralToGMUPrice
      .mul(Math.floor((arthxShareValueInCollatTerms + valueInNumber) * 1e6))
      .div(1e6);

    setArthxValue(getDisplayBalance(finalArthxValue, 18, 3));
    setArthValue(getDisplayBalance(finalArthValue, 18, 3));
  };

  const onARTHXValueChange = async (val: string) => {
    if (val === '') setArthValue('0');

    setArthxValue(val);
    const valueInNumber = Number(val);
    if (valueInNumber) {
      let colletralTemp =
        (await ((100 * valueInNumber) / (100 - colletralRatio))) * (colletralRatio / 100);
      setCollateralValue(colletralTemp.toString());
      setArthValue(String(colletralTemp + valueInNumber));
    }
  };

  const onARTHValueChange = async (val: string) => {
    if (val === '') {
      setArthxValue('0');
      setCollateralValue('0');
    }
    setArthValue(val);
    const valueInNumber = Number(val);
    if (valueInNumber) {
      setCollateralValue(String(valueInNumber * (colletralRatio / 100)));
      setArthxValue(String(valueInNumber * ((100 - colletralRatio) / 100)));
    }
  };

  const handleCheck = (event: any) => {
    setChecked(event.target.checked);
  };

  const handleSliderChange = (event: any, value: any) => {
    setSliderValue(value);
    setDuration(DEFAULT_CALC - value * value);
  };

  const mintARTH = useMintARTH(
    selectedCollateralCoin,
    Number(collateralValue),
    Number(arthxValue),
    Number(arthValue),
    mintingFee,
    0.1,
  );

  const handleMint = () => {
    // setOpenModal(2);
    mintARTH(() => {
      setOpenModal(2);
      setSuccessModal(true);
    });

    // let options = {
    //   content: () =>
    //     CustomSnack({
    //       onClose: props.closeSnackbar,
    //       type: 'green',
    //       data1: `Minting ${mintColl} ARTH`,
    //     }),
    // };
    // props.enqueueSnackbar('timepass', options);
    // setTimeout(() => {
    //   setSuccessModal(true);
    // }, 3000);
    // mintARTH();
  };

  const arthxBalance = useTokenBalance(core.ARTHX);
  const arthBalance = useTokenBalance(core.ARTH);
  const collateralBalance = useTokenBalance(core.tokens[selectedCollateralCoin]);
  const collateralPool = core.getCollatearalPool(selectedCollateralCoin);

  const [arthXApproveStatus, approveARTHX] = useApprove(core.ARTHX, collateralPool.address);

  const [collatApproveStatus, approveCollat] = useApprove(
    core.tokens[selectedCollateralCoin],
    collateralPool.address,
  );

  const isWalletConnected = !!account;
  const isARTHXApproving = arthXApproveStatus === ApprovalState.PENDING;
  const isARTHXApproved = arthXApproveStatus === ApprovalState.APPROVED;

  const isCollatApproved = collatApproveStatus === ApprovalState.APPROVED;
  const isCollatApproving = collatApproveStatus === ApprovalState.PENDING;
  const isCollatArthxApproved = useMemo(() => {
    return isARTHXApproved && !!account && isCollatApproved;
  }, [account, isARTHXApproved, isCollatApproved]);

  const tradingFee = useMemo(() => {
    const mintingAmount = BigNumber.from(Math.floor(Number(arthValue) * 1e6));
    return mintingAmount.mul(mintingFee).div(1e6);
  }, [arthValue, mintingFee]);

  return (
    <>
      <CustomModal
        closeButton
        handleClose={() => setOpenModal(0)}
        open={openModal === 1}
        modalTitleStyle={{}}
        modalContainerStyle={{}}
        modalBodyStyle={{}}
        title={`Confirm Mint`}
      >
        <>
          <TransparentInfoDiv
            labelData={`Your collateral supply`}
            rightLabelUnit={selectedCollateralCoin}
            rightLabelValue={collateralValue.toString()}
          />

          <TransparentInfoDiv
            labelData={`Your share supply`}
            rightLabelUnit={'ARTHX'}
            rightLabelValue={arthxValue.toString()}
          />

          <TransparentInfoDiv
            labelData={`Trading Fee`}
            rightLabelUnit={'ARTH'}
            rightLabelValue={getDisplayBalance(tradingFee, 6)}
          />

          <Divider
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              margin: '15px 0px',
            }}
            // variant={'middle'}
          />

          <TransparentInfoDiv
            labelData={`You will mint`}
            // labelToolTipData={'testing'}
            rightLabelUnit={'ARTH'}
            rightLabelValue={arthValue.toString()}
          />

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
                        borderRadius: '6px',
                      }}
                      fontSize={'inherit'}
                    />
                  }
                  size={'medium'}
                />
              }
              label="Stake $ARTH and earn more rewards"
              labelPlacement="end"
              onChange={handleCheck}
            />
          </CheckboxDiv>
          {checked && (
            <StakingDiv>
              <div>
                <OneLineInput style={{ margin: '0px' }}>
                  <div>
                    <InputLabel style={{ marginTop: '12px' }}>
                      Select how long would you like to stake
                    </InputLabel>
                  </div>
                  <InputNoDisplay>
                    <InternalSpan>{sliderValue} months</InternalSpan>
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
                  marginTop: '5px',
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
                    onChange={handleSliderChange}
                    aria-label="pretto slider"
                    step={1}
                    marks
                    min={1}
                    max={36}
                    valueLabelDisplay="off"
                  />
                  <div
                    style={{
                      marginTop: -15,
                      marginLeft: -15,
                      marginBottom: 15,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <TimeSpan>1 month</TimeSpan>
                    <TimeSpan>3 Years</TimeSpan>
                  </div>
                </div>
              </div>
              <TransparentInfoDiv
                labelData={`Realtime earning`}
                // labelToolTipData={'testing'}
                rightLabelUnit={'MAHA'}
                rightLabelValue={'~100.0'}
                countUp
                cEnd={10}
                cDuration={calcDuration}
                cStart={0}
              />

              <TransparentInfoDiv
                labelData={`ROR`}
                // labelToolTipData={'testing'}
                // rightLabelUnit={''}
                rightLabelValue={String(10 * sliderValue) + '%'}
              />

              <TransparentInfoDiv
                labelData={`APY`}
                // labelToolTipData={'testing'}
                // rightLabelUnit={'MAHA'}
                rightLabelValue={String(10 * sliderValue) + '%'}
              />
            </StakingDiv>
          )}
          <div
            style={{
              flexDirection: 'column-reverse',
              display: 'flex',
              width: '100%',
              marginTop: '10%',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <div style={{ flex: 1, width: '100%', marginTop: 10 }}>
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
                        data1: `Minting ${collateralValue} ARTH cancelled`,
                      }),
                  };
                  props.enqueueSnackbar('timepass', options);
                }}
              />
            </div>
            <div style={{ width: '100%' }}>
              <Button
                text={checked ? 'Confirm Mint and Stake' : 'Confirm Mint'}
                // textStyles={{ color: '#F5F5F5' }}
                size={'lg'}
                onClick={handleMint}
              />
            </div>
          </div>
        </>
      </CustomModal>
      <Grid container style={{ marginTop: '24px' }} spacing={2}>
        <Grid item lg={1} />
        <Grid item lg={5} md={12} sm={12} xs={12}>
          <LeftTopCard className={'custom-mahadao-container'}>
            <LeftTopCardHeader className={'custom-mahadao-container-header'}>
              <ActiveTab />
              <TabContainer onClick={() => props.setType('mint')}>
                <TabTextActive>Mint</TabTextActive>
              </TabContainer>
              <TabContainer onClick={() => props.setType('redeem')}>
                <TabText>Redeem</TabText>
              </TabContainer>
            </LeftTopCardHeader>
            <LeftTopCardContainer className={'custom-mahadao-container-content'}>
              <CustomInputContainer
                ILabelValue={'Enter Collateral'}
                IBalanceValue={`${getDisplayBalance(collateralBalance, 6)}`}
                ILabelInfoValue={''}
                // value={mintColl.toString()}
                disabled={mintCR.eq(0)}
                DefaultValue={collateralValue.toString()}
                LogoSymbol={selectedCollateralCoin}
                hasDropDown={true}
                dropDownValues={collateralTypes}
                ondropDownValueChange={(data: string) => {
                  setSelectedCollateralCoin(data);
                }}
                SymbolText={selectedCollateralCoin}
                inputMode={'numeric'}
                setText={(val: string) => {
                  onCollateralValueChange(val);
                }}
                // Istate={'warning'}
                // msg={'Warning message goes here'}
              />
              <PlusMinusArrow>
                <img src={plus} alt="plus" />
              </PlusMinusArrow>
              <CustomInputContainer
                ILabelValue={'Enter ARTHX'}
                IBalanceValue={`${getDisplayBalance(arthxBalance)}`}
                ILabelInfoValue={'How can i get it?'}
                disabled={mintCR.gte(1000000)}
                href={'https://www.google.com/'}
                DefaultValue={arthxValue.toString()}
                // ILabelInfoValue={'How can i get it?'}
                // DefaultValue={'0'}
                LogoSymbol={'ARTHX'}
                hasDropDown={false}
                SymbolText={'ARTHX'}
                inputMode={'decimal'}
                setText={(val: string) => {
                  onARTHXValueChange(val);
                }}
                // Istate={'error'}
                // msg={'ERROR message goes here'}
              />
              <PlusMinusArrow>
                <img src={arrowDown} alt="arrow" />
              </PlusMinusArrow>
              <CustomInputContainer
                ILabelValue={'You will receive'}
                IBalanceValue={`${getDisplayBalance(arthBalance)}`}
                DefaultValue={arthValue.toString()}
                ILabelInfoValue={''}
                // DefaultValue={'0'}
                LogoSymbol={'ARTH'}
                hasDropDown={false}
                SymbolText={'ARTH'}
                setText={(val: string) => {
                  onARTHValueChange(val);
                }}
              />
              <div>
                <TcContainer>
                  <OneLineInputwomargin>
                    <div style={{ flex: 1 }}>
                      <TextWithIcon>
                        Trading Fee
                        {/*{*<InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />*}*/}
                      </TextWithIcon>
                    </div>
                    <OneLineInputwomargin>
                      <BeforeChip>{getDisplayBalance(tradingFee, 6)}</BeforeChip>
                      <TagChips>ARTH</TagChips>
                    </OneLineInputwomargin>
                  </OneLineInputwomargin>
                </TcContainer>
                <div style={{ marginTop: '32px' }}>
                  {!isWalletConnected ? (
                    <Button
                      text={'Connect Wallet'}
                      size={'lg'}
                      onClick={() => connect('injected')}
                    />
                  ) : (
                    <>
                      {!isCollatArthxApproved && (
                        <>
                          <ApproveButtonContainer>
                            <Button
                              text={
                                isCollatApproved
                                  ? `Approved ${selectedCollateralCoin}`
                                  : !isCollatApproving
                                  ? `Approve ${selectedCollateralCoin}`
                                  : 'Approving...'
                              }
                              size={'lg'}
                              disabled={isCollatApproving || isCollatApproved}
                              onClick={approveCollat}
                            />
                            <div style={{ padding: 5 }} />
                            <Button
                              text={
                                isARTHXApproved
                                  ? 'Approved ARTHX'
                                  : !isARTHXApproving
                                  ? `Approve ARTHX`
                                  : 'Approving...'
                              }
                              size={'lg'}
                              disabled={isARTHXApproving || isARTHXApproved}
                              onClick={approveARTHX}
                            />
                          </ApproveButtonContainer>
                          <br />
                        </>
                      )}
                      <Button
                        text={'Mint'}
                        size={'lg'}
                        variant={'default'}
                        disabled={!isCollatArthxApproved}
                        onClick={() => setOpenModal(1)}
                      />
                    </>
                  )}
                </div>
              </div>
            </LeftTopCardContainer>
          </LeftTopCard>
        </Grid>
        <Grid item lg={5} md={12} sm={12} xs={12}>
          <PoolInfo selectedCollateralCoin={selectedCollateralCoin} />
        </Grid>
        <Grid item lg={1} />
      </Grid>

      <CustomSuccessModal
        modalOpen={successModal}
        setModalOpen={() => setSuccessModal(false)}
        title={'Minting ARTH successful!'}
        subTitle={'View Transaction'}
        subsubTitle={
          'Your transaction is now being mined on the blockchain. You should consider staking your tokens to earn extra rewards!'
        }
        buttonText={'Stake your ARTH'}
        buttonType={'default'}
        redirectTo={'/farming'}
      />
    </>
  );
};

export default withSnackbar(MintTabContent);

const TcContainer = styled.div`
  margin-top: 24px;
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

const ApproveButtonContainer = styled.div`
  display: flex;
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

const StakingDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0 0 0;
`;

const ActiveTab = styled.div`
  position: absolute;
  width: 100px;
  padding: 32px 12px;
  background: linear-gradient(180deg, rgba(244, 127, 87, 0) 0%, #fd565620);
  height: 80px;
  z-index: 0;
  border-bottom: 2px solid #fd5656;
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

const OneLineInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  margin: 5px 0 10px 0;
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

const InputLabel = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.64);
  margin: 0px;
`;

const InternalSpan = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
`;

const InputNoDisplay = styled.span`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 2px 10px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 0px 0px 8px;
`;

const TimeSpan = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
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
