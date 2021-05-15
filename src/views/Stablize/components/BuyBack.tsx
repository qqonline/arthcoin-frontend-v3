import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import useCore from '../../../hooks/useCore';
import Grid from '@material-ui/core/Grid';
import Button from '../../../components/Button';
import arrowDown from '../../../assets/svg/arrowDown.svg';
import { Divider } from '@material-ui/core';
import TransparentInfoDiv from './InfoDiv';
import MinorInputContainer from './MinorInputContainer';
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
import useCollateralPoolExcessCollat from '../../../hooks/state/pools/useCollateralPoolExcessCollat';
import SlippageContainer from '../../../components/SlippageContainer';
import { ValidateNumber } from '../../../components/CustomInputContainer/RegexValidation';

type Iprops = {
  onChange: () => void;
};

const BuyBack = (props: WithSnackbarProps & Iprops) => {
  const core = useCore();
  const { account, connect } = useWallet();

  const [redeemAmount, setRedeemAmount] = useState<string>('0.00');
  const [receiveAmount, setReceiveAmount] = useState<string>('0.00');

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedCollateral, setSelectedCoin] = useState(core.getDefaultCollateral());

  const arthxBalance = useTokenBalance(core.ARTHX);
  const collateralTypes = useMemo(() => core.getCollateralTypes(), [core]);

  const collateralPool = core.getCollatearalPool(selectedCollateral);

  useEffect(() => window.scrollTo(0, 0), []);

  const arthxPrice = useARTHXOraclePrice();

  const [approveStatus, approve] = useApprove(core.ARTHX, collateralPool.address);

  const isARTHXApproved = approveStatus === ApprovalState.APPROVED;
  const isWalletConnected = !!account;
  const isARTHXApproving = approveStatus === ApprovalState.PENDING;

  const ratio = 100;
  const collateralToBeBoughtBack = useCollateralPoolExcessCollat(selectedCollateral);
  const [selectedRate, setSelectedRate] = useState<number>(0.0);

  // const isLaunched = Date.now() >= config.boardroomLaunchesAt.getTime();
  if (!core) return <div />;

  const onRedeemValueChange = (val: string) => {
    if (val === '') {
      setReceiveAmount('0');
    }
    let check = ValidateNumber(val);
    setRedeemAmount(check ? val : String(val));
    if (!check) return;
    const valInNumber = Number(val);
    if (valInNumber) {
      const temp = String(valInNumber * ratio);
      setReceiveAmount(temp);
    }
  };

  const buyBackContainer = () => {
    return (
      <LeftTopCard className={'custom-mahadao-container'}>
        <LeftTopCardHeader className={'custom-mahadao-container-header'}>
          <HeaderTitle>
            <div>
              Buyback
              <CustomToolTip />
            </div>
            <SlippageContainer
              defaultRate={selectedRate}
              onRateChange={(data) => {
                console.log('rates', data);
                setSelectedRate(data);
              }}
            />
          </HeaderTitle>
          <HeaderSubtitle>
            {getDisplayBalance(collateralToBeBoughtBack, 18, 2)}{' '}
            <HardChip>{selectedCollateral}</HardChip>
            <br />
            <TextForInfoTitle>To be bought back</TextForInfoTitle>
          </HeaderSubtitle>
        </LeftTopCardHeader>
        <LeftTopCardContainer className={'custom-mahadao-container-content'}>
          <CustomInputContainer
            ILabelValue={'Enter Amount'}
            IBalanceValue={`${getDisplayBalance(arthxBalance)}`}
            ILabelInfoValue={''}
            DefaultValue={redeemAmount.toString()}
            hasDropDown={false}
            LogoSymbol={'ARTHX'}
            SymbolText={'ARTHX'}
            inputMode={'decimal'}
            setText={(val: string) => onRedeemValueChange(val)}
            tagText={'MAX'}
          />
          <PlusMinusArrow>
            <img src={arrowDown} alt="arrow" />
          </PlusMinusArrow>
          <MinorInputContainer
            ILabelValue={'You receive'}
            IBalanceValue={''}
            ILabelInfoValue={''}
            DefaultValue={receiveAmount.toString()}
            LogoSymbol={selectedCollateral}
            hasDropDown={true}
            SymbolText={selectedCollateral}
            dropDownValues={collateralTypes}
            ondropDownValueChange={(data) => setSelectedCoin(data)}
          />
          <div>
            <TcContainer>
              <OneLineInputwomargin style={{ marginBottom: '5px' }}>
                <div style={{ flex: 1 }}>
                  <TextWithIcon>
                    Trading Fee
                    {/*<InfoIcon fontSize='default' style={{ transform: 'scale(0.6)' }} />*/}
                  </TextWithIcon>
                </div>
                <OneLineInputwomargin>
                  <BeforeChip>0.05</BeforeChip>
                  <TagChips>{selectedCollateral}</TagChips>
                </OneLineInputwomargin>
              </OneLineInputwomargin>
            </TcContainer>
            <div style={{ marginTop: 35 }}>
              {!isWalletConnected ? (
                <Button
                  text={'Connect Wallet'}
                  size={'lg'}
                  onClick={() => connect('injected')}
                />
              ) : (
                <>
                  {!isARTHXApproved && (
                    <>
                      <Button
                        text={!isARTHXApproving ? `Approve ARTHX` : 'Approving...'}
                        size={'lg'}
                        disabled={isARTHXApproving}
                        onClick={approve}
                      />
                      <br />
                    </>
                  )}
                  <Button
                    text={'Buyback'}
                    disabled={!isARTHXApproved}
                    size={'lg'}
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </LeftTopCardContainer>
      </LeftTopCard>
    );
  };

  const recollatateralizeConatiner = () => {
    return (
      <LeftTopCardChecked className={'custom-mahadao-box'} style={{ height: 536 }}>
        <LeftTopCardHeader className={'custom-mahadao-container-header'}>
          <HeaderTitle style={{ justifyContent: 'flex-start' }}>
            {'Recollatateralize'}
            <CustomToolTip />
          </HeaderTitle>
          <HeaderSubtitle>
            <TextForInfoTitle>The Protocol is currently collateralised</TextForInfoTitle>
          </HeaderSubtitle>
        </LeftTopCardHeader>
        <CollaterallizeCheckmark subText={'The Protocol is currently collateralised'} />
      </LeftTopCardChecked>
    );
  };

  return (
    <div>
      <Grid container>
        <Grid container lg={8} md={12} sm={12} xs={12}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            {buyBackContainer()}
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <RightTopCard className={'custom-mahadao-box'}>
              <RightTopCardHeader style={{}}>Current Fee Rates</RightTopCardHeader>
              <div style={{ marginBottom: '8px' }}>
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
              <div style={{ marginBottom: '8px' }}>
                <OneLineInput>
                  <div style={{ flex: 1 }}>
                    <TextForInfoTitle>ARTHX Oracle Price</TextForInfoTitle>
                  </div>
                  <InputLabelSpanRight>
                    ${getDisplayBalance(arthxPrice, 6, 6)}
                  </InputLabelSpanRight>
                </OneLineInput>
              </div>
            </RightTopCard>
          </Grid>
        </Grid>
        <Grid item lg={4} md={12} sm={12} xs={12}>
          {recollatateralizeConatiner()}
        </Grid>
      </Grid>
      <CustomModal
        closeButton
        handleClose={() => setOpenModal(false)}
        open={openModal}
        modalTitleStyle={{}}
        modalContainerStyle={{}}
        modalBodyStyle={{}}
        title={`Confirm Buyback ARTHX`}
      >
        <div>
          <TransparentInfoDiv
            labelData={`Your Share Amount`}
            rightLabelUnit={'ARTHX'}
            rightLabelValue={redeemAmount.toString()}
          />

          <TransparentInfoDiv
            labelData={`Trading Fee`}
            rightLabelUnit={selectedCollateral}
            rightLabelValue={'0.05'}
          />

          <Divider style={{ background: 'rgba(255, 255, 255, 0.08)', margin: '15px 0px' }} />

          <TransparentInfoDiv
            labelData={`You will receive collateral`}
            rightLabelUnit={selectedCollateral}
            rightLabelValue={receiveAmount.toString()}
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
                        data1: `Buyback for ${redeemAmount} ARTH cancelled`,
                      }),
                  };
                  props.enqueueSnackbar('timepass', options);
                }}
                // onClick={handleClose}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Button
                text={'Buyback'}
                size={'lg'}
                onClick={() => {
                  setOpenModal(false);
                  let options = {
                    content: () =>
                      CustomSnack({
                        onClose: props.closeSnackbar,
                        type: 'green',
                        data1: `Buyback for ${redeemAmount} ARTH :- processing`,
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
const HeaderTitle = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  height: 516px;
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

export default withSnackbar(BuyBack);
