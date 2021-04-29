import React from 'react';
import MobileRowCard from './MobileRowCard';
import DesktopRowCard from './DesktopRowCard';
import WithdrawModal from './WithdrawModal'
import ClaimModal from './ClaimModal';
import { useMediaQuery } from 'react-responsive';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { ModeProps } from '../index';
import DepositModal from './DepositModal';
import { StakingContract } from '../../../basis-cash';
import useModal from '../../../hooks/useModal';

interface IProps {
  mode?: ModeProps;
  cardData: StakingContract
}

const FarmingCard = (props: WithSnackbarProps & IProps) => {
  const isMobile = useMediaQuery({ maxWidth: '600px' });
  const cardData = props.cardData

  const [onPresentClaimModal, onDismissClaimModal] = useModal(
    <ClaimModal isMobile={isMobile} onCancel={() => onDismissClaimModal()} />
  );

  const [onPresentWithdrawModal, onDismissWithdrawModal] = useModal(
    <WithdrawModal isMobile={isMobile} onCancel={() => onDismissWithdrawModal()} />
  );

  const [onPresentDepositModal, onDismissDepositModal] = useModal(
    <DepositModal isMobile={isMobile} onCancel={() => onDismissDepositModal()} />
  );

  return (
    <div>
      {!isMobile ?
        <DesktopRowCard
          pool={cardData}
          onDepositClick={onPresentDepositModal}
          onClaimClick={onPresentClaimModal}
          onWithdrawClick={onPresentWithdrawModal}
        />
        :
        <MobileRowCard
          pool={cardData}
          onDepositClick={onPresentDepositModal}
          onClaimClick={onPresentClaimModal}
          onWithdrawClick={onPresentWithdrawModal}
        />
      }
    </div>
  );
}


export default withSnackbar(FarmingCard);
