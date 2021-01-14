import React from 'react';
import styled from 'styled-components';

import Button from '../../../../components/Button';
import CardContent from '../../../../components/CardContent';
import CardIcon from '../../../../components/CardIcon';
import { AddIcon, RemoveIcon } from '../../../../components/icons';
import IconButton from '../../../../components/IconButton';
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
      ? basisCash.MAHA
      : boardroom.depositTokenName === 'ARTH'
      ? basisCash.ARTH
      : basisCash.externalTokens['ARTH_DAI-UNI-LPv2'];

  const [approveStatus, approve] = useApprove(
    stakingToken,
    basisCash.currentBoardroom(boardroom.kind)?.address,
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
          <StyleLabel>{`${boardroom.depositTokenName} Staked`} </StyleLabel>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol={boardroom.depositTokenName} />
            </CardIcon>
            <StyledValue>{getDisplayBalance(stakedBalance)}</StyledValue>
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
          </StyledCardHeader>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};
const StyleLabel = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 10px;
  align-self: start;
  line-height: 24px;
  color: #ffffff;
  opacity: 0.64;
`;
const StyledValue = styled.div`
  color: rgba(255, 255, 255, 0.88);
  font-size: 36px;
  margin-left: 20px;
  font-weight: 700;
`;
const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  flex-direction: row;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-left: ${(props) => props.theme.spacing[4]}px;
  width: 100%;
`;

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Card = styled.div`
  background: linear-gradient(180deg, #1f1a1a 0%, #251c1d 100%);
  border-radius: 12px;
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
`;
export default Stake;
