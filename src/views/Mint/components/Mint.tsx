import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import Grid from '@material-ui/core/Grid';
import { BigNumber } from '@ethersproject/bignumber';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { parseUnits } from 'ethers/lib/utils';

import useCore from '../../../hooks/useCore';
import Button from '../../../components/Button';
import arrowDown from '../../../assets/svg/arrowDown.svg';
import plus from '../../../assets/svg/plus.svg';
import MintModal from './MintModal';
import { getDisplayBalance } from '../../../utils/formatBalance';
import CustomInputContainer from '../../../components/CustomInputContainer';
import CustomSuccessModal from '../../../components/CustomSuccesModal';
import PoolInfo from './PoolInfo';
import useApprove, { ApprovalState } from '../../../hooks/callbacks/useApprove';
import useARTHXOraclePrice from '../../../hooks/state/controller/useARTHXPrice';
import useCollateralPoolPrice from '../../../hooks/state/pools/useCollateralPoolPrice';
import useMintCollateralRatio from '../../../hooks/state/useMintCollateralRatio';
import usePoolMintingFees from '../../../hooks/state/pools/usePoolMintingFees';
import useTokenBalance from '../../../hooks/state/useTokenBalance';
import SlippageContainer from '../../../components/SlippageContainer';
import { ValidateNumber } from '../../../components/CustomInputContainer/RegexValidation';
import useTokenDecimals from '../../../hooks/useTokenDecimals';

interface IProps {
  setType: (type: 'mint' | 'redeem') => void;
}

const MintTabContent = (props: WithSnackbarProps & IProps) => {
  const core = useCore();
  const { account, connect } = useWallet();

  const [arthxValue, setArthxValue] = useState<string>('0');
  const [collateralValue, setCollateralValue] = useState<string>('0');
  const [arthValue, setArthValue] = useState<string>('0');
  const [openModal, setOpenModal] = useState<0 | 1 | 2>(0);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [selectedRate, setSelectedRate] = useState<number>(0.0);

  const mintCR = useMintCollateralRatio();
  const colletralRatio = mintCR.div(10000).toNumber();
  const collateralTypes = useMemo(() => core.getCollateralTypes(), [core]);
  const [selectedCollateralCoin, setSelectedCollateralCoin] = useState(
    core.getDefaultCollateral(),
  );
  const mintingFee = usePoolMintingFees(selectedCollateralCoin);
  const collateralToGMUPrice = useCollateralPoolPrice(selectedCollateralCoin);
  const arthxToGMUPrice = useARTHXOraclePrice();
  const tokenDecimals = useTokenDecimals(selectedCollateralCoin);
  const arthxBalance = useTokenBalance(core.ARTHX);
  const arthBalance = useTokenBalance(core.ARTH);
  const collateralBalance = useTokenBalance(core.tokens[selectedCollateralCoin]);
  const collateralPool = core.getCollatearalPool(selectedCollateralCoin);
  const [arthXApproveStatus, approveARTHX] = useApprove(
    core.ARTHX, 
    collateralPool.address
  );
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
    if (!Number(arthxValue) && Number(collateralValue)) return !!account && isCollatApproved;
    else if (Number(arthxValue) && !Number(collateralValue)) return !!account && isARTHXApproved;

    return isARTHXApproved && !!account && isCollatApproved;
  }, [isARTHXApproved, account, collateralValue, arthxValue, isCollatApproved]);

  const tradingFee = useMemo(() => {
    return BigNumber
      .from(parseUnits(`${arthValue}`, tokenDecimals))
      .mul(mintingFee)
      .div(1e6);
  }, [arthValue, tokenDecimals, mintingFee]);

  useEffect(() => window.scrollTo(0, 0), []);

  const onCollateralValueChange = async (val: string) => {
    if (val === '' || collateralToGMUPrice.lte(0)) {
      setCollateralValue('0');
      setArthxValue('0');
      setArthValue('0');
      return;
    }

    const check: boolean = ValidateNumber(val);
    setCollateralValue(check ? val : String(Number(val)));
    if (!check) return;
    const valueInNumber: number = Number(val);
    if (!valueInNumber) return;

    let arthxShareValueInCollatTerms: number = 0;
    if (!arthxToGMUPrice.eq(0) && mintCR.lt(1e6)) {
      arthxShareValueInCollatTerms = ((100 * valueInNumber) / colletralRatio) * ((100 - colletralRatio) / 100);

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
    if (!collateralToGMUPrice.eq(0) && mintCR.gt(0)) {
      colletralValueInARTHXTerms = ((100 * valueInNumber) / colletralRatio) * (colletralRatio / 100);

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

    if (mintCR.gt(0)) {
      const collateralValueInCollatTerms = valueInNumber * (colletralRatio / 100);
      const finalCollateralValue = BigNumber
        .from(parseUnits(`${collateralValueInCollatTerms}`, tokenDecimals))
        .mul(1e6)
        .div(collateralToGMUPrice);
      setCollateralValue(getDisplayBalance(finalCollateralValue, 6, 3));
    }
    
    if (mintCR.lt(1e6)) {
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
      <MintModal
        arthxValue={arthxValue}
        collateralValue={collateralValue}
        selectedCollateralCoin={selectedCollateralCoin}
        arthValue={arthValue}
        openModal={openModal}
        onClose={() => setOpenModal(0)}
      />
      <Grid container style={{ marginTop: '24px' }} spacing={2}>
        <Grid item lg={1} />
        <Grid item lg={5} md={12} sm={12} xs={12}>
          <LeftTopCard className={'custom-mahadao-container'}>
            <LeftTopCardHeader className={'custom-mahadao-container-header'}>
              <div style={{ display: 'flex' }}>
                <TabContainer onClick={() => props.setType('mint')}>
                  <ActiveTab />
                  <TabTextActive>Mint</TabTextActive>
                </TabContainer>
                <TabContainer onClick={() => props.setType('redeem')}>
                  <TabText>Redeem</TabText>
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
                  setTimeout(() => {
                    onCollateralValueChange(collateralValue.toString());
                  }, 1000);
                }}
                SymbolText={selectedCollateralCoin}
                inputMode={'numeric'}
                setText={(val: string) => {
                  onCollateralValueChange(val);
                }}
                // Istate={'warning'}
                // StateMsg={'Warning message goes here'}
              />
              <PlusMinusArrow>
                <img src={plus} alt="plus" />
              </PlusMinusArrow>
              <CustomInputContainer
                ILabelValue={'Enter ARTHX'}
                IBalanceValue={`${getDisplayBalance(arthxBalance)}`}
                ILabelInfoValue={'How can I get ARTHX?'}
                // disabled={mintCR.gte(1000000)}
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
                // StateMsg={'ERROR message goes here'}
                DisableMsg={colletralRatio === 100 ? 'Currently Collateral ratio is 100%' : ''}
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
                tagText={'MAX'}
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
                              disabled={!isCollatApproved || !Number(collateralValue)}
                              onClick={approveCollat}
                              loading={isCollatApproving}
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
                              disabled={!isARTHXApproved || !Number(arthxValue)}
                              onClick={approveARTHX}
                              loading={isARTHXApproving}
                            />
                          </ApproveButtonContainer>
                          <br />
                        </>
                      )}
                      <Button
                        text={'Mint'}
                        size={'lg'}
                        variant={'default'}
                        disabled={
                          !isCollatArthxApproved ||
                          !Number(arthValue) ||
                          !(Number(collateralValue) || Number(arthxValue))
                        }
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
        subTitle={''}
        subsubTitle={
          'Your transaction is now being mined on the blockchain. You should consider staking your tokens to earn extra rewards!'
        }
        buttonText={'Stake your ARTH'}
        buttonType={'default'}
        buttonTo={'/#/farming'}
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
  align-items: center;
  justify-content: space-between;
`;
const LeftTopCardContainer = styled.div``;
const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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
