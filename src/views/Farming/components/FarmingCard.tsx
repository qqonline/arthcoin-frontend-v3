import React from 'react';
import MobileRowCard from './MobileRowCard';
import DesktopRowCard from './DesktopRowCard';
import WithdrawModal from './WithdrawModal';
import { useMediaQuery } from 'react-responsive';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { ModeProps } from '../index';
import DepositModal from './DepositModal';
import { StakingContract } from '../../../basis-cash';
import useModal from '../../../hooks/useModal';
import useCore from '../../../hooks/useCore';
import useTokenBalance from '../../../hooks/state/useTokenBalance';
import useStakingBalance from '../../../hooks/state/staking/useStakingBalance';
import useStakingRewards from '../../../hooks/state/staking/useStakingRewards';
import useStakingClaim from '../../../hooks/callbacks/staking/useStakingClaim';

interface IProps {
  mode?: ModeProps;
  cardData: StakingContract;
}

const FarmingCard = (props: WithSnackbarProps & IProps) => {
  const core = useCore();
  const isMobile = useMediaQuery({ maxWidth: '600px' });
  const pool = props.cardData;

  const depositTokenContract = core.tokens[pool.depositToken];
  const tokenBalance = useTokenBalance(depositTokenContract);

  const stakedBalance = useStakingBalance(pool.contract);
  const claimableBalance = useStakingRewards(pool.contract);
  const onClaim = useStakingClaim(pool.contract);

  const [onPresentWithdrawModal, onDismissWithdrawModal] = useModal(
    <WithdrawModal
      pool={pool}
      stakedBalance={stakedBalance}
      isMobile={isMobile}
      onCancel={() => onDismissWithdrawModal()}
    />,
  );

  const [onPresentDepositModal, onDismissDepositModal] = useModal(
    <DepositModal
      pool={pool}
      tokenBalance={tokenBalance}
      isMobile={isMobile}
      onCancel={() => onDismissDepositModal()}
    />,
  );

  return (
    <div>
      {!isMobile ? (
        <DesktopRowCard
          pool={pool}
          claimableBalance={claimableBalance}
          stakedBalance={stakedBalance}
          onDepositClick={onPresentDepositModal}
          onClaimClick={onClaim}
          onWithdrawClick={onPresentWithdrawModal}
        />
      ) : (
        <MobileRowCard
          pool={pool}
          onDepositClick={onPresentDepositModal}
          onClaimClick={onClaim}
          onWithdrawClick={onPresentWithdrawModal}
        />
      )}
    </div>
  );
};

export default withSnackbar(FarmingCard);
