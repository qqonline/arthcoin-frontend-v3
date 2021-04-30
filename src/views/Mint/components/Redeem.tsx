import React, { useEffect, useMemo, useState } from 'react';
import { CustomSnack } from '../../../components/SnackBar';
import { Divider } from '@material-ui/core';
import { getDisplayBalance } from '../../../utils/formatBalance';
import { useWallet } from 'use-wallet';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import arrowDown from '../../../assets/svg/arrowDown.svg';
import Button from '../../../components/Button';
import CustomInputContainer from '../../../components/CustomInputContainer';
import CustomModal from '../../../components/CustomModal';
import CustomSuccessModal from '../../../components/CustomSuccesModal';
import Grid from '@material-ui/core/Grid';
import plus from '../../../assets/svg/plus.svg';
import PoolInfo from './PoolInfo';
import styled from 'styled-components';
import TransparentInfoDiv from './InfoDiv';
import useApprove, { ApprovalState } from '../../../hooks/callbacks/useApprove';
import useCore from '../../../hooks/useCore';
import useTokenBalance from '../../../hooks/state/useTokenBalance';
import useRedeemCollateralRatio from '../../../hooks/state/useRedeemCollateralRatio';
import useARTHXOraclePrice from '../../../hooks/state/useARTHXOraclePrice';
import useCollateralPoolPrice from '../../../hooks/state/pools/useCollateralPoolPrice';
import usePoolRedeemFees from '../../../hooks/state/pools/usePoolRedeemFees';
import { BigNumber } from '@ethersproject/bignumber';
import useRedeemARTH from '../../../hooks/callbacks/pools/useRedeemARTH';

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

  const redeemFee = usePoolRedeemFees(selectedCollateral)
  const collateralToGMUPrice = useCollateralPoolPrice(selectedCollateral);
  const arthxToGMUPrice = useARTHXOraclePrice();

  const redeemARTH = useRedeemARTH(
    selectedCollateral,
    Number(arthValue),
    Number(arthxValue),
    Number(collateralValue),
    redeemFee,
    0.1,
  );

  const handleRedeem = () => {
    redeemARTH(() => {
      setOpenModal(2);
      setSuccessModal(true);
    });
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
  };

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

          <TransparentInfoDiv
            labelData={`Stability Fee`}
            labelToolTipData={'testing'}
            rightLabelUnit={'MAHA'}
            rightLabelValue={'0.05'}
          />

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
                  handleRedeem()
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
              <TabContainer onClick={() => props.setType('mint')}>
                <TabText>Mint</TabText>
              </TabContainer>
              <TabContainer onClick={() => props.setType('redeem')}>
                <ActiveTab />
                <TabTextActive>Redeem</TabTextActive>
              </TabContainer>
            </LeftTopCardHeader>
            <LeftTopCardContainer className={'custom-mahadao-container-content'}>
              <CustomInputContainer
                ILabelValue={'Enter Redeem Amount'}
                IBalanceValue={`Balance ${getDisplayBalance(arthBalance)}`}
                ILabelInfoValue={''}
                DefaultValue={arthValue.toString()}
                LogoSymbol={'ARTH'}
                hasDropDown={false}
                SymbolText={'ARTH'}
                inputMode={'decimal'}
                setText={onARTHValueChange}
              />
              <PlusMinusArrow>
                <img src={arrowDown} alt="arrow" />
              </PlusMinusArrow>
              <CustomInputContainer
                ILabelValue={'You receive'}
                IBalanceValue={`Balance ${getDisplayBalance(collateralBalance, 6)}`}
                // ILabelInfoValue={'How can i get it?'}
                DefaultValue={collateralValue.toString()}
                LogoSymbol={selectedCollateral}
                hasDropDown={true}
                setText={onCollateralValueChange}
                dropDownValues={collateralTypes}
                ondropDownValueChange={setSelectedReceiveRedeemCoin}
                SymbolText={selectedCollateral}
              />
              <PlusMinusArrow>
                <img src={plus} alt="plus" />
              </PlusMinusArrow>
              <CustomInputContainer
                ILabelValue={'You receive'}
                IBalanceValue={`Balance ${getDisplayBalance(arthxBalance)}`}
                ILabelInfoValue={''}
                DefaultValue={arthxValue.toString()}
                LogoSymbol={'ARTHX'}
                hasDropDown={false}
                SymbolText={'ARTHX'}
                setText={onARTHXValueChange}
              />
              <div>
                <OneLineInputwomargin>
                  <div style={{ flex: 1, marginTop: 10 }}>
                    <TextWithIcon>
                      Trading Fee
                    </TextWithIcon>
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
                    <Button
                      text={'Redeem'}
                      size={'lg'}
                      variant={'default'}
                      disabled={!isArthMahaApproved}
                      onClick={() => setOpenModal(1)}
                    />
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
        title={'Minting ARTH successful!'}
        subTitle={'View Transaction'}
        subsubTitle={'You should consider stake your ARTH to earn higher APY'}
        buttonText={'Stake your ARTH'}
        buttonType={'default'}
        redirectTo={'/farming'}
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