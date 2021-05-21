import React, { useEffect, useMemo, useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { CustomSnack } from '../../../components/SnackBar';
import { Divider } from '@material-ui/core';
import { getDisplayBalance } from '../../../utils/formatBalance';
import { useWallet } from 'use-wallet';
import { ValidateNumber } from '../../../components/CustomInputContainer/RegexValidation';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import arrowDown from '../../../assets/svg/arrowDown.svg';
import Button from '../../../components/Button';
import CustomInputContainer from '../../../components/CustomInputContainer';
import CustomModal from '../../../components/CustomModal';
import CustomSuccessModal from '../../../components/CustomSuccesModal';
import Grid from '@material-ui/core/Grid';
import plus from '../../../assets/svg/plus.svg';
import PoolInfo from './PoolInfo';
import SlippageContainer from '../../../components/SlippageContainer';
import styled from 'styled-components';
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
  // const [arthxValue, setArthxValue] = useState<string>('0');
  // const [collateralValue, setCollateralValue] = useState<string>('0');
  // const [arthValue, setArthValue] = useState<string>('0');

  const [openModal, setOpenModal] = useState<0 | 1 | 2>(0);
  const collateralTypes = useMemo(() => core.getCollateralTypes(), [core]);
  const [selectedCollateral, setSelectedReceiveRedeemCoin] = useState(
    core.getDefaultCollateral(),
  );
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [selectedRate, setSelectedRate] = useState<number>(0.0);

  const redeemableBalances = useRedeemableBalances(selectedCollateral);

  const arthxBalance = useTokenBalance(core.ARTHX);
  const arthBalance = useTokenBalance(core.ARTH);
  const collateralBalance = useTokenBalance(core.tokens[selectedCollateral]);

  const collateralPool = core.getCollatearalPool(selectedCollateral);

  const redeemCR = useRedeemCollateralRatio();
  const colletralRatio = redeemCR.div(10000).toNumber();

  const [mahaApproveStatus, approveARTHX] = useApprove(core.MAHA, collateralPool.address);
  const [arthApproveStatus, approveCollat] = useApprove(core.ARTH, collateralPool.address);

  const isWalletConnected = !!account;
  const isMAHAApproving = mahaApproveStatus === ApprovalState.PENDING;
  const isMAHAApproved = mahaApproveStatus === ApprovalState.APPROVED;

  const isArthApproved = arthApproveStatus === ApprovalState.APPROVED;
  const isArthApproving = arthApproveStatus === ApprovalState.PENDING;
  const isArthMahaApproved = useMemo(() => isMAHAApproved && !!account && isArthApproved, [
    account,
    isMAHAApproved,
    isArthApproved,
  ]);

  const redeemFee = usePoolRedeemFees(selectedCollateral);
  const collateralToGMUPrice = useCollateralPoolPrice(selectedCollateral);
  const arthxToGMUPrice = useARTHXOraclePrice();

  // const redeemARTH = useRedeemARTH(
  //   selectedCollateral,
  //   Number(arthValue),
  //   Number(arthxValue),
  //   Number(collateralValue),
  // );

  const redeemARTH = useRedeemAlgorithmicARTH(
    selectedCollateral,
    Number(arthValue),
    BigNumber.from(0),
  );

  const collectRedeemption = useCollectRedemption(selectedCollateral);

  const handleRedeem = () => {
    redeemARTH(() => {
      setOpenModal(2);
      setSuccessModal(true);
    });
  };

  const onCollateralValueChange = async (val: string) => {
    if (val === '') {
      setCollateralValue('');
      setArthxValue('0');
      setArthValue('0');
      return;
    }

    let check = ValidateNumber(val);
    setCollateralValue(check ? val : String(Number(val)));
    if (!check) return;

    const valueInNumber = Number(val);
    if (!valueInNumber) return;

    //ARTHX Calculation
    var arthxShareValueInCollatTerms: number = 0;
    if (!arthxToGMUPrice.eq(0)) {
      arthxShareValueInCollatTerms =
        ((100 * valueInNumber) / colletralRatio) * ((100 - colletralRatio) / 100);

      const finalArthxValue = collateralToGMUPrice
        .mul(Math.floor(arthxShareValueInCollatTerms * 1e6))
        .div(arthxToGMUPrice);

      setArthxValue(getDisplayBalance(finalArthxValue, 6, 3));
    }

    //ARTH Calculation
    const finalArthValue = collateralToGMUPrice
      .mul(Math.floor((arthxShareValueInCollatTerms + valueInNumber) * 1e6))
      .div(1e6);

    setArthValue(getDisplayBalance(finalArthValue, 6, 3));
  };

  const onARTHXValueChange = async (val: string) => {
    if (val === '') {
      setCollateralValue('0');
      setArthxValue('');
      setArthValue('0');
      return;
    }

    let check = ValidateNumber(val);
    setArthxValue(check ? val : String(Number(val)));
    if (!check) return;

    const valueInNumber = Number(val);
    if (!valueInNumber) return;

    //Colletral Calculation
    var colletralValueInCollatTerms: number = 0;
    if (!arthxToGMUPrice.eq(0)) {
      colletralValueInCollatTerms =
        ((100 * valueInNumber) / colletralRatio) * (colletralRatio / 100);

      const finalColletralValue = collateralToGMUPrice
        .mul(Math.floor(colletralValueInCollatTerms * 1e6))
        .div(arthxToGMUPrice);

      setCollateralValue(getDisplayBalance(finalColletralValue, 6, 3));
    }

    //ARTH Calculation
    const finalArthValue = collateralToGMUPrice
      .mul(Math.floor((colletralValueInCollatTerms + valueInNumber) * 1e6))
      .div(1e6);

    setArthValue(getDisplayBalance(finalArthValue, 6, 3));

    /*const arthxGMUValue = BigNumber.from(valueInNumber * 1e6)
      .mul(1e6)
      .div(arthxToGMUPrice);
    const arthxGMUValueInNumber = arthxGMUValue.toNumber();

    const collateralGMUValue =
      ((100 * arthxGMUValueInNumber) / (100 - colletralRatio)) * (colletralRatio / 100);

    const finalCollateralValue = BigNumber.from(1e6)
      .mul(Math.floor(collateralGMUValue * 1e6))
      .div(collateralToGMUPrice);

    const finalArthValue = arthxGMUValue.add(
      finalCollateralValue.mul(collateralToGMUPrice).div(1e6),
    );
    // .div(arthxToGMUPrice);

    setCollateralValue(getDisplayBalance(finalCollateralValue, 6, 3));
    setArthValue(getDisplayBalance(finalArthValue, 6, 3));*/
  };

  const onARTHValueChange = async (val: string) => {
    if (val === '') {
      setCollateralValue('0');
      setArthxValue('0');
      setArthValue('');
      return;
    }

    let check = ValidateNumber(val);
    setArthValue(check ? val : String(Number(val)));
    if (!check) return;

    const valueInNumber = Number(val);
    if (!valueInNumber) return;

    //Calc Colletaral
    if (!collateralToGMUPrice.eq(0)) {
      const collateralValueInCollatTerms = valueInNumber * (colletralRatio / 100);
      const finalCollateralValue = BigNumber.from(collateralValueInCollatTerms * 1e6)
        .mul(1e6)
        .div(collateralToGMUPrice);
      setCollateralValue(getDisplayBalance(finalCollateralValue, 6, 3));
    }

    //Calc ARTHX
    if (!arthxToGMUPrice.eq(0)) {
      const arthsShareInCollatTerms = valueInNumber * ((100 - colletralRatio) / 100);
      const finalarthxShareValue = BigNumber.from(arthsShareInCollatTerms * 1e6)
        .mul(1e6)
        .div(arthxToGMUPrice);
      setArthxValue(getDisplayBalance(finalarthxShareValue, 6, 3));
    }
  };
  /*const onARTHXValueChange = async (val: string) => {
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

    setArthxValue(getDisplayBalance(finalArthxValue, 6, 3));
    setArthValue(getDisplayBalance(finalArthValue, 6, 3));
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
  };*/

  const tradingFee = useMemo(() => {
    const mintingAmount = BigNumber.from(Math.floor(Number(collateralValue) * 1e6));
    return mintingAmount.mul(redeemFee).div(1e6);
  }, [collateralValue, redeemFee]);

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
            rightLabelValue={arthValue.toString()}
          />

          <TransparentInfoDiv
            labelData={`Trading Fee`}
            labelToolTipData={'testing'}
            rightLabelUnit={selectedCollateral}
            rightLabelValue={getDisplayBalance(tradingFee, 6)}
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
            rightLabelValue={collateralValue}
          />

          <TransparentInfoDiv
            labelData={`You will receive share`}
            // labelToolTipData={'testing'}
            rightLabelUnit={'ARTHX'}
            rightLabelValue={arthxValue}
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
                  console.log('rates', data);
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
                    <BeforeChip>{getDisplayBalance(tradingFee, 6)}</BeforeChip>
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
                    <BeforeChip>0.05</BeforeChip>
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
                            disabled={isArthApproving || isArthApproved}
                            onClick={approveCollat}
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
                            disabled={isMAHAApproving || isMAHAApproved}
                            onClick={approveARTHX}
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
                        disabled={!isArthMahaApproved}
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
