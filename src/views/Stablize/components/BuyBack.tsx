import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import useBasisCash from '../../../hooks/useBasisCash';
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

type Iprops = {
  onChange: () => void;
}

const BuyBack = (props: WithSnackbarProps & Iprops) => {
  const basisCash = useBasisCash();
  const [redeemAmount, setRedeemAmount] = useState<string>('0.00');
  const [balance, setBalance] = useState<number>(0);
  const [type, setType] = useState<'Buyback' | 'Recollateralize'>('Buyback');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedBuybackReceiveAmountCoin, setSelectedBuybackReceiveAmountCoin] = useState(
    basisCash.getDefaultCollateral(),
  );

  const collateralTypes = useMemo(() => basisCash.getCollateralTypes(), [basisCash]);

  useEffect(() => window.scrollTo(0, 0), []);

  // const isLaunched = Date.now() >= config.boardroomLaunchesAt.getTime();
  if (!basisCash) return <div />;

  const buyBackContainer = () => {
    return (
      <LeftTopCard className={'custom-mahadao-container'}>
        <LeftTopCardHeader className={'custom-mahadao-container-header'}>
          <HeaderTitle>
            Buyback
            <CustomToolTip/>
          </HeaderTitle>
          <HeaderSubtitle>
            342.450K <HardChip>USDT</HardChip>{' '}
            <TextForInfoTitle>Available in Protocol</TextForInfoTitle>
          </HeaderSubtitle>
        </LeftTopCardHeader>
        <LeftTopCardContainer className={'custom-mahadao-container-content'}>
          <CustomInputContainer
            ILabelValue={'Enter Redeem Amount'}
            IBalanceValue={`Balance ${balance}`}
            ILabelInfoValue={''}
            DefaultValue={redeemAmount.toString()}
            hasDropDown={false}
            LogoSymbol={'ARTHX'}
            SymbolText={'ARTHX'}
            inputMode={'decimal'}
            setText={(val: string) => {
              setRedeemAmount(val.replace(/[^0-9]/g, ''));
            }}
          />
          <PlusMinusArrow>
            <img src={arrowDown} />
          </PlusMinusArrow>
          <MinorInputContainer
            ILabelValue={'You receive'}
            IBalanceValue={''}
            ILabelInfoValue={''}
            DefaultValue={'0.00'}
            LogoSymbol={selectedBuybackReceiveAmountCoin}
            hasDropDown={true}
            SymbolText={selectedBuybackReceiveAmountCoin}
            dropDownValues={collateralTypes}
            ondropDownValueChange={(data) => {
              setSelectedBuybackReceiveAmountCoin(data);
            }}
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
                  <TagChips>USDT</TagChips>
                </OneLineInputwomargin>
              </OneLineInputwomargin>
              <OneLineInputwomargin>
                <div style={{ flex: 1 }}>
                  <TextWithIcon>
                    Stability Fee
                    {/*<InfoIcon fontSize='default' style={{ transform: 'scale(0.6)' }} />*/}
                  </TextWithIcon>
                </div>
                <OneLineInputwomargin>
                  <BeforeChip>0.05</BeforeChip>
                  <TagChips>MAHA</TagChips>
                </OneLineInputwomargin>
              </OneLineInputwomargin>
            </TcContainer>
            <div style={{ marginTop: 35 }}>
              <Button
                text={'Buyback'}
                size={'lg'}
                onClick={() => {
                  setType('Buyback');
                  setOpenModal(true);
                }}
              />
            </div>
          </div>
        </LeftTopCardContainer>
      </LeftTopCard>
    );
  };

  const recollatateralizeConatiner = () => {
      return (
        <LeftTopCardChecked
          className={'custom-mahadao-box'}
          style={{ height: 536 }}
        >
          <LeftTopCardHeader className={'custom-mahadao-container-header'}>
            <HeaderTitle>
              {'Recollatateralize'}
              <CustomToolTip/>
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
    <>
      <CustomModal
        closeButton
        handleClose={() => setOpenModal(false)}
        open={openModal}
        modalTitleStyle={{}}
        modalContainerStyle={{}}
        modalBodyStyle={{}}
        title={`Confirm ${type} ARTH`}>
        <>
          <TransparentInfoDiv
            labelData={`Your Share Amount`}
            rightLabelUnit={'ARTH'}
            rightLabelValue={redeemAmount.toString()}
          />

          <TransparentInfoDiv
            labelData={`Trading Fee`}
            rightLabelUnit={'USDT'}
            rightLabelValue={'0.05'}
          />

          <TransparentInfoDiv
            labelData={`Stability Fee`}
            rightLabelUnit={'MAHA'}
            rightLabelValue={'0.05'}
          />

          <Divider style={{ background: 'rgba(255, 255, 255, 0.08)', margin: '15px 0px', }} />

          <TransparentInfoDiv
            labelData={`You will receive collateral`}
            rightLabelUnit={'USDT'}
            rightLabelValue={'1000.00'}
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
        </>
      </CustomModal>
      <Grid container spacing={3}>
        <Grid container lg={8}>
          <Grid item lg={6}>
            {buyBackContainer()}
          </Grid>
          <Grid item lg={6} style={{ marginLeft: -5, zIndex: -1 }}>
            <RightTopCard
              className={'custom-mahadao-box'}
              style={{ height: 536 }}
            >
              <RightTopCardHeader style={{}}>Current Fee Rates</RightTopCardHeader>
              <div style={{ marginBottom: '8px' }}>
                <OneLineInput>
                  <div style={{ flex: 1 }}>
                    <TextForInfoTitle>
                      Stability Fee
                      <CustomToolTip/>
                    </TextForInfoTitle>
                  </div>
                  <InputLabelSpanRight>0.1%</InputLabelSpanRight>
                </OneLineInput>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <OneLineInput>
                  <div style={{ flex: 1 }}>
                    <TextForInfoTitle>
                      Trading Fee
                      <CustomToolTip/>
                    </TextForInfoTitle>
                  </div>
                  <InputLabelSpanRight>0.1%</InputLabelSpanRight>
                </OneLineInput>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <OneLineInput>
                  <div style={{ flex: 1 }}>
                    <TextForInfoTitle>ARTHX Price</TextForInfoTitle>
                  </div>
                  <InputLabelSpanRight>$7.55</InputLabelSpanRight>
                </OneLineInput>
              </div>
            </RightTopCard>
          </Grid>
        </Grid>
        <Grid item lg={4} style={{ marginTop: -12 }}>
          {recollatateralizeConatiner()}
        </Grid>
      </Grid>
    </>
  );
};

const GradientDiv = styled.div`
  background: linear-gradient(180deg, #2a2827 0%, rgba(42, 40, 39, 0) 100%);
  height: 270px;
  position: absolute;
  // border: 1px solid;
  width: 100%;
  z-index: -5;
`;

const TcContainer = styled.div`
  margin-top: 18px;
  margin-bottom: 15px;
`;

const PrimaryText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.64);
  margin: 0px;
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
  margin: 10px 0px;
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
  margin: 4px 0px 0px 0px;
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

const StyledTableHeaderTextCenter = styled.h6`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[600]};
  margin: 10px 30px;
  text-align: center;
`;

const InfoSpan = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.64);
  // margin: 10px 30px;
  text-align: center;
`;

const LeftTopCard = styled.div`
  //height: 560px;
  // padding: 32px;
`;

const LeftTopCardChecked = styled.div`
  padding: 0 !important;
`;

const RightTopCard = styled.div``;

const RightTopCardHeader = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin: 12px 0px;
`;

const RightBottomCard = styled.div`
  margin-top: 24px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  padding: 32px;
`;

const RightBottomCardTitle = styled.div`
  padding: 0px;
  margin: 0px;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.88);
`;

const LeftTopCardHeader = styled.div`
  padding-top: 32px;
  padding-bottom: 32px;
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
const StakingDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0px 0px 0px;
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
  margin: 8px 0px 0px 0px;
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

const LearnMore = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  opacity: 0.64;
  margin: 8px 0px;
  color: #f47f57;
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

const InputLabel = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.64);
  margin: 0px;
`;
const StyledTableHeaderTextRight = styled.h6`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[600]};
  margin: 10px 10px;
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

const LabelDiv = styled.div`
  // background: rgba(255, 255, 255, 0.08);
  // border-radius: 6px;
  // padding: 6px 4px;
  height: fit-content;
  justify-content: space-between;
  display: flex;
  align-items: center;
  // margin: 5px 0px 0px 0px;
`;

const LabelInfo = styled.div`
  // background: rgba(255, 255, 255, 0.08);
  // border-radius: 6px;
  padding: 3px 4px;
  height: fit-content;
  // justify-content: space-between;
  display: flex;
  align-items: center;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  color: rgba(255, 255, 255, 0.88);
`;

const LabelInfoText = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: right;
  color: rgba(255, 255, 255, 0.88);
`;

const TimeSpan = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  color: rgba(255, 255, 255, 0.88);
`;

const LabelInfoData = styled.div`
  // background: yellow;
  padding: 3px 4px;
  // height: fit-content;
  width: fit-content;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  color: rgba(255, 255, 255, 0.88);
`;

const LabelInfoDataChip = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 3px 4px;
  height: fit-content;
  // justify-content: space-between;
  display: flex;
  align-items: center;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  margin: 0px 2px;
  color: rgba(255, 255, 255, 0.64);
`;

const LabelInfoDataChipText = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.64);
`;

const InfoDiv = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 6px 4px;
  height: fit-content;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

// const TransparentInfoDiv = styled.div`
// // background: rgba(255, 255, 255, 0.08);
// // border-radius: 6px;
// // padding: 6px 4px;
// height: fit-content;
// justify-content: space-between;
// display: flex;
// align-items: center;
// `;

const InfoTitle = styled.div`
  padding: 6px 4px;
  height: fit-content;
  display: flex;
  align-items: center;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.88);
`;

const CheckboxDiv = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 5px 0px 0px 0px;
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

const CurrencyTag = styled.div`
  padding: 6px 4px;
  width: 85px;
  justify-content: space-around;
  height: fit-content;
  display: flex;
  align-items: center;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.64);
`;
export default withSnackbar(BuyBack);
