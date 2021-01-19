import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import Button from '../../Button/TransperantButton';
import { useAllTransactions } from '../../../state/transactions/hooks';
import useModal from '../../../hooks/useModal';
import TxModal from './TxModal';
import TranscationSnackbar from './TranscationSnackbar';
interface TxButtonProps {}

const TxButton: React.FC<TxButtonProps> = () => {
  const { account } = useWallet();
  const allTransactions = useAllTransactions();

  const pendingTransactions = useMemo(
    () => Object.values(allTransactions).filter((tx) => !tx.receipt).length,
    [allTransactions],
  );

  const [onPresentTransactionModal, onDismissTransactionModal] = useModal(
    <TxModal onDismiss={() => onDismissTransactionModal()} />,
  );
  return (
    <>
      <TranscationSnackbar
        notificationCount={1}
        open
        title="Redeeming 4 ARTH"
        subtitle="Stability Fee = 4%"
        isScucess={false}
      />
      {!!account && (
        <StyledTxButton>
          <Button
            size="sm"
            text={pendingTransactions > 0 ? `${pendingTransactions} Pending` : `Transactions`}
            variant={pendingTransactions > 0 ? 'secondary' : 'default'}
            onClick={() => onPresentTransactionModal()}
          />
        </StyledTxButton>
      )}
    </>
  );
};

const StyledTxButton = styled.div`
  margin-right: ${(props) => props.theme.spacing[4]}px;
`;

export default TxButton;
