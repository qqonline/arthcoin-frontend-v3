import React from 'react';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useStake from '../../../hooks/useStake';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useWithdraw from '../../../hooks/useWithdraw';

import { getDisplayBalance } from '../../../utils/formatBalance';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import { Bank } from '../../../basis-cash';
import Template from './Template';

interface StakeProps {
  bank: Bank;
}

const Stake: React.FC<StakeProps> = ({ bank }) => {
  const [approveStatus, approve] = useApprove(bank.depositToken, bank.address);

  // TODO: reactive update of token balance
  const tokenBalance = useTokenBalance(bank.depositToken);
  const stakedBalance = useStakedBalance(bank.contract);

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

  if (approveStatus !== ApprovalState.APPROVED) {
    return (
      <Template
        title={`${bank.depositTokenName} Staked`}
        buttonLabel={`Approve ${bank.depositTokenName}`}
        buttonDisabled={
          approveStatus === ApprovalState.PENDING || approveStatus === ApprovalState.UNKNOWN
        }
        buttonOnClick={approve}
        amount={getDisplayBalance(stakedBalance, bank.depositToken.decimal)}
        symbol={bank.depositTokenName}
      />
    );
  }

  return (
    <Template
      title={`${bank.depositTokenName} Staked`}
      buttonLabel={`Deposit ${bank.depositTokenName}`}
      buttonDisabled={bank.finished}
      buttonOnClick={() => (bank.finished ? null : onPresentDeposit())}
      amount={getDisplayBalance(stakedBalance, bank.depositToken.decimal)}
      symbol={bank.depositTokenName}
    />
  );
};
/* <CardContent>
        <StyledCardActions>
            {approveStatus !== ApprovalState.APPROVED ? (
              <Button
                disabled={
                  approveStatus === ApprovalState.PENDING ||
                  approveStatus === ApprovalState.UNKNOWN
                }
                onClick={approve}
                text={`Approve ${bank.depositTokenName}`}
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
          </StyledCardActions>
      </CardContent> */

export default Stake;
