import { Trash } from 'react-feather';
import styled from 'styled-components';
import { Divider } from '@material-ui/core';
import React, { useMemo, useState } from 'react';

import Label from '../../Label';
import Button from '../../Button';
import Spacer from '../../Spacer';
import Transaction from './Transaction';
import { TransactionDetails } from '../../../state/transactions/reducer';
import {
  isTransactionRecent,
  useAllTransactions,
  useClearAllTransactions,
} from '../../../state/transactions/hooks';
import CloseIcon from '../../../assets/img/CloseIcon.svg';
import IconButton from '@material-ui/core/IconButton';


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
    <MainDiv>
      <BackgroundAbsolute onClick={() => handleClose()} />
      <PositionDiv>
        <WalletDiv>
          <ModalHeader>
            <Title>Recent Transactions</Title>
            <div>
              <ClearAll>Clear all</ClearAll>
              <IconButton aria-label="close" onClick={() => handleClose()}>
                <img src={CloseIcon} width="24px" alt="" />
              </IconButton>
            </div>
          </ModalHeader>
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
        </WalletDiv>
      </PositionDiv>
    </MainDiv>
  );
};

const BackgroundAbsolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

const MainDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  width: 100vw;
  height: 100vh;
`;

const PositionDiv = styled.div`
  box-sizing: border-box;
  margin: 0px auto;
  padding: 0px 24px;
  width: 100%;
  position: relative;
`;

const WalletDiv = styled.div`
  position: absolute;
  background: linear-gradient(180deg, #48423e 0%, #373030 100%);
  border-radius: 12px;
  right: 22px;
  top: 72px;
  width: 380px;
  z-index: 10;
  transition: 1s ease-in-out;
`;

const ModalHeader = styled.div`
  margin: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
`

const Title = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;
`

const LeftHeaderSection = styled.div`

`

const ClearAll = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  color: rgba(255, 255, 255, 0.32);
`


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
