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
import BondModal from './BondModal';
import useBasisCash from '../../../../hooks/useBasisCash';
import { VaultInfo } from '../../../../basis-cash/types';
import useStakedBalanceOnVault from '../../../../hooks/useStakedBalanceOnVault';
import TokenSymbol from '../../../../components/TokenSymbol';
import useStakeToVault from '../../../../hooks/useBondToVault';
import WithdrawShareFromVault from '../../../../hooks/withdrawShareFromVault';
import useBoardroomUnbondingDetails from '../../../../hooks/useBoardroomUnbondingDetails';
import ProgressCountdown from './ProgressCountdown';
import UnbondModal from './UnBondModal';
import useUnbondFromVault from '../../../../hooks/useUnbondFromVault';


interface ImageConTainerProps {
  marginLeft: number;
  zIndex: number;
}


const Stake = ({ vault }: { vault: VaultInfo }) => {
  const basisCash = useBasisCash();

  const stakingToken =
    vault.depositTokenName === 'MAHA'
      ? basisCash.MAHA
      : vault.depositTokenName === 'ARTH'
        ? basisCash.ARTH
        : vault.depositTokenName === 'ARTH_DAI-MLP-LPv1'
          ? basisCash.arthDai
          : basisCash.externalTokens[vault.depositTokenName];

  const [approveStatus, approve] = useApprove(
    stakingToken,
    basisCash.getBoardroomVault(vault.kind)?.address,
  );

  const logos = [];
  if (vault.depositTokenName === 'ARTH_DAI-UNI-LPv2') logos.push('ARTH', 'DAI');
  else if (vault.depositTokenName === 'ARTH_DAI-MLP-LPv1') logos.push('ARTH', 'DAI');
  else if (vault.depositTokenName === 'MAHA_ETH-UNI-LPv2') logos.push('MAHA', 'ETH');
  else if (vault.depositTokenName === 'ARTH_DAI-MAHA-LP') logos.push('ARTH', 'DAI');
  else logos.push(stakingToken.symbol);


  const tokenBalance = useTokenBalance(stakingToken);
  const stakedBalance = useStakedBalanceOnVault(vault.kind);

  const { onBond } = useStakeToVault(vault);
  const { onWithdraw } = WithdrawShareFromVault(vault);
  const { onUnbond } = useUnbondFromVault(vault);

  const [onPresentBond, onDismissBond] = useModal(
    <BondModal
      max={tokenBalance}
      onConfirm={(value) => {
        onBond(value);
        onDismissBond();
      }}
      onCancel={() => onDismissBond()}
      tokenName={vault.depositTokenName}
    />,
  );

  const [onPresentUnBond, onDismissUnbond] = useModal(
    <UnbondModal
      max={stakedBalance}
      onConfirm={(value) => {
        onUnbond(value);
        onDismissUnbond();
      }}
      onCancel={() => onDismissUnbond()}
      tokenName={vault.depositTokenName}
    />,
  );

  const [depositDate, endDate, unbondedAmount] = useBoardroomUnbondingDetails(
    vault,
    stakedBalance,
  );

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyleLabel>{`${vault.depositTokenName} Deposited`} </StyleLabel>
          <StyledCardHeader>
            <StyledCardIcon>
              {logos && logos.length > 0 && (
                <LogoContainer>
                  {logos.map((l) => <TokenSymbol symbol={l} size={54} />)}
                </LogoContainer>
              )}
            </StyledCardIcon>
            <StyledValue>{getDisplayBalance(stakedBalance)}</StyledValue>
            <StyledCardActions>
              {approveStatus === ApprovalState.APPROVED && (
                <>
                  <IconButton onClick={onPresentUnBond}>
                    <RemoveIcon />
                  </IconButton>
                  <StyledActionSpacer />
                  <IconButton onClick={onPresentBond}>
                    <AddIcon />
                  </IconButton>
                </>
              )}
            </StyledCardActions>
          </StyledCardHeader>
          <StyledDesc>There is a {vault.lockInPeriodDays} day withdrawal delay with this distribution contract.</StyledDesc>
          {approveStatus !== ApprovalState.APPROVED ? (
            <>
              <StyledDesc>Approve your tokens for use with this contract.</StyledDesc>
              <br />
              <Button
                // disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                onClick={approve}
                text={`Approve ${vault.depositTokenName}`}
              />
            </>
          ) : (
              <StyledDesc>
                You can now deposit your tokens to start earning inflationary rewards.
              </StyledDesc>
            )}
          {unbondedAmount.gt(0) && (
            <>
              <ProgressCountdown
                base={depositDate}
                deadline={endDate}
                description={`You have requested to withdraw ${getDisplayBalance(unbondedAmount, 18)} ${vault.depositTokenName
                  } which will be made available in`}
              />
              <br />
              <Button
                onClick={onWithdraw}
                disabled={endDate.getTime() > Date.now()}
                text={`Withdraw ${getDisplayBalance(unbondedAmount, 18)} ${vault.depositTokenName
                  }`}
              />
            </>
          )}
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};

const StyleLabel = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
  align-self: start;
  line-height: 24px;
  color: #ffffff;
  opacity: 0.64;
`;

const StyledValue = styled.div`
  color: rgba(255, 255, 255, 0.88);
  font-size: 24px;
  margin-left: 20px;
  font-weight: bold;
`;
const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  flex-direction: row;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: flex-end;
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
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(21px);
  border-radius: 12px;
  display: flex;
  width: 100%;
  max-width: 500px;
  flex-direction: column;
`;

const StyledDesc = styled.span`
  color: ${(props) => props.theme.color.grey[500]};
  font-weight: 400;
  font-size: 12px;
  text-align: center;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


const StyledCardIcon = styled.div`
  background-color: ${(props) => props.theme.color.grey[900]};
  // width: 72px;
  height: 72px;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
`;

export default Stake;
