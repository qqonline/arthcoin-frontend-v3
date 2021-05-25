import React, { useEffect, useMemo, useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { Divider } from '@material-ui/core';
import { useWallet } from 'use-wallet';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { parseUnits } from 'ethers/lib/utils';

import { CustomSnack } from '../../../components/SnackBar';
import { getDisplayBalance } from '../../../utils/formatBalance';
import { ValidateNumber } from '../../../components/CustomInputContainer/RegexValidation';
import arrowDown from '../../../assets/svg/arrowDown.svg';
import Button from '../../../components/Button';
import CustomInputContainer from '../../../components/CustomInputContainer';
import CustomModal from '../../../components/CustomModal';
import CustomSuccessModal from '../../../components/CustomSuccesModal';
import plus from '../../../assets/svg/plus.svg';
import PoolInfo from './PoolInfo';
import SlippageContainer from '../../../components/SlippageContainer';
import TransparentInfoDiv from './InfoDiv';
import useApprove, { ApprovalState } from '../../../hooks/callbacks/useApprove';
import useARTHXOraclePrice from '../../../hooks/state/controller/useARTHXPrice';
import useCollateralPoolPrice from '../../../hooks/state/pools/useCollateralPoolPrice';
import useCollectRedemption from '../../../hooks/callbacks/pools/useCollectRedemption';
import useCore from '../../../hooks/useCore';
import usePoolRedeemFees from '../../../hooks/state/pools/usePoolRedeemFees';
import useRedeemableBalances from '../../../hooks/state/pools/useRedeemableBalances';
import useRedeemARTH from '../../../hooks/callbacks/pools/useRedeemARTH';
import useRedeemAlgorithmicARTH from '../../../hooks/callbacks/pools/useRedeemAlgorithmicARTH';
import useRedeemCollateralRatio from '../../../hooks/state/useRedeemCollateralRatio';
import useTokenBalance from '../../../hooks/state/useTokenBalance';
import useTokenDecimals from '../../../hooks/useTokenDecimals';
import useStabilityFee from '../../../hooks/state/controller/useStabilityFee';

interface IProps {
  setType: (type: 'mint' | 'redeem') => void;
}

const RedeemTabContent = (props: WithSnackbarProps & IProps) => {
  useEffect(() => window.scrollTo(0, 0), []);
  
  const core = useCore();
  const { account, connect } = useWallet();

  const [collateralValue, setCollateralValue] = useState<string>('0');
  const [arthxValue, setArthxValue] = useState<string>('0');
  const [arthValue, setArthValue] = useState<string>('0');
  const [openModal, setOpenModal] = useState<0 | 1 | 2>(0);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [selectedRate, setSelectedRate] = useState<number>(0.0);

  const collateralTypes = useMemo(() => core.getCollateralTypes(), [core]);
  const [selectedCollateral, setSelectedReceiveRedeemCoin] = useState(
    core.getDefaultCollateral(),
  );
  const tokenDecimals = useTokenDecimals(selectedCollateral);
  const redeemableBalances = useRedeemableBalances(selectedCollateral);
  const arthxBalance = useTokenBalance(core.ARTHX);
  const arthBalance = useTokenBalance(core.ARTH);
  const collateralBalance = useTokenBalance(core.tokens[selectedCollateral]);
  const collateralPool = core.getCollatearalPool(selectedCollateral);
  const redeemCR = useRedeemCollateralRatio();
  const colletralRatio = redeemCR.div(10000).toNumber();
  const [mahaApproveStatus, approveARTHX] = useApprove(core.MAHA, collateralPool.address);
  const [arthApproveStatus, approveCollat] = useApprove(core.ARTH, collateralPool.address);
  const redeemFee = usePoolRedeemFees(selectedCollateral);
  const stabilityFee = useStabilityFee();
  const collateralToGMUPrice = useCollateralPoolPrice(selectedCollateral);
  const arthxToGMUPrice = useARTHXOraclePrice();
  const collectRedeemption = useCollectRedemption(selectedCollateral);
   const redeemARTH = useRedeemAlgorithmicARTH(
    selectedCollateral,
    Number(arthValue),
    BigNumber.from(0),
  );

  const isWalletConnected = !!account;
  const isMAHAApproving = mahaApproveStatus === ApprovalState.PENDING;
  const isMAHAApproved = mahaApproveStatus === ApprovalState.APPROVED;

  const isArthApproved = arthApproveStatus === ApprovalState.APPROVED;
  const isArthApproving = arthApproveStatus === ApprovalState.PENDING;
    
  const tradingFee = useMemo(() => {
    const valueOnWhichToChargeFee = redeemCR.eq(1e6) ? collateralValue : arthValue;

    return BigNumber
      .from(parseUnits(`${valueOnWhichToChargeFee}`, tokenDecimals))
      .mul(redeemFee)
      .div(1e6)
  }, [collateralValue, arthValue, redeemCR, tokenDecimals, redeemFee]);

  const stabilityFeeAmount = useMemo(() => {
   return BigNumber
      .from(parseUnits(`${arthValue}`, 18))
      .mul(stabilityFee)
      .div(100);
  }, [arthValue, stabilityFee]);

  const handleRedeem = () => {
    redeemARTH(() => {
      setOpenModal(2);
      setSuccessModal(true);
    });
  };

  const isArthMahaApproved = useMemo(() => {
   if (stabilityFeeAmount.lte(0) && Number(arthValue)) return !!account && isArthApproved;
   if (stabilityFeeAmount.gt(0) && !Number(arthValue)) return !!account && isArthApproved;

   return isArthApproved && isMAHAApproved && !!account;
  }, [
    account,
    isMAHAApproved,
    isArthApproved,
    stabilityFeeAmount,
    arthValue
  ]);

  // const redeemARTH = useRedeemARTH(
  //   selectedCollateral,
  //   Number(arthValue),
  //   Number(arthxValue),
  //   Number(collateralValue),
  // );
  
  const onCollateralValueChange = async (val: string) => {
    if (val === '' || collateralToGMUPrice.lte(0)) {
      setCollateralValue('0');
      setArthxValue('0');
      setArthValue('0');
      return;
    }

    let check: boolean = ValidateNumber(val);
    setCollateralValue(check ? val : String(Number(val)));
    if (!check) return;
    const valueInNumber: number = Number(val);
    if (!valueInNumber) return;

    let arthxShareValueInCollatTerms: number = 0;
    if (!arthxToGMUPrice.eq(0) && redeemCR.lt(1e6)) {
      arthxShareValueInCollatTerms =
        ((100 * valueInNumber) / colletralRatio) * ((100 - colletralRatio) / 100);

      const finalArthxValue = collateralToGMUPrice
        .mul(BigNumber.from(
          parseUnits(`${arthxShareValueInCollatTerms}`, tokenDecimals)
        ))
        .div(arthxToGMUPrice);
      setArthxValue(getDisplayBalance(finalArthxValue, 6, 3));
    }

    const finalArthValue = collateralToGMUPrice
      .mul(BigNumber.from(
        parseUnits(`${arthxShareValueInCollatTerms + valueInNumber}`, tokenDecimals)
      ))
      .div(1e6);
    setArthValue(getDisplayBalance(finalArthValue, 6, 3));
  };

  const onARTHXValueChange = async (val: string) => {
    if (val === '' || arthxToGMUPrice.lte(0)) {
      setCollateralValue('0');
      setArthxValue('0');
      setArthValue('0');
      return;
    }

    let check: boolean = ValidateNumber(val);
    setArthxValue(check ? val : String(Number(val)));
    if (!check) return;
    const valueInNumber: number = Number(val);
    if (!valueInNumber) return;

    let colletralValueInARTHXTerms: number = 0;
    if (!collateralToGMUPrice.eq(0) && redeemCR.gt(0)) {
      colletralValueInARTHXTerms =
        ((100 * valueInNumber) / colletralRatio) * (colletralRatio / 100);

      const finalColletralValue = arthxToGMUPrice
        .mul(BigNumber.from(
          parseUnits(`${colletralValueInARTHXTerms}`, tokenDecimals)
        ))
        .div(collateralToGMUPrice);
      setCollateralValue(getDisplayBalance(finalColletralValue, 6, 3));
    }
    
    const finalArthValue = arthxToGMUPrice
      .mul(BigNumber.from(
        parseUnits(`${colletralValueInARTHXTerms + valueInNumber}`, tokenDecimals)
      ))
      .div(1e6);
    setArthValue(getDisplayBalance(finalArthValue, 6, 3));
  };

  const onARTHValueChange = async (val: string) => {
    if (val === '' || collateralToGMUPrice.lte(0) || arthxToGMUPrice.lte(0)) {
      setCollateralValue('0');
      setArthxValue('0');
      setArthValue('0');
      return;
    }

    let check: boolean = ValidateNumber(val);
    setArthValue(check ? val : String(Number(val)));
    if (!check) return;
    const valueInNumber: number = Number(val);
    if (!valueInNumber) return;

    if (redeemCR.gt(0)) {
      const collateralValueInCollatTerms = valueInNumber * (colletralRatio / 100);
      const finalCollateralValue = BigNumber
        .from(parseUnits(`${collateralValueInCollatTerms}`, tokenDecimals))
        .mul(1e6)
        .div(collateralToGMUPrice);
      setCollateralValue(getDisplayBalance(finalCollateralValue, 6, 3));
    }

    if (redeemCR.lt(1e6)) {
      const arthsShareInCollatTerms = valueInNumber * ((100 - colletralRatio) / 100);
      const finalarthxShareValue = BigNumber
        .from(parseUnits(`${arthsShareInCollatTerms}`, tokenDecimals))
        .mul(1e6)
        .div(arthxToGMUPrice);
      setArthxValue(getDisplayBalance(finalarthxShareValue, 6, 3));
    }
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
        title={`Confirm Redeem ARTH`}
      >
        <>
          <TransparentInfoDiv
            labelData={`Your redeem amount`}
            rightLabelUnit={'ARTH'}
            rightLabelValue={Number(arthValue).toLocaleString()}
          />

          <TransparentInfoDiv
            labelData={`Trading Fee`}
            labelToolTipData={'testing'}
            rightLabelUnit={selectedCollateral}
            rightLabelValue={Number(getDisplayBalance(tradingFee, 6)).toLocaleString()}
          />

          {/* <TransparentInfoDiv
            labelData={`Stability Fee`}
            labelToolTipData={'testing'}
            rightLabelUnit={'MAHA'}
            rightLabelValue={'0.05'}
          /> */}

          <Divider
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              margin: '15px 0px',
            }}
          // variant={'middle'}
          />

          <TransparentInfoDiv
            labelData={`You will receive collateral`}
            // labelToolTipData={'testing'}
            rightLabelUnit={selectedCollateral}
            rightLabelValue={Number(collateralValue).toLocaleString()}
          />

          <TransparentInfoDiv
            labelData={`You will receive share`}
            // labelToolTipData={'testing'}
            rightLabelUnit={'ARTHX'}
            rightLabelValue={Number(arthxValue).toLocaleString()}
          />

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
                        data1: `Redeeming ${arthValue} ARTH cancelled`,
                      }),
                  };
                  props.enqueueSnackbar('timepass', options);
                }}
              />
            </div>
            <div style={{ width: '100%' }}>
              <Button
                disabled={
                  !isArthMahaApproved || 
                  !(Number(arthxValue) + Number(collateralValue)) ||
                  !(Number(arthValue))
                }
                text={'Redeem ARTH'}
                // textStyles={{ color: '#F5F5F5' }}
                size={'lg'}
                onClick={() => {
                  handleRedeem();
                  // // setType('Redeem')
                  // setOpenModal(0);
                  // let options = {
                  //   content: () =>
                  //     CustomSnack({
                  //       onClose: props.closeSnackbar,
                  //       type: 'green',
                  //       data1: `Redeeming ${arthValue} ARTH`,
                  //       data2: `Stability Fee = 1%`,
                  //     }),
                  // };
                  // props.enqueueSnackbar('timepass', options);
                }}
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
              <div style={{ display: 'flex' }}>
                <TabContainer onClick={() => props.setType('mint')}>
                  <TabText>Mint</TabText>
                </TabContainer>
                <TabContainer onClick={() => props.setType('redeem')}>
                  <ActiveTab />
                  <TabTextActive>Redeem</TabTextActive>
                </TabContainer>
              </div>
              <SlippageContainer
                defaultRate={selectedRate}
                onRateChange={(data) => {
                  setSelectedRate(data);
                }}
              />
            </LeftTopCardHeader>
            <LeftTopCardContainer className={'custom-mahadao-container-content'}>
              <CustomInputContainer
                ILabelValue={'Enter Redeem Amount'}
                IBalanceValue={`${getDisplayBalance(arthBalance)}`}
                ILabelInfoValue={''}
                DefaultValue={arthValue.toString()}
                LogoSymbol={'ARTH'}
                hasDropDown={false}
                SymbolText={'ARTH'}
                inputMode={'decimal'}
                setText={onARTHValueChange}
                tagText={'MAX'}
              />
              <PlusMinusArrow>
                <img src={arrowDown} alt="arrow" />
              </PlusMinusArrow>
              <CustomInputContainer
                ILabelValue={'You receive'}
                IBalanceValue={`${getDisplayBalance(collateralBalance, 6)}`}
                // ILabelInfoValue={'How can i get it?'}
                DefaultValue={collateralValue.toString()}
                LogoSymbol={selectedCollateral}
                hasDropDown={true}
                setText={onCollateralValueChange}
                dropDownValues={collateralTypes}
                ondropDownValueChange={(data) => {
                  setSelectedReceiveRedeemCoin(data);
                  setTimeout(() => {
                    onCollateralValueChange(collateralValue.toString());
                  }, 1000);
                }}
                SymbolText={selectedCollateral}
                tagText={'MAX'}
                DisableMsg={
                  colletralRatio === 0 ? 'Currently Redeem Collateral ratio is 0%' : ''
                }
              />
              <PlusMinusArrow>
                <img src={plus} alt="plus" />
              </PlusMinusArrow>
              <CustomInputContainer
                ILabelValue={'You receive'}
                IBalanceValue={`${getDisplayBalance(arthxBalance)}`}
                ILabelInfoValue={''}
                DefaultValue={arthxValue.toString()}
                LogoSymbol={'ARTHX'}
                hasDropDown={false}
                SymbolText={'ARTHX'}
                setText={onARTHXValueChange}
                tagText={'MAX'}
                DisableMsg={colletralRatio === 100 ? 'Currently Collateral ratio is 100%' : ''}
              />
              <div>
                <OneLineInputwomargin>
                  <div style={{ flex: 1, marginTop: 10 }}>
                    <TextWithIcon>Trading Fee</TextWithIcon>
                  </div>
                  <OneLineInputwomargin>
                    <BeforeChip>{Number(getDisplayBalance(tradingFee, 6)).toLocaleString()}</BeforeChip>
                    <TagChips>{selectedCollateral}</TagChips>
                  </OneLineInputwomargin>
                </OneLineInputwomargin>

                <OneLineInput>
                  <div style={{ flex: 1 }}>
                    <TextWithIcon>
                      Stability Fee
                      {/*{/<InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />/}*/}
                    </TextWithIcon>
                  </div>
                  <OneLineInput>
                    <BeforeChip>{Number(getDisplayBalance(stabilityFeeAmount, 2, 2)).toLocaleString()}</BeforeChip>
                    <TagChips>MAHA</TagChips>
                  </OneLineInput>
                </OneLineInput>
                {!isWalletConnected ? (
                  <Button
                    text={'Connect Wallet'}
                    size={'lg'}
                    onClick={() => connect('injected')}
                  />
                ) : (
                  <>
                    {!isArthMahaApproved && (
                      <>
                        <ApproveButtonContainer>
                          <Button
                            text={
                              isArthApproved
                                ? `Approved ARTH`
                                : !isArthApproving
                                  ? `Approve ARTH`
                                  : 'Approving...'
                            }
                            size={'lg'}
                            disabled={isArthApproved || !Number(arthValue)}
                            onClick={approveCollat}
                            loading={isArthApproving}
                          />
                          <div style={{ padding: 5 }} />
                          <Button
                            text={
                              isMAHAApproved
                                ? 'Approved MAHA'
                                : !isMAHAApproving
                                  ? `Approve MAHA`
                                  : 'Approving...'
                            }
                            size={'lg'}
                            disabled={isMAHAApproved || stabilityFeeAmount.lte(0)}
                            onClick={approveARTHX}
                            loading={isMAHAApproving}
                          />
                        </ApproveButtonContainer>
                        <br />
                      </>
                    )}

                    {redeemableBalances[0].gt(0) || redeemableBalances[1].gt(0) ? (
                      <Button
                        text={'Collect Redeemption'}
                        size={'lg'}
                        variant={'default'}
                        onClick={collectRedeemption}
                      />
                    ) : (
                      <Button
                        text={'Redeem'}
                        size={'lg'}
                        variant={'default'}
                        disabled={
                          !isArthMahaApproved || 
                          !(Number(arthxValue) + Number(collateralValue)) ||
                          !(Number(arthValue))
                        }
                        onClick={() => setOpenModal(1)}
                      />
                    )}
                  </>
                )}
              </div>
            </LeftTopCardContainer>
          </LeftTopCard>
        </Grid>
        <Grid item lg={5} md={12} sm={12} xs={12}>
          <PoolInfo selectedCollateralCoin={selectedCollateral} />
        </Grid>
        <Grid item lg={1} />
      </Grid>
      <CustomSuccessModal
        modalOpen={successModal}
        setModalOpen={() => setSuccessModal(false)}
        title={'Redeeming ARTH successful!'}
        subTitle={''}
        subsubTitle={'Your ARTH has now been redeemed for its underlying collateral'}
        buttonText={'Checkout Staking Pools'}
        // buttonType={'default'}
        buttonHref={'/#/farming'}
      />
    </>
  );
};

export default withSnackbar(RedeemTabContent);

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
  justify-content: space-between;
  align-items: center;
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
  color: rgba(255, 255, 255, 0.88);
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

const ApproveButtonContainer = styled.div`
  display: flex;
`;
