import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import { withStyles, Theme } from '@material-ui/core/styles';
import Button from '../../Button/TransperantButton';
import { useAllTransactions } from '../../../state/transactions/hooks';
import useModal from '../../../hooks/useModal';
import TxModal from './TxModal';
import transcationIcon from '../../../assets/img/transcation.png';
import Tooltip from '@material-ui/core/Tooltip';
const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#2A2827',
    color: 'white',
    fontWeight: 300,
    fontSize: '13px',
    borderRadius: '6px',
    padding: '15px',
  },
}))(Tooltip);
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
      {!!account && (
        <StyledTxButton>
          <HtmlTooltip enterTouchDelay={5000} title="Transaction">
            <img
              src={transcationIcon}
              width="24px"
              className="pointer"
              onClick={() => onPresentTransactionModal()}
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
    </>
  );
};

const StyledTxButton = styled.div`
  margin-right: ${(props) => props.theme.spacing[4]}px;
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
