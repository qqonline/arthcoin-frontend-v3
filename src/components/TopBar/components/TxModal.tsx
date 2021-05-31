import { Trash } from 'react-feather';
import styled from 'styled-components';
import { Divider } from '@material-ui/core';
import React, { useMemo, useState } from 'react';

import Label from '../../Label';
import Button from '../../Button';
import Spacer from '../../Spacer';
import Transaction from './Transaction';
import Modal from '../../NewModal/index';
import { TransactionDetails } from '../../../state/transactions/reducer';
import {
  isTransactionRecent,
  useAllTransactions,
  useClearAllTransactions,
} from '../../../state/transactions/hooks';


const MAX_TRANSACTION_HISTORY = 10;

interface props {
  onDismiss?: Function;
}

const TxModal: React.FC<props> = ({ onDismiss }) => {
  const [openModal, toggleModal] = useState(true);

  const allTransactions = useAllTransactions();
  const { clearAllTransactions } = useClearAllTransactions();

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
  }, [allTransactions]);

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt);
  const confirmed = sortedRecentTransactions
    .filter((tx) => tx.receipt)
    .slice(0, MAX_TRANSACTION_HISTORY);
  
  const handleClose = () => {
    toggleModal(false);
    onDismiss();
  };

  return (
    <Modal title="Transactions" open={openModal} handleClose={handleClose}>
      {
        pending?.length > 0
          ? (
            <>
              <Label text="Pending transactions" />
              <StyledTransactionList>
                {pending.map((tx) => (
                  <Transaction key={tx.hash} tx={tx} />
                ))}
              </StyledTransactionList>
              <Spacer size="sm" />
            </>
          ) : (
            <div className="margin-top-bottom-20">
              <Label text="No pending transactions." color="#777" />
            </div>
          )
      }
      {
        confirmed?.length > 0
          ? (
            <>
              <Divider
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  margin: '15px 0px',
                }}
              />
              <StyledTitleArea style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Label text="Recent transactions" />
                {"  "}
                <StyledClearIconWrapper>
                  <Trash onClick={clearAllTransactions} size="16" />
                </StyledClearIconWrapper>
              </StyledTitleArea>
              <StyledTransactionList>
                {confirmed.map((tx) => (
                  <Transaction key={tx.hash} tx={tx} />
                ))}
              </StyledTransactionList>
            </>
          )
          : (
            <div className="margin-top-bottom-20">
              <Label text="No recent transactions." color="#777" />
            </div>
          )
      }

      <Divider
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          margin: '15px 0px',
        }}
      />
      <Button text="Close" onClick={handleClose} />
    </Modal>
  );
};

const StyledTitleArea = styled.div`
  display: flex;
  align-items: center;
`;

const StyledClearIconWrapper = styled.div`
  color: ${({ theme }) => theme.color.grey[300]};
`;

const StyledTransactionList = styled.div`
  display: flex;
  flex-direction: column;
`;

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime;
}

export default TxModal;
