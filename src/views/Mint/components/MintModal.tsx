import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Checkbox,
  CheckboxProps,
  createStyles,
  Divider,
  FormControlLabel,
  makeStyles,
  Slider,
  Theme,
  withStyles,
} from '@material-ui/core';
import { useWallet } from 'use-wallet';
import { BigNumber } from '@ethersproject/bignumber';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckIcon from '@material-ui/icons/Check';
import { parseUnits } from 'ethers/lib/utils';

import useCore from '../../../hooks/useCore';
import Button from '../../../components/Button';
import { CustomSnack } from '../../../components/SnackBar';
import { getDisplayBalance } from '../../../utils/formatBalance';
import CustomModal from '../../../components/CustomModal';
import CustomSuccessModal from '../../../components/CustomSuccesModal';
import TransparentInfoDiv from './InfoDiv';
import usePoolMintingFees from '../../../hooks/state/pools/usePoolMintingFees';
import useMintARTH from '../../../hooks/callbacks/pools/useMintARTH';
import useTokenDecimals from '../../../hooks/useTokenDecimals';
import useApprove, { ApprovalState } from '../../../hooks/callbacks/useApprove';

const OrangeCheckBox = withStyles({
  root: {
    color: 'rgba(255, 255, 255, 0.32)',
    '&$checked': {
      color: '#FF7F57',
    },
  },
  checked: {
    color: 'white',
  },
})((props: CheckboxProps) => <Checkbox {...props} />);

const useSliderStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      // color: 'white'
    },
    margin: {
      height: theme.spacing(3),
    },
  }),
);

function valuetext(value: number) {
  return `${value}`;
}

const PrettoRestrictSlider = withStyles({
  root: {
    // color: 'white',
    height: 15,
    width: '95%',
  },
  thumb: {
    height: 10,
    width: 10,
    // backgroundColor: '#fff',
    border: '2px solid currentColor',
    color: '#FFA981',
    marginTop: -3.5,
    marginLeft: -3,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-100% - 5px)',
    // color: '#FF7F57',
  },
  marked: {
    color: 'red',
  },
  markLabel: {
    // color: 'green'
  },
  track: {
    height: 3,
    borderRadius: 3,
    color: '#FFA981',
    // top: '2%'
  },
  rail: {
    height: 3,
    borderRadius: 3,
    color: '#D74D26',
    // background:'red'
    // border: '1px solid'
  },
  markLabelActive: {
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: '12px',
    lineHeight: '130%',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.88)',
  },
  mark: {
    // height: '3px',
    // width: '3px',
    // borderRadius: '50%',
    color: 'transparent',
  },
})(Slider);

const DEFAULT_CALC = 1440;

interface IProps {
  arthxValue: string;
  collateralValue: string;
  openModal: 0 | 1 | 2;
  onClose: () => void;
  selectedCollateralCoin: string;
  arthValue: string;
}

const MintModal = (props: WithSnackbarProps & IProps) => {
  const {
    openModal,
    onClose,
    arthxValue,
    collateralValue,
    arthValue,
    selectedCollateralCoin
  } = props;

  useEffect(() => window.scrollTo(0, 0), []);

  const core = useCore();
  const { account } = useWallet();
    
  const [calcDuration, setDuration] = useState<number>(DEFAULT_CALC);
  const [checked, setChecked] = React.useState(false);
  const [sliderValue, setSliderValue] = React.useState(1);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  
  const sliderClasses = useSliderStyles();
  const mintingFee = usePoolMintingFees(selectedCollateralCoin);
  const tokenDecimals = useTokenDecimals(selectedCollateralCoin);
  const collateralPool = core.getCollatearalPool(selectedCollateralCoin);
  const [arthXApproveStatus, ] = useApprove(
    core.ARTHX, 
    collateralPool.address
  );
  const [collatApproveStatus, ] = useApprove(
    core.tokens[selectedCollateralCoin],
    collateralPool.address,
  );

  const isARTHXApproved = arthXApproveStatus === ApprovalState.APPROVED;
  const isCollatApproved = collatApproveStatus === ApprovalState.APPROVED;

  const isCollatArthxApproved = useMemo(() => {
    if (!Number(arthxValue) && Number(collateralValue)) return !!account && isCollatApproved;
    else if (Number(arthxValue) && !Number(collateralValue)) return !!account && isARTHXApproved;

    return isARTHXApproved && !!account && isCollatApproved;
  }, [isARTHXApproved, account, collateralValue, arthxValue, isCollatApproved]);

  const handleCheck = (event: any) => {
    setChecked(event.target.checked);
  };

  const handleSliderChange = (event: any, value: any) => {
    setSliderValue(value);
    setDuration(DEFAULT_CALC - value * value);
  };

  const mintARTH = useMintARTH(
    selectedCollateralCoin,
    Number(collateralValue),
    Number(arthxValue),
    Number(arthValue),
    mintingFee,
    0.1,
  );

  const handleMint = () => {
    // setOpenModal(2);
    mintARTH(() => {
      onClose();
      setSuccessModal(true);
    });

    // let options = {
    //   content: () =>
    //     CustomSnack({
    //       onClose: props.closeSnackbar,
    //       type: 'green',
    //       data1: `Minting ${mintColl} ARTH`,
    //     }),
    // };
    // props.enqueueSnackbar('timepass', options);
    // setTimeout(() => {
    //   setSuccessModal(true);
    // }, 3000);
    // mintARTH();
  };

  const tradingFee = useMemo(() => {
    return BigNumber
      .from(
        parseUnits(`${arthValue}`, tokenDecimals)
      )
      .mul(mintingFee)
      .div(1e6);
  }, [arthValue, tokenDecimals, mintingFee]);

  return (
    <>
      <CustomModal
        closeButton
        handleClose={onClose}
        open={openModal === 1}
        modalTitleStyle={{}}
        modalContainerStyle={{}}
        modalBodyStyle={{}}
        title={`Confirm Mint`}
      >
        <>
          <TransparentInfoDiv
            labelData={`Your collateral supply`}
            rightLabelUnit={selectedCollateralCoin}
            rightLabelValue={collateralValue.toString()}
          />

          <TransparentInfoDiv
            labelData={`Your share supply`}
            rightLabelUnit={'ARTHX'}
            rightLabelValue={arthxValue.toString()}
          />

          <TransparentInfoDiv
            labelData={`Trading Fee`}
            rightLabelUnit={'ARTH'}
            rightLabelValue={getDisplayBalance(tradingFee, 6)}
          />

          <Divider
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              margin: '15px 0px',
            }}
            // variant={'middle'}
          />

          <TransparentInfoDiv
            labelData={`You will mint`}
            // labelToolTipData={'testing'}
            rightLabelUnit={'ARTH'}
            rightLabelValue={arthValue.toString()}
          />

          {/*<CheckboxDiv>
            <FormControlLabel
              value=""
              checked={checked}
              control={
                <OrangeCheckBox
                  icon={<CheckBoxOutlineBlankIcon fontSize={'inherit'} />}
                  checkedIcon={
                    <CheckIcon
                      style={{
                        background: '#FF7F57',
                        color: 'white',
                        borderRadius: '6px',
                      }}
                      fontSize={'inherit'}
                    />
                  }
                  size={'medium'}
                />
              }
              label="Stake $ARTH and earn more rewards"
              labelPlacement="end"
              onChange={handleCheck}
            />
          </CheckboxDiv>*/}
          {checked && (
            <StakingDiv>
              <div>
                <OneLineInput style={{ margin: '0px' }}>
                  <div>
                    <InputLabel style={{ marginTop: '12px' }}>
                      Select how long would you like to stake
                    </InputLabel>
                  </div>
                  <InputNoDisplay>
                    <InternalSpan>{sliderValue} months</InternalSpan>
                  </InputNoDisplay>
                </OneLineInput>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: 'white',
                  flexDirection: 'row',
                  width: '100%',
                  paddingLeft: '16px',
                  marginTop: '5px',
                }}
              >
                <div className={sliderClasses.root}>
                  <PrettoRestrictSlider
                    // defaultValue={sliderValue ?? 1}
                    // onChange={handleSliderChange}
                    // // valueLabelFormat={valueLabelFormat}
                    // getAriaValueText={valuetext}
                    // aria-labelledby="discrete-slider-small-steps"
                    // step={1}
                    // min={1}
                    // max={36}
                    // valueLabelDisplay="on"
                    // // marks={marks}
                    // ValueLabelComponent={"strong"}
                    defaultValue={1}
                    getAriaValueText={valuetext}
                    valueLabelFormat={valuetext}
                    // ValueLabelComponent={'span'}
                    // value={sliderValue}
                    onChange={handleSliderChange}
                    aria-label="pretto slider"
                    step={1}
                    marks
                    min={1}
                    max={36}
                    valueLabelDisplay="off"
                  />
                  <div
                    style={{
                      marginTop: -15,
                      marginLeft: -15,
                      marginBottom: 15,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <TimeSpan>1 month</TimeSpan>
                    <TimeSpan>3 Years</TimeSpan>
                  </div>
                </div>
              </div>
              <TransparentInfoDiv
                labelData={`Realtime earning`}
                // labelToolTipData={'testing'}
                rightLabelUnit={'MAHA'}
                rightLabelValue={'~100.0'}
                countUp
                cEnd={10}
                cDuration={calcDuration}
                cStart={0}
              />

              <TransparentInfoDiv
                labelData={`ROR`}
                // labelToolTipData={'testing'}
                // rightLabelUnit={''}
                rightLabelValue={String(10 * sliderValue) + '%'}
              />

              <TransparentInfoDiv
                labelData={`APY`}
                // labelToolTipData={'testing'}
                // rightLabelUnit={'MAHA'}
                rightLabelValue={String(10 * sliderValue) + '%'}
              />
            </StakingDiv>
          )}
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
                  onClose();

                  let options = {
                    content: () =>
                      CustomSnack({
                        onClose: props.closeSnackbar,
                        type: 'red',
                        data1: `Minting ${collateralValue} ARTH cancelled`,
                      }),
                  };
                  props.enqueueSnackbar('timepass', options);
                }}
              />
            </div>
            <div style={{ width: '100%' }}>
              <Button
                disabled={
                  !Number(arthValue) || 
                  !isCollatArthxApproved ||
                  !(Number(collateralValue) || Number(arthxValue))
                }
                text={checked ? 'Confirm Mint and Stake' : 'Confirm Mint'}
                // textStyles={{ color: '#F5F5F5' }}
                size={'lg'}
                onClick={handleMint}
              />
            </div>
          </div>
        </>
      </CustomModal>

      <CustomSuccessModal
        modalOpen={successModal}
        setModalOpen={() => setSuccessModal(false)}
        title={'Minting ARTH successful!'}
        // subTitle={'View Transaction'}
        subsubTitle={
          'Your transaction is now being mined on the blockchain. You should consider staking your tokens to earn extra rewards!'
        }
        buttonText={'Stake your ARTH'}
        buttonType={'default'}
        buttonTo={'/farming'}
      />
    </>
  );
};

export default withSnackbar(MintModal);

const StakingDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0 0 0;
`;

const OneLineInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  margin: 5px 0 10px 0;
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
