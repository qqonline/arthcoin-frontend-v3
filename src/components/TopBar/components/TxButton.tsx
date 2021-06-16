import React, { useState } from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import useModal from '../../../hooks/useModal';
import TxModal from './TxModal';
import transcationIcon from '../../../assets/img/transcation.png';
import HtmlTooltip from '../../../components/HtmlTooltip';

interface TxButtonProps {}

const TxButton: React.FC<TxButtonProps> = () => {
  const { account } = useWallet();
  
  // const [onPresentTransactionModal, onDismissTransactionModal] = useModal(
  //   <TxModal onDismiss={() => onDismissTransactionModal()} />,
  // );

  const [modal, setModal] = useState<boolean>(false);
  
  return (
    <div>
      {!!account && (
        <StyledTxButton>
          <HtmlTooltip enterTouchDelay={5000} title="Transaction">
            <img
              src={transcationIcon}
              width="24px"
              className="pointer"
              onClick={() => setModal(true)}
              alt="transactionIcon"
            />
          </HtmlTooltip>
          {/* <Button
            size="sm"
            text={pendingTransactions > 0 ? `${pendingTransactions} Pending` : `Transactions`}
            variant={pendingTransactions > 0 ? 'secondary' : 'default'}
            onClick={() => onPresentTransactionModal()}
          /> */}
        </StyledTxButton>
      )}
      {modal && <TxModal onDismiss={() => setModal(false)} />}
    </div>
  );
};

const StyledTxButton = styled.div`
  margin-right: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  width: 100%;
  @media (max-width: 768px) {
    margin-right: 0px;
  } ;
`;

export default TxButton;
