import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Button from '../../../components/Button';
import { Divider } from '@material-ui/core';
import TransparentInfoDiv from './InfoDiv';
import CustomModal from '../../../components/CustomModal';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { CustomSnack } from '../../../components/SnackBar';
import usePerformRecollateralize from '../../../hooks/callbacks/pools/performRecollateralize';
import { BigNumber } from '@ethersproject/bignumber';

interface IProps {
  receiveBonus: number;
  receiveShare: number;
  collateralAmount: number;
  openModal: boolean;
  selectedCollateral: string;
  onClose: () => void;
  toggleSuccessModal?: () => void;
}

const RecollatateralizeModal = (props: WithSnackbarProps & IProps) => {
  const {
    openModal,
    onClose,
    receiveBonus,
    selectedCollateral,
    receiveShare,
    collateralAmount,
    toggleSuccessModal
  } = props;

  const arthxAmountAfterFees = useMemo(() => {
    const arthOutMin = receiveBonus + receiveShare;

    const mintingAmount = BigNumber.from(Math.floor(Number(arthOutMin))).mul(1e6);
    return mintingAmount; // .mul(BigNumber.from(1e6).sub(mintingFee)).div(1e6);
  }, [receiveBonus, receiveShare]);

  const recollateralize = usePerformRecollateralize(
    selectedCollateral,
    BigNumber.from(Math.floor(collateralAmount * 1e6)),
    BigNumber.from(0),
  );

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <CustomModal
      closeButton
      handleClose={onClose}
      open={openModal}
      modalTitleStyle={{}}
      modalContainerStyle={{}}
      modalBodyStyle={{}}
      title={`Confirm Recollateralize ARTH`}
    >
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
                onClose();
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
                recollateralize(() => {
                  onClose();
                  toggleSuccessModal();
                });
              }}
            />
          </Grid>
        </Grid>
      </div>
    </CustomModal>
  );
};

export default withSnackbar(RecollatateralizeModal);
