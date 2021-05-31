import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { withSnackbar, WithSnackbarProps } from 'notistack';

import { CustomSnack } from '../../../components/SnackBar';
import MobileRowCard from './MobileRowCard';
import DesktopRowCard from './DesktopRowCard';
import WithdrawModal from './WithdrawModal';
import { ModeProps } from '../index';
import DepositModal from './DepositModal';
import { StakingContract } from '../../../basis-cash';
import useModal from '../../../hooks/useModal';
import ClaimModal from './ClaimModal';
import useCore from '../../../hooks/useCore';
import useTokenBalance from '../../../hooks/state/useTokenBalance';
import useStakingBalance from '../../../hooks/state/staking/useStakingBalance';
import useStakingRewards from '../../../hooks/state/staking/useStakingRewards';
import usePoolTokenRates from '../../../hooks/usePoolTokenRates';
import CustomSuccessModal from '../../../components/CustomSuccesModal';

interface IProps {
  mode?: ModeProps;
  cardData: StakingContract;
}

const FarmingCard = (props: WithSnackbarProps & IProps) => {
  const [successModal, setSuccessModal] = useState(false)
  const pool = props.cardData;

  const core = useCore();
  const isMobile = useMediaQuery({ maxWidth: '600px' });
  const depositTokenContract = core.tokens[pool.depositToken];
  const tokenBalance = useTokenBalance(depositTokenContract);

  const stakedBalance = useStakingBalance(pool.contract);
  const claimableBalance = useStakingRewards(pool.contract);

  const rates = usePoolTokenRates();

  const [onPresentClaimModal, onDismissClaimModal] = useModal(
    <ClaimModal
      pool={pool}
      claimableBalance={claimableBalance}
      isMobile={isMobile}
      onCancel={(showPopup: boolean) => {
        onDismissClaimModal();
        if (showPopup) {
          let options = {
            content: () =>
              CustomSnack({
                onClose: props.closeSnackbar,
                type: 'red',
                data1: `Claim rewards cancelled`,
              }),
          };
          props.enqueueSnackbar('timepass', options);
        }
      }}
      rates={rates}
      closeSuccessModal={() => setSuccessModal(false)}
      openSuccessModal={() => setSuccessModal(true)}
      toggleSuccessModal={() => { setSuccessModal(!successModal) }}
    />,
  );

  const [onPresentWithdrawModal, onDismissWithdrawModal] = useModal(
    <WithdrawModal
      pool={pool}
      stakedBalance={stakedBalance}
      isMobile={isMobile}
      claimableBalance={claimableBalance}
      onCancel={(amount?: string, token?: string) => {
        onDismissWithdrawModal();
        if (amount && token) {
          let options = {
            content: () =>
              CustomSnack({
                onClose: props.closeSnackbar,
                type: 'red',
                data1: Number(amount)
                  ? `Withdraw ${amount} ${token} cancelled`
                  : `Withdraw ${token} cancelled`,
              }),
          };
          props.enqueueSnackbar('timepass', options);
        }
      }}
      closeSuccessModal={() => setSuccessModal(false)}
      openSuccessModal={() => setSuccessModal(true)}
      toggleSuccessModal={() => { setSuccessModal(!successModal) }}
    />,
  );

  const [onPresentDepositModal, onDismissDepositModal] = useModal(
    <DepositModal
      pool={pool}
      tokenBalance={tokenBalance}
      isMobile={isMobile}
      onCancel={(amount?: string, token?: string) => {
        onDismissDepositModal();
        if (amount && token) {
          const options = {
            content: () =>
              CustomSnack({
                onClose: props.closeSnackbar,
                type: 'red',
                data1: Number(amount)
                  ? `Deposit ${amount} ${token} cancelled`
                  : `Deposit ${token} cancelled`
              }),
          };
          props.enqueueSnackbar('timepass', options);
        }
      }}
      closeSuccessModal={() => setSuccessModal(false)}
      openSuccessModal={() => setSuccessModal(true)}
      toggleSuccessModal={() => { setSuccessModal(!successModal) }}
    />,
  );

  return (
    <div>
      <CustomSuccessModal
        modalOpen={successModal}
        setModalOpen={() => setSuccessModal(false)}
        title={'Transaction Success!'}
        // subTitle={'View Transaction'}
        subsubTitle={
          'Your transaction is now being mined on the blockchain.'
        }
      />
      {!isMobile ? (
        <DesktopRowCard
          pool={pool}
          claimableBalance={claimableBalance}
          stakedBalance={stakedBalance}
          rates={rates}
          onDepositClick={onPresentDepositModal}
          onClaimClick={onPresentClaimModal}
          onWithdrawClick={onPresentWithdrawModal}
        />
      ) : (
        <MobileRowCard
          pool={pool}
          claimableBalance={claimableBalance}
          stakedBalance={stakedBalance}
          rates={rates}
          onDepositClick={onPresentDepositModal}
          onClaimClick={onPresentClaimModal}
          onWithdrawClick={onPresentWithdrawModal}
        />
      )}
    </div>
  );
};

export default withSnackbar(FarmingCard);
