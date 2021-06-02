import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { withSnackbar, WithSnackbarProps } from 'notistack';

import { ModeProps } from '../index';
import ClaimModal from './ClaimModal';
import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import MobileRowCard from './MobileRowCard';
import DesktopRowCard from './DesktopRowCard';

import useCore from '../../../hooks/useCore';
import useModal from '../../../hooks/useModal';
import { StakingContract } from '../../../basis-cash';
import usePoolTokenRates from '../../../hooks/usePoolTokenRates';
import useTokenBalance from '../../../hooks/state/useTokenBalance';
import CustomSuccessModal from '../../../components/CustomSuccesModal';
import useStakingBalance from '../../../hooks/state/staking/useStakingBalance';
import useStakingRewards from '../../../hooks/state/staking/useStakingRewards';

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
  const [initialClaimableBalance, claimableBalance] = useStakingRewards(pool.contract);

  const rates = usePoolTokenRates();

  const [onPresentClaimModal, onDismissClaimModal] = useModal(
    <ClaimModal
      pool={pool}
      claimableBalance={claimableBalance}
      isMobile={isMobile}
      onCancel={() => onDismissClaimModal()}
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
      onCancel={() => onDismissWithdrawModal()}
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
      onCancel={() => onDismissDepositModal()}
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
        subsubTitle={
          'Your transaction is now being mined on the blockchain.'
        }
      />
      {!isMobile ? (
        <DesktopRowCard
          pool={pool}
          initialClaimableBalance={initialClaimableBalance}
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
          initialClaimableBalance={initialClaimableBalance}
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
