import React, { useEffect, useMemo, useState } from 'react';
import { getDisplayBalance } from '../../../utils/formatBalance';
import { useWallet } from 'use-wallet';
import { ValidateNumber } from '../../../components/CustomInputContainer/RegexValidation';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import arrowDown from '../../../assets/svg/arrowDown.svg';
import Button from '../../../components/Button';
import CollaterallizeCheckmark from './Collaterallize';
import CustomInputContainer from '../../../components/CustomInputContainer';
import CustomToolTip from '../../../components/CustomTooltip';
import Grid from '@material-ui/core/Grid';
import RecollaterlizeModal from './RecollaterlizeModal';
import SlippageContainer from '../../../components/SlippageContainer';
import styled from 'styled-components';
import useApprove, { ApprovalState } from '../../../hooks/callbacks/useApprove';
import useARTHXOraclePrice from '../../../hooks/state/controller/useARTHXPrice';
import useArthxRedeemRewards from '../../../hooks/state/controller/useArthxRedeemRewards';
import useCore from '../../../hooks/useCore';
import useRecollateralizationDiscount from '../../../hooks/state/controller/useRecollateralizationDiscount';
import useTokenBalance from '../../../hooks/state/useTokenBalance';
import { createImportSpecifier } from 'typescript';
import { BigNumber } from '@ethersproject/bignumber';

type Iprops = {
  onChange: () => void;
};

const Recollatateralize = (props: WithSnackbarProps & Iprops) => {
  const core = useCore();

  const { account, connect } = useWallet();

  const [collateralAmount, setCollateralAmount] = useState<string>('0');
  const [receiveShare, setReceiveShare] = useState<string>('0');
  const [receiveBonus, setReceiveBonus] = useState<string>('0');

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedCollateral, setSelectedCollateralCoin] = useState(core.getDefaultCollateral());

  const shareRatio = 2;
  const bonusRatio = 4;
  const [selectedRate, setSelectedRate] = useState<number>(0.0);

  const collateralTypes = useMemo(() => core.getCollateralTypes(), [core]);
  const collateralBalance = useTokenBalance(core.tokens[selectedCollateral]);
  const recollateralizationDiscount = useRecollateralizationDiscount();
  const collateralPool = core.getCollatearalPool(selectedCollateral);

  const [approveStatus, approve] = useApprove(
    core.tokens[selectedCollateral],
    collateralPool.address,
  );

  const arthxRewards = useArthxRedeemRewards();

  const isARTHXApproved = approveStatus === ApprovalState.APPROVED;
  const isWalletConnected = !!account;
  const isARTHXApproving = approveStatus === ApprovalState.PENDING;

  const arthxPrice = useARTHXOraclePrice();

  useEffect(() => window.scrollTo(0, 0), []);

  const onColleteralChange = (val: string) => {
    if (val === '') {
      setReceiveShare('0');
      setReceiveBonus('0');
    }
    let check = ValidateNumber(val);

    setCollateralAmount(check ? val : String(Number(val)));
    if (!check) return;
    const discount = Number(recollateralizationDiscount.toNumber() / 1e6);
    const valInNumber = Number(val);
    if (valInNumber) {
      const amountBN = BigNumber.from(valInNumber).mul(1e12).div(arthxPrice);
      const discountBN = BigNumber.from(Math.floor(valInNumber * discount * 1e6))
        .mul(1e6)
        .div(arthxPrice);
      setReceiveShare(getDisplayBalance(amountBN, 6));
      setReceiveBonus(getDisplayBalance(discountBN, 6));
    }
  };

  // const isLaunched = Date.now() >= config.boardroomLaunchesAt.getTime();
  if (!core) return <div />;

  const buyBackContainer = () => {
    return (
      <LeftTopCardChecked className={'custom-mahadao-box'} style={{ height: 519 }}>
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
            <SlippageContainer
              defaultRate={selectedRate}
              onRateChange={(data) => {
                console.log('rates', data);
                setSelectedRate(data);
              }}
            />
          </HeaderTitle>
          <HeaderSubtitle>
            {getDisplayBalance(arthxRewards, 6, 6)} <HardChip>ARTHX</HardChip>{' '}
            <TextForInfoTitle>Rewards to claim</TextForInfoTitle>
          </HeaderSubtitle>
        </LeftTopCardHeader>
        <LeftTopCardContainer className={'custom-mahadao-container-content'}>
          <CustomInputContainer
            ILabelValue={'Enter Collateral'}
            IBalanceValue={`${getDisplayBalance(collateralBalance, 6)}`}
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
              onColleteralChange(val);
            }}
            inputMode={'decimal'}
            tagText={'MAX'}
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
                <CustomToolTip toolTipText={'loreum ipsum'} />
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
                        text={
                          !isARTHXApproving ? `Approve ${selectedCollateral}` : 'Approving...'
                        }
                        size={'lg'}
                        disabled={isARTHXApproving}
                        onClick={approve}
                      />
                      <br />
                    </>
                  )}
                  <Button
                    text={'Recollatateralize'}
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
                    {getDisplayBalance(recollateralizationDiscount, 4, 4)}%
                  </InputLabelSpanRight>
                </OneLineInput>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <OneLineInput>
                  <div style={{ flex: 1 }}>
                    <TextForInfoTitle>
                      Minimum discount
                      {/* <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} /> */}
                    </TextForInfoTitle>
                  </div>
                  <InputLabelSpanRight>0.75%</InputLabelSpanRight>
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
                  <InputLabelSpanRight>30%</InputLabelSpanRight>
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
                  <InputLabelSpanRight>${getDisplayBalance(arthxPrice, 6)}</InputLabelSpanRight>
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
        receiveBonus={Number(receiveBonus)}
        receiveShare={Number(receiveShare)}
        collateralAmount={Number(collateralAmount)}
        selectedCollateral={selectedCollateral}
        openModal={openModal}
        onClose={() => setOpenModal(false)}
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
  height: 519px;
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
