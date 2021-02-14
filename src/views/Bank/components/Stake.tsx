import React from 'react';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useStake from '../../../hooks/useStake';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useWithdraw from '../../../hooks/useWithdraw';
import styled from 'styled-components';
import { getDisplayBalance } from '../../../utils/formatBalance';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import { Bank } from '../../../basis-cash';
import Template from './Template';
import IconButton from '../../../components/IconButton';
import { AddIcon, RemoveIcon } from '../../../components/icons';
import Button from '../../../components/Button';
import { useWallet } from 'use-wallet';

interface StakeProps {
  bank: Bank;
}

const Stake: React.FC<StakeProps> = ({ bank }) => {
  const [approveStatus, approve] = useApprove(bank.depositToken, bank.address);

  // TODO: reactive update of token balance
  const tokenBalance = useTokenBalance(bank.depositToken);
  const stakedBalance = useStakedBalance(bank.contract);

  const { account, connect } = useWallet();

  const { onStake } = useStake(bank);
  const { onWithdraw } = useWithdraw(bank);

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        onStake(amount);
        onDismissDeposit();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        onWithdraw(amount);
        onDismissWithdraw();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  const actions = (
    <Actions>
      {!account ? (
        <Button onClick={() => connect('injected')} size="sm" text="Connect" />
      ) : approveStatus !== ApprovalState.APPROVED ? (
        <Button
          disabled={
            // bank.finished ||
            approveStatus === ApprovalState.PENDING
          }
          onClick={approve}
          text={`Approve `}
        />
      ) : (
        <>
          <IconButton onClick={onPresentWithdraw}>
            <RemoveIcon />
          </IconButton>
          <StyledActionSpacer />
          <IconButton
            disabled={bank.finished}
            onClick={() => (bank.finished ? null : onPresentDeposit())}
          >
            <AddIcon />
          </IconButton>
        </>
      )}
    </Actions>
  );

  return (
    <Template
      action={actions}
      title={`${bank.depositTokenName} Staked`}
      buttonLabel={
        bank.finished ? `Withdraw ${bank.depositTokenName}` : `Deposit ${bank.depositTokenName}`
      }
      buttonDisabled={false}
      buttonOnClick={() => (bank.finished ? onPresentWithdraw() : onPresentDeposit())}
      amount={getDisplayBalance(stakedBalance, bank.depositToken.decimal)}
      symbol={bank.depositTokenName}
    />
  );
};
/*  */

export default Stake;


const Actions = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: 15px 0 0;
  @media (max-width: 768px) {
    flex-direction: column;
  } ;
`;

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;
