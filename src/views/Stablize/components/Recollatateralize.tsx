import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import useCore from '../../../hooks/useCore';
import Grid from '@material-ui/core/Grid';
import Button from '../../../components/Button';
import arrowDown from '../../../assets/svg/arrowDown.svg';
import { Divider } from '@material-ui/core';
import TransparentInfoDiv from './InfoDiv';
import CollaterallizeCheckmark from './Collaterallize';
import CustomInputContainer from '../../../components/CustomInputContainer';
import CustomModal from '../../../components/CustomModal';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { CustomSnack } from '../../../components/SnackBar';
import CustomToolTip from '../../../components/CustomTooltip';
import useTokenBalance from '../../../hooks/state/useTokenBalance';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useApprove, { ApprovalState } from '../../../hooks/callbacks/useApprove';
import { useWallet } from 'use-wallet';
import useARTHXOraclePrice from '../../../hooks/state/useARTHXOraclePrice';

type Iprops = {
  onChange: () => void;
}

const Recollatateralize = (props: WithSnackbarProps & Iprops) => {
  const core = useCore();

  const { account, connect } = useWallet()

  const [collateralAmount, setCollateralAmount] = useState<string>('0');
  const [receiveShare, setReceiveShare] = useState<string>('0');
  const [receiveBonus, setReceiveBonus] = useState<string>('0');

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedCollateral, setSelectedCollateralCoin] = useState(
    core.getDefaultCollateral(),
  );

  const shareRatio = 2;
  const bonusRatio = 4;

  const collateralTypes = useMemo(() => core.getCollateralTypes(), [core]);
  const collateralBalance = useTokenBalance(core.tokens[selectedCollateral])
  const collateralPool = core.getCollatearalPool(selectedCollateral)

  const [approveStatus, approve] = useApprove(
    core.tokens[selectedCollateral],
    collateralPool.address,
  );

  const isARTHXApproved = approveStatus === ApprovalState.APPROVED
  const isWalletConnected = !!account
  const isARTHXApproving = approveStatus === ApprovalState.PENDING

  const arthxPrice = useARTHXOraclePrice()

  useEffect(() => window.scrollTo(0, 0), []);

  const onColleteralChange = (val: string) => {
    if (val === '') {
      setReceiveShare('0');
      setReceiveBonus('0');
    }
    setCollateralAmount(val);
    const valInNumber = Number(val);
    if (valInNumber) {
      setReceiveBonus(String(valInNumber * bonusRatio));
      setReceiveShare(String(valInNumber * shareRatio));
    }
  }

  // const isLaunched = Date.now() >= config.boardroomLaunchesAt.getTime();
  if (!core) return <div />;

  const buyBackContainer = () => {
    return (
      <LeftTopCardChecked
        className={'custom-mahadao-box'}
        style={{ height: 570 }}>
        <LeftTopCardHeader className={'custom-mahadao-container-header'}>
          <HeaderTitle>
            Buyback
            <CustomToolTip />
          </HeaderTitle>
          <HeaderSubtitle>
            <TextForInfoTitle>Buyback is not needed for now</TextForInfoTitle>
          </HeaderSubtitle>
        </LeftTopCardHeader>
        <CollaterallizeCheckmark subText={'Buyback is not needed for now'} />
      </LeftTopCardChecked>
    );
  };

  const recollatateralizeConatiner = () => {
    return (
      <LeftTopCard className={'custom-mahadao-container'}>
        <LeftTopCardHeader className={'custom-mahadao-container-header'}>
          <HeaderTitle>
            Add Collateral
            <CustomToolTip />
          </HeaderTitle>
          <HeaderSubtitle>
            342.450K <HardChip>ARTHX</HardChip>{' '}
            <TextForInfoTitle>Rewards to claim</TextForInfoTitle>
          </HeaderSubtitle>
        </LeftTopCardHeader>
        <LeftTopCardContainer className={'custom-mahadao-container-content'}>
          <CustomInputContainer
            ILabelValue={'Enter Collateral'}
            IBalanceValue={`Balance ${getDisplayBalance(collateralBalance)}`}
            ILabelInfoValue={''}
            DefaultValue={collateralAmount.toString()}
            hasDropDown={true}
            LogoSymbol={selectedCollateral}
            dropDownValues={collateralTypes}
            ondropDownValueChange={(data) => {
              setSelectedCollateralCoin(data);
            }}
            SymbolText={selectedCollateral}
            setText={(val: string) => {
              onColleteralChange(val)
            }}
            inputMode={'decimal'}
          />

          <PlusMinusArrow>
            <img src={arrowDown} alt="arrow-down" />
          </PlusMinusArrow>
          <PrimaryText>You Will Receive</PrimaryText>
          <ReYouReceiveContain>
            <OneLineInputwomargin style={{ marginBottom: '10px' }}>
              <PrimaryText>ARTH Share</PrimaryText>
              <OneLineInputwomargin>
                <BeforeHardChip>{receiveShare}</BeforeHardChip>
                <HardChip>ARTHX</HardChip>
              </OneLineInputwomargin>
            </OneLineInputwomargin>
            <OneLineInputwomargin>
              <PrimaryText>
                + Bonus
                <CustomToolTip />
              </PrimaryText>
              <OneLineInputwomargin>
                <BeforeHardChip>{receiveBonus}</BeforeHardChip>
                <HardChip>ARTHX</HardChip>
              </OneLineInputwomargin>
            </OneLineInputwomargin>
          </ReYouReceiveContain>
          <div>
            <TcContainer>
              <OneLineInputwomargin>
                <div style={{ flex: 1 }}>
                  <TextWithIcon>
                    {/* Bonus */}
                    {/* <InfoIcon fontSize='default' style={{ transform: 'scale(0.6)' }} /> */}
                  </TextWithIcon>
                </div>
                <OneLineInputwomargin>
                  {/* <BeforeChip>1.06</BeforeChip> */}
                  {/* <TagChips>ARTHX</TagChips> */}
                </OneLineInputwomargin>
              </OneLineInputwomargin>
            </TcContainer>
            <div style={{ flex: 1, marginTop: 30 }}>
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
                      !isARTHXApproved && (
                        <>
                          <Button
                            text={!isARTHXApproving ? `Approve ${selectedCollateral}` : 'Approving...'}
                            size={'lg'}
                            disabled={isARTHXApproving}
                            onClick={approve}
                          />
                          <br />
                        </>
                      )
                    }
                    <Button
                      text={'Recollatateralize'}
                      disabled={!isARTHXApproved}
                      size={'lg'}
                      onClick={() => {
                        setOpenModal(true);
                      }}
                    />
                  </>
                )
              }
            </div>
          </div>
        </LeftTopCardContainer>
      </LeftTopCard >
    );

  };

  return (
    <div>
      <Grid container>
        <Grid container lg={8} md={12} sm={12} xs={12}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            {recollatateralizeConatiner()}
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <RightTopCard className={'custom-mahadao-box'}>
              <RightTopCardHeader>Bonding Curve Discount on ARTHX</RightTopCardHeader>
              <div style={{ marginBottom: '8px' }}>
                <OneLineInput>
                  <div style={{ flex: 1 }}>
                    <TextForInfoTitle>Current Discount</TextForInfoTitle>
                  </div>
                  <InputLabelSpanRight>0.2%</InputLabelSpanRight>
                </OneLineInput>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <OneLineInput>
                  <div style={{ flex: 1 }}>
                    <TextForInfoTitle>
                      1 day ago discount
                      {/* <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} /> */}
                    </TextForInfoTitle>
                  </div>
                  <InputLabelSpanRight>5%</InputLabelSpanRight>
                </OneLineInput>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <OneLineInput>
                  <div style={{ flex: 1 }}>
                    <TextForInfoTitle>
                      Estimated Discount 1 hour later
                      {/* <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} /> */}
                    </TextForInfoTitle>
                  </div>
                  <InputLabelSpanRight>~5%</InputLabelSpanRight>
                </OneLineInput>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <OneLineInput>
                  <div style={{ flex: 1 }}>
                    <TextForInfoTitle>
                      ARTHX Oracle Price
                      {/* <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} /> */}
                    </TextForInfoTitle>
                  </div>
                  <InputLabelSpanRight>${getDisplayBalance(arthxPrice)}</InputLabelSpanRight>
                </OneLineInput>
              </div>
              <RightTopCardHeader style={{ marginTop: 20 }}>
                Current Reward Rates
              </RightTopCardHeader>
              <div style={{ marginBottom: '12px' }}>
                <OneLineInput>
                  <div style={{ flex: 1 }}>
                    <TextForInfoTitle>
                      Bonus Rate
                      <CustomToolTip />
                    </TextForInfoTitle>
                  </div>
                  <InputLabelSpanRight>0.2%</InputLabelSpanRight>
                </OneLineInput>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <OneLineInput>
                  <div style={{ flex: 1 }}>
                    <TextForInfoTitle>
                      MAHA Reward
                      <CustomToolTip />
                    </TextForInfoTitle>
                  </div>
                  <InputLabelSpanRight>5%</InputLabelSpanRight>
                </OneLineInput>
              </div>
            </RightTopCard>
          </Grid>
        </Grid>
        <Grid item lg={4} md={12} sm={12} xs={12}>
          {buyBackContainer()}
        </Grid>
      </Grid>
      <CustomModal
        closeButton
        handleClose={() => setOpenModal(false)}
        open={openModal}
        modalTitleStyle={{}}
        modalContainerStyle={{}}
        modalBodyStyle={{}}
        title={`Confirm Recollateralize ARTH`}>
        <div>
          <TransparentInfoDiv
            labelData={`Your will deposit`}
            rightLabelUnit={selectedCollateral}
            rightLabelValue={collateralAmount.toString()}
          />

          <Divider
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              margin: '15px 0px',
            }}
          // variant={'middle'}
          />

          <TransparentInfoDiv
            labelData={`And receive`}
            // labelToolTipData={'testing'}
            rightLabelUnit={'ARTHX'}
            rightLabelValue={receiveShare.toString()}
          />

          <TransparentInfoDiv
            labelData={`Along with a bonus of`}
            // labelToolTipData={'testing'}
            rightLabelUnit={'ARTHX'}
            rightLabelValue={receiveBonus.toString()}
          />

          <Grid container spacing={2} style={{ marginTop: '32px' }}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Button
                variant={'transparent'}
                text="Cancel"
                size={'lg'}
                onClick={() => {
                  setOpenModal(false);
                  let options = {
                    content: () =>
                      CustomSnack({
                        onClose: props.closeSnackbar,
                        type: 'red',
                        data1: `Recollateralize for ${collateralAmount} ARTH cancelled`,
                      }),
                  };
                  props.enqueueSnackbar('timepass', options);
                }}
              // onClick={handleClose}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Button
                text={'Recollateralize'}
                // textStyles={{ color: '#F5F5F5' }}
                size={'lg'}
                onClick={() => {
                  // setType('Redeem')
                  setOpenModal(false);
                  let options = {
                    content: () =>
                      CustomSnack({
                        onClose: props.closeSnackbar,
                        type: 'green',
                        data1: `Recollateralize for ${collateralAmount} ARTH:- processing`,
                      }),
                  };
                  props.enqueueSnackbar('timepass', options);
                  props.onChange();
                }}
              />
            </Grid>
          </Grid>
        </div>
      </CustomModal>
    </div>
  );
};

const TcContainer = styled.div`
  margin-top: 24px;
`;

const PrimaryText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.64);
  margin: 0;
  flex: 1;
`;

const BeforeHardChip = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: right;
  color: rgba(255, 255, 255, 0.88);
`;

const ReYouReceiveContain = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 10px;
  margin: 10px 0 0 0;
`;

const HeaderTitle = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
  opacity: 0.88;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
`;

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
  margin: 4px 0 0 0;
`;

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
  margin-left: 4px;
  margin-right: 4px;
`;


const LeftTopCard = styled.div`
  //height: 560px;
  // padding: 32px;
`;

const LeftTopCardChecked = styled.div`
  padding: 0 !important;
  margin-left: 12px;
  @media (max-width: 600px) {
    margin-left: 0;
    margin-top: 24px;
  }
`;

const RightTopCard = styled.div`
  height: 570px;
  z-index: -1;
  margin-left: -5px;
  @media (max-width: 600px) {
    margin-left: 0;
    margin-top: -10px;
    height: auto;
  }
`;

const RightTopCardHeader = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin: 12px 0;
`;

const LeftTopCardHeader = styled.div`
  padding-top: 32px;
  padding-bottom: 32px;
`;
const LeftTopCardContainer = styled.div``;

const PlusMinusArrow = styled.div`
  width: 100%;
  height: 20px;
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
  margin: 8px 0 0 0;
`;

const OneLineInputwomargin = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
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

const InputLabelSpanRight = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.88);
  margin-right: 5px;
`;

export default withSnackbar(Recollatateralize);
