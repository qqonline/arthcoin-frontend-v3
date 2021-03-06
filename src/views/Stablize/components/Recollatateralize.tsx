import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import Grid from '@material-ui/core/Grid';
import { parseUnits } from 'ethers/lib/utils';
import { BigNumber } from '@ethersproject/bignumber';
import React, { useEffect, useMemo, useState } from 'react';
import { withSnackbar, WithSnackbarProps } from 'notistack';

import arrowDown from '../../../assets/svg/arrowDown.svg';

import Button from '../../../components/Button';
import CollaterallizeCheckmark from './Collaterallize';
import RecollaterlizeModal from './RecollaterlizeModal';
import CustomToolTip from '../../../components/CustomTooltip';
import SlippageContainer from '../../../components/SlippageContainer';
import CustomSuccessModal from '../../../components/CustomSuccesModal';
import CustomInputContainer from '../../../components/CustomInputContainer';
import { ValidateNumber } from '../../../components/CustomInputContainer/RegexValidation';

import useCore from '../../../hooks/useCore';
import prettyNumber from '../../../components/PrettyNumber';
import useTokenDecimals from '../../../hooks/useTokenDecimals';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useTokenBalance from '../../../hooks/state/useTokenBalance';
import useApprove, { ApprovalState } from '../../../hooks/callbacks/useApprove';
import useARTHXOraclePrice from '../../../hooks/state/controller/useARTHXPrice';
import useCollateralPoolPrice from '../../../hooks/state/pools/useCollateralPoolPrice';
import useArthxRedeemRewards from '../../../hooks/state/controller/useArthxRedeemRewards';
import useRecollateralizationDiscount from '../../../hooks/state/controller/useRecollateralizationDiscount';


type Iprops = {
  onChange?: () => void;
};

const Recollatateralize = (props: WithSnackbarProps & Iprops) => {
  const [collateralAmount, setCollateralAmount] = useState<string>('0');
  const [receiveShare, setReceiveShare] = useState<string>('0');
  const [receiveBonus, setReceiveBonus] = useState<string>('0');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [isInputFieldError, setIsInputFieldError] = useState<boolean>(false);

  const core = useCore();
  const { account, connect } = useWallet();
  const [selectedCollateral, setSelectedCollateralCoin] = useState(core.getDefaultCollateral());
  const tokenDecimals = useTokenDecimals(selectedCollateral);
  const collateralTypes = useMemo(() => core.getCollateralTypes(), [core]);
  const collateralPool = core.getCollatearalPool(selectedCollateral);

  const {isLoading: isCollteralBalanceLoading, value: collateralBalance} = useTokenBalance(core.tokens[selectedCollateral]);
  const {isLoading: isRecollateralizeDiscountLoading, value: recollateralizationDiscount} = useRecollateralizationDiscount();
  
  const {isLoading: isRecollateralizableValueLoading, value: recollateralizableValue} = useArthxRedeemRewards();
  const {isLoading: isARTHXPriceLoading, value: arthxPrice} = useARTHXOraclePrice();
  const {isLoading: isCollateralPriceLoading, value: collateralGMUPrice} = useCollateralPoolPrice(selectedCollateral);

  const [approveStatus, approve] = useApprove(
    core.tokens[selectedCollateral],
    collateralPool.address,
  );
  
  useEffect(() => window.scrollTo(0, 0), []);

  const arthxRecollateralizeAmount = useMemo(() => {
    if (arthxPrice.lte(0) || recollateralizableValue.lte(0)) return BigNumber.from(0);
    return recollateralizableValue.mul(1e6).div(arthxPrice);
  }, [arthxPrice, recollateralizableValue]);

  const onColleteralChange = (val: string) => {
    if (val === '' || collateralGMUPrice.lte(0) || arthxPrice.lte(0)) {
      setReceiveShare('0');
      setReceiveBonus('0');
      setCollateralAmount('0');
      return;
    }

    const check: boolean = ValidateNumber(val);
    setCollateralAmount(check ? val : String(Number(val)));
    if (!check) return;
    const valueInNumber: number = Number(val);
    if (!valueInNumber) return;


    const amountBN = collateralGMUPrice
      .mul(BigNumber.from(
        parseUnits(`${valueInNumber}`, tokenDecimals)
      ))
      .mul(BigNumber.from(10).pow(18 - tokenDecimals))
      .div(arthxPrice);

    const discountBN = amountBN
      .mul(recollateralizationDiscount)
      .div(1e6);

    setReceiveShare(getDisplayBalance(amountBN, 18, 3));
    setReceiveBonus(getDisplayBalance(discountBN, 18, 3));
  };

  const isARTHXApproved = approveStatus === ApprovalState.APPROVED;
  const isWalletConnected = !!account;
  const isARTHXApproving = approveStatus === ApprovalState.PENDING;

  if (!core) return <div />;

  const buyBackContainer = () => {
    return (
      <LeftTopCardChecked className={'custom-mahadao-box'} style={{ height: '100%' }}>
        <LeftTopCardHeader className={'custom-mahadao-container-header'}>
          <HeaderTitle style={{ justifyContent: 'flex-start' }}>
            Buyback
            <CustomToolTip toolTipText={'loreum ipsum'} />
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
            <div>
              {'Add Collateral'}
              <CustomToolTip toolTipText={'loreum ipsum'} />
            </div>
            <SlippageContainer />
          </HeaderTitle>
          <HeaderSubtitle>
            {prettyNumber(getDisplayBalance(arthxRecollateralizeAmount, 18, 3))} <HardChip>ARTHX</HardChip>{' '}
            <TextForInfoTitle>Rewards to claim</TextForInfoTitle>
          </HeaderSubtitle>
        </LeftTopCardHeader>
        <LeftTopCardContainer className={'custom-mahadao-container-content'}>
          <CustomInputContainer
            ILabelValue={'Enter Collateral'}
            IBalanceValue={`${getDisplayBalance(collateralBalance, tokenDecimals)}`}
            ILabelInfoValue={''}
            DefaultValue={collateralAmount}
            hasDropDown={true}
            disabled={recollateralizableValue.eq(0)}
            LogoSymbol={selectedCollateral}
            dropDownValues={collateralTypes}
            ondropDownValueChange={(data) => {
              setSelectedCollateralCoin(data);
            }}
            SymbolText={selectedCollateral}
            setText={(val: string) => {
              onColleteralChange(val);
            }}
            DisableMsg={
              recollateralizableValue.eq(0)
                ? 'Current pool has required collateral'
                : ''
            }
            inputMode={'decimal'}
            tagText={'MAX'}
            errorCallback={(flag: boolean) => { setIsInputFieldError(flag) }}
          />

          <PlusMinusArrow>
            <img src={arrowDown} alt="arrow-down" />
          </PlusMinusArrow>
          <PrimaryText>You Will Receive</PrimaryText>
          <ReYouReceiveContain>
            <OneLineInputwomargin style={{ marginBottom: '10px' }}>
              <PrimaryText>ARTH Share</PrimaryText>
              <OneLineInputwomargin>
                <BeforeHardChip>{Number(receiveShare).toLocaleString()}</BeforeHardChip>
                <HardChip>ARTHX</HardChip>
              </OneLineInputwomargin>
            </OneLineInputwomargin>
            <OneLineInputwomargin>
              <PrimaryText>
                + Bonus
                <CustomToolTip toolTipText={'loreum ipsum'} />
              </PrimaryText>
              <OneLineInputwomargin>
                <BeforeHardChip>{Number(receiveBonus).toLocaleString()}</BeforeHardChip>
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
              {!isWalletConnected ? (
                <Button
                  text={'Connect Wallet'}
                  size={'lg'}
                  onClick={() => connect('injected').then(() => {
                    localStorage.removeItem('disconnectWallet')
                  })}
                />
              ) : (
                <>
                  {!isARTHXApproved && (
                    <>
                      <Button
                        text={
                          !isARTHXApproving ? `Approve ${selectedCollateral}` : 'Approving...'
                        }
                        size={'lg'}
                        disabled={
                          recollateralizableValue.eq(0) ||
                          isInputFieldError ||
                          isARTHXApproving ||
                          !Number(collateralAmount) ||
                          !Number(receiveShare)
                        }
                        onClick={approve}
                      />
                      <br />
                    </>
                  )}
                  <Button
                    text={'Recollateralize'}
                    disabled={
                      recollateralizableValue.eq(0) ||
                      isInputFieldError ||
                      !isARTHXApproved ||
                      !Number(collateralAmount) ||
                      !Number(receiveShare)
                    }
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

  return (
    <div>
      <Grid container>
        <Grid container lg={8} md={12} sm={12} xs={12}>
          <Grid item lg={6} md={12} sm={12} xs={12} style={{ zIndex: 1 }}>
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
                  <InputLabelSpanRight>
                    {getDisplayBalance(recollateralizationDiscount, 4, 3)}%
                  </InputLabelSpanRight>
                </OneLineInput>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <OneLineInput>
                  <div style={{ flex: 1 }}>
                    <TextForInfoTitle>
                      Minimum Discount
                      {/* <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} /> */}
                    </TextForInfoTitle>
                  </div>
                  <InputLabelSpanRight>0 - 3%</InputLabelSpanRight>
                </OneLineInput>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <OneLineInput>
                  <div style={{ flex: 1 }}>
                    <TextForInfoTitle>
                      Maximum Discount
                      {/* <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} /> */}
                    </TextForInfoTitle>
                  </div>
                  <InputLabelSpanRight>75%</InputLabelSpanRight>
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
                  <InputLabelSpanRight>
                    ${
                      Number(getDisplayBalance(arthxPrice, 6, 6))
                        .toLocaleString('en-US', { maximumFractionDigits: 6 })
                    }
                  </InputLabelSpanRight>
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
                      <CustomToolTip toolTipText={'loreum ipsum'} />
                    </TextForInfoTitle>
                  </div>
                  <InputLabelSpanRight>0.2%</InputLabelSpanRight>
                </OneLineInput>
              </div>
            </RightTopCard>
          </Grid>
        </Grid>
        <Grid item lg={4} md={12} sm={12} xs={12}>
          {buyBackContainer()}
        </Grid>
      </Grid>
      <RecollaterlizeModal
        recollateralizableValue={recollateralizableValue}
        isInputFieldError={isInputFieldError}
        receiveBonus={Number(receiveBonus)}
        receiveShare={Number(receiveShare)}
        collateralAmount={Number(collateralAmount)}
        selectedCollateral={selectedCollateral}
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        toggleSuccessModal={() => { setSuccessModal(!successModal) }}
      />
      <CustomSuccessModal
        modalOpen={successModal}
        setModalOpen={() => setSuccessModal(false)}
        title={'Recollateralize'}
        // subTitle={'View Transaction'}
        subsubTitle={
          'Your transaction is now being mined on the blockchain. You should consider staking your tokens to earn extra rewards!'
        }
        buttonText={'Stake your ARTH'}
        buttonType={'default'}
        buttonTo={'/farming'}
      />
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
  height: 100%;
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
