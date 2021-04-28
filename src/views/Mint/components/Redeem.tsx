import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import useCore from '../../../hooks/useCore';
import Grid from '@material-ui/core/Grid';
import Button from '../../../components/Button';
import arrowDown from '../../../assets/svg/arrowDown.svg';
import plus from '../../../assets/svg/plus.svg';
import {
  Divider,
} from '@material-ui/core';
import TransparentInfoDiv from './InfoDiv';
import HtmlTooltip from '../../../components/HtmlTooltip';
import CustomInputContainer from '../../../components/CustomInputContainer';
import CustomModal from '../../../components/CustomModal';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { CustomSnack } from '../../../components/SnackBar';
import CustomToolTip from '../../../components/CustomTooltip';
import CustomSuccessModal from '../../../components/CustomSuccesModal';
import useTokenBalance from '../../../hooks/state/useTokenBalance';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useApprove, { ApprovalState } from '../../../hooks/callbacks/useApprove';
import { useWallet } from 'use-wallet';

interface IProps {
  setType: (type: 'Mint' | 'Redeem') => void;
}
const RedeemTabContent = (props: WithSnackbarProps & IProps) => {

  useEffect(() => window.scrollTo(0, 0), []);
  const core = useCore();
  const { account, connect } = useWallet()

  const [redeemReceive, setRedeemReceive] = useState<string>('0');
  const [redeemReceiveS, setRedeemReceiveS] = useState<string>('0');
  const [redeemAmount, setRedeemAmount] = useState<string>('0');
  const type = 'Redeem'
  const [openModal, setOpenModal] = useState<0 | 1 | 2>(0);
  const collateralTypes = useMemo(() => core.getCollateralTypes(), [core]);
  const [selectedCollateral, setSelectedReceiveRedeemCoin] = useState(
    core.getDefaultCollateral()
  );
  const [successModal, setSuccessModal] = useState<boolean>(false);

  const arthxBalance = useTokenBalance(core.ARTHX)
  const arthBalance = useTokenBalance(core.ARTH)
  const collateralBalance = useTokenBalance(core.tokens[selectedCollateral])

  const collateralPool = core.getCollatearalPool(selectedCollateral)

  const [mahaApproveStatus, approveARTHX] = useApprove(
    core.MAHA,
    collateralPool.address,
  );

  const [arthApproveStatus, approveCollat] = useApprove(
    core.ARTH,
    collateralPool.address,
  );

  const isWalletConnected = !!account
  const isMAHAApproving = mahaApproveStatus === ApprovalState.PENDING
  const isMAHAApproved = mahaApproveStatus === ApprovalState.APPROVED

  const isArthApproved = arthApproveStatus === ApprovalState.APPROVED
  const isArthApproving = arthApproveStatus === ApprovalState.PENDING
  const isArthMahaApproved = useMemo(() => isMAHAApproved && !!account && isArthApproved, [account, isMAHAApproved, isArthApproved])

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
            labelData={`Your ${type.toLocaleLowerCase()} amount`}
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
              margin: '15px 0px',
            }}
          // variant={'middle'}
          />

          <TransparentInfoDiv
            labelData={`You will receive collateral`}
            // labelToolTipData={'testing'}
            rightLabelUnit={selectedCollateral}
            rightLabelValue={'123'}
          />

          <TransparentInfoDiv
            labelData={`You will receive share`}
            // labelToolTipData={'testing'}
            rightLabelUnit={'ARTHX'}
            rightLabelValue={'1000.00'}
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
                        data1: `Redeeming ${redeemAmount} ARTH cancelled`,
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
                  // setType('Redeem')
                  setOpenModal(0);
                  let options = {
                    content: () =>
                      CustomSnack({
                        onClose: props.closeSnackbar,
                        type: 'green',
                        data1: `Redeeming ${redeemAmount} ARTH`,
                        data2: `Stability Fee = 4%`,
                      }),
                  };
                  props.enqueueSnackbar('timepass', options);
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
              <TabContainer onClick={() => props.setType('Mint')}>
                <TabText>Mint</TabText>
              </TabContainer>
              <TabContainer onClick={() => props.setType('Redeem')}>
                <ActiveTab />
                <TabTextActive>Redeem</TabTextActive>
              </TabContainer>
            </LeftTopCardHeader>
            <LeftTopCardContainer className={'custom-mahadao-container-content'}>
              <CustomInputContainer
                ILabelValue={'Enter Redeem Amount'}
                IBalanceValue={`Balance ${getDisplayBalance(arthBalance)}`}
                ILabelInfoValue={''}
                DefaultValue={redeemAmount.toString()}
                LogoSymbol={'ARTH'}
                hasDropDown={false}
                SymbolText={'ARTH'}
                inputMode={'decimal'}
                setText={(val: string) => setRedeemAmount(String(val))}
              />
              <PlusMinusArrow>
                <img src={arrowDown} />
              </PlusMinusArrow>
              <CustomInputContainer
                ILabelValue={'You receive'}
                IBalanceValue={`Balance ${getDisplayBalance(collateralBalance)}`}
                // ILabelInfoValue={'How can i get it?'}
                DefaultValue={redeemReceive.toString()}
                LogoSymbol={selectedCollateral}
                hasDropDown={true}
                setText={(val: string) => setRedeemReceive(String(val))}
                dropDownValues={collateralTypes}
                ondropDownValueChange={(data: string) => {
                  setSelectedReceiveRedeemCoin(data);
                }}
                SymbolText={selectedCollateral}
              />
              <PlusMinusArrow>
                <img src={plus} alt="plus" />
              </PlusMinusArrow>
              <CustomInputContainer
                ILabelValue={'You receive'}
                IBalanceValue={`Balance ${getDisplayBalance(arthxBalance)}`}
                ILabelInfoValue={''}
                DefaultValue={redeemReceiveS.toString()}
                setText={(val: string) => setRedeemReceiveS(String(val))}
                LogoSymbol={'ARTHX'}
                hasDropDown={false}
                SymbolText={'ARTHX'}
              />
              <div>
                {/* <TcContainer> */}
                <OneLineInputwomargin>
                  <div style={{ flex: 1, marginTop: 10 }}>
                    <TextWithIcon>
                      Trading Fee
                      {/*{/<InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />/}*/}
                    </TextWithIcon>
                  </div>
                  <OneLineInputwomargin>
                    <BeforeChip>0.05</BeforeChip>
                    <TagChips>{selectedCollateral}</TagChips>
                  </OneLineInputwomargin>
                </OneLineInputwomargin>
                {/* </TcContainer> */}
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
                {
                  !isWalletConnected ? (
                    <Button
                      text={'Connect Wallet'}
                      size={'lg'}
                      onClick={() => connect('injected')}
                    />
                  ) : (
                    <>
                      {
                        !isArthMahaApproved && (
                          <>
                            <ApproveButtonContainer>
                              <Button
                                text={
                                  isArthApproved ? `Approved ARTH` :
                                    !isArthApproving ? `Approve ARTH` : 'Approving...'
                                }
                                size={'lg'}
                                disabled={isArthApproving || isArthApproved}
                                onClick={approveCollat}
                              />
                              <div style={{ padding: 5 }} />
                              <Button
                                text={
                                  isMAHAApproved ? 'Approved MAHA' :
                                    !isMAHAApproving ? `Approve MAHA` : 'Approving...'
                                }
                                size={'lg'}
                                disabled={isMAHAApproving || isMAHAApproved}
                                onClick={approveARTHX}
                              />
                            </ApproveButtonContainer>
                            <br />
                          </>
                        )
                      }
                      <Button
                        text={'Redeem'}
                        size={'lg'}
                        variant={'default'}
                        disabled={!isArthMahaApproved}
                        onClick={() => setOpenModal(1)}
                      />
                    </>
                  )
                }
              </div>
            </LeftTopCardContainer>
          </LeftTopCard>
        </Grid>
        <Grid item lg={5} md={12} sm={12} xs={12}>
          <RightTopCard className={'custom-mahadao-box'}>
            <div style={{ marginBottom: '12px' }}>
              <OneLineInput>
                <div style={{ flex: 1 }}>
                  <TextForInfoTitle>ARTHX Oracle Price</TextForInfoTitle>
                </div>
                <InputLabelSpanRight>$5.4</InputLabelSpanRight>
              </OneLineInput>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <OneLineInput>
                <div style={{ flex: 1 }}>
                  <TextForInfoTitle>
                    Collateral Ratio
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <ToolTipFont>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text
                            ever since the 1500s, when an unknown printer took a galley of type
                            and scrambled
                          </ToolTipFont>
                        </React.Fragment>
                      }
                    >
                      <CustomToolTip />
                    </HtmlTooltip>
                  </TextForInfoTitle>
                </div>
                <InputLabelSpanRight>86%</InputLabelSpanRight>
              </OneLineInput>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <OneLineInput>
                <div style={{ flex: 1 }}>
                  <TextForInfoTitle>Pool Balance</TextForInfoTitle>
                </div>
                <InputLabelSpanRight>154.6M</InputLabelSpanRight>
              </OneLineInput>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <OneLineInput>
                <div style={{ flex: 1 }}>
                  <TextForInfoTitle>Available to Mint</TextForInfoTitle>
                </div>
                <InputLabelSpanRight>$54.7M</InputLabelSpanRight>
              </OneLineInput>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <OneLineInput>
                <div style={{ flex: 1 }}>
                  <TextForInfoTitle>
                    Stability Fee
                    <CustomToolTip />
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
                    <CustomToolTip />
                  </TextForInfoTitle>
                </div>
                <InputLabelSpanRight>0.1%</InputLabelSpanRight>
              </OneLineInput>
            </div>
          </RightTopCard>
          <RightBottomCard className={'custom-mahadao-box'}>
            <RightBottomCardTitle>
              Farming pools are greate way to earn higher APY by staking your $ARTH
            </RightBottomCardTitle>
            <Grid container style={{ marginTop: '16px' }}>
              <Grid item lg={4}>
                <Button text={'Earn Rewards'} size={'sm'} to={'farming'} />
              </Grid>
            </Grid>
          </RightBottomCard>
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
  )
}

export default withSnackbar(RedeemTabContent)

const ToolTipFont = styled.p`
  padding: 0;
  margin: 0;
`;

const OneLineInputwomargin = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
`;

const LeftTopCard = styled.div``;

const RightTopCard = styled.div`
  @media (max-width: 600px) {
    margin-top: 8px;
  }
`;

const RightBottomCard = styled.div`
  margin-top: 16px;
  @media (max-width: 600px){
    margin-top: 24px;
  }
`;


const RightBottomCardTitle = styled.div`
  padding: 0;
  margin: 0;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.88);
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

const InputLabelSpanRight = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.88);
  margin-right: 5px;
`;

const ApproveButtonContainer = styled.div`
  display: flex
`;
