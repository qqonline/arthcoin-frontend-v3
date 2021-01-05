import React from 'react';
import styled from 'styled-components';

import Button from '../../../../components/Button';
import Card from '../../../../components/Card';
import CardContent from '../../../../components/CardContent';
import CardIcon from '../../../../components/CardIcon';
import { AddIcon, RemoveIcon } from '../../../../components/icons';
import IconButton from '../../../../components/IconButton';
import Label from '../../../../components/Label';
import Value from '../../../../components/Value';

import useApprove, { ApprovalState } from '../../../../hooks/useApprove';
import useModal from '../../../../hooks/useModal';
import useTokenBalance from '../../../../hooks/useTokenBalance';

import { getDisplayBalance } from '../../../../utils/formatBalance';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import useBasisCash from '../../../../hooks/useBasisCash';
import useStakedBalanceOnBoardroom from '../../../../hooks/useStakedBalanceOnBoardroom';
import TokenSymbol from '../../../../components/TokenSymbol';
import useStakeToBoardroom from '../../../../hooks/useStakeToBoardroom';
import useWithdrawFromBoardroom from '../../../../hooks/useWithdrawFromBoardroom';

import { BoardroomInfo } from '../../../../basis-cash';

const Stake = ({ boardroom }: { boardroom: BoardroomInfo }) => {
  const basisCash = useBasisCash();

  const stakingToken =
    boardroom.depositTokenName === 'MAHA'
      ? basisCash?.MAHA
      : boardroom.depositTokenName === 'ARTH'
      ? basisCash?.ARTH
      : basisCash?.externalTokens['ARTH_DAI-UNI-LPv2'];

  const [approveStatus, approve] = useApprove(
    stakingToken,
    basisCash?.currentBoardroom(boardroom.kind)?.address,
  );

  const tokenBalance = useTokenBalance(stakingToken);

  const stakedBalance = useStakedBalanceOnBoardroom(boardroom.kind);

  const { onStake } = useStakeToBoardroom(boardroom);
  const { onWithdraw } = useWithdrawFromBoardroom(boardroom);

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={(value) => {
        onStake(value);
        onDismissDeposit();
      }}
      tokenName={boardroom.depositTokenName}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={(value) => {
        onWithdraw(value);
        onDismissWithdraw();
      }}
      tokenName={boardroom.depositTokenName}
    />,
  );

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol={boardroom.depositTokenName} />
            </CardIcon>
            <Value value={getDisplayBalance(stakedBalance)} />
            <Label text={`${boardroom.depositTokenName} Staked`} />
          </StyledCardHeader>
          <StyledCardActions>
            {approveStatus !== ApprovalState.APPROVED ? (
              <Button
                disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                onClick={approve}
                text={`Approve ${boardroom.depositTokenName}`}
              />
            ) : (
              <>
                <IconButton onClick={onPresentWithdraw}>
                  <RemoveIcon />
                </IconButton>
                <StyledActionSpacer />
                <IconButton onClick={onPresentDeposit}>
                  <AddIcon />
                </IconButton>
              </>
            )}
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`;

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Stake;
