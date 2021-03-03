import React from 'react';
import styled from 'styled-components';

import Button from '../../../../components/Button';
import CardWithTitle from '../../../../components/CardWithTitle';
import useApprove from '../../../../hooks/useApprove';
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
import { Grid } from '@material-ui/core';
import { CallMade } from '@material-ui/icons';


const Stake = ({ vault }: { vault: VaultInfo }) => {
  const basisCash = useBasisCash();

  const stakingToken =
    vault.depositTokenName === 'MAHA'
      ? basisCash.MAHA
      : vault.depositTokenName === 'ARTH'
        ? basisCash.ARTH
        : vault.depositTokenName === 'ARTH_DAI-MLP-LPv1'
          ? basisCash.arthDai
            : vault.depositTokenName === 'ARTH_DAI'
              ? basisCash.arthDai
              : basisCash.externalTokens[vault.depositTokenName];

  // eslint-disable-next-line
  const [approveStatus, approve] = useApprove(
    stakingToken,
    basisCash.getBoardroomVault(vault.kind)?.address,
  );

  const logos = [];
  const title = vault.depositTokenName === 'ARTH' ? 'ARTH-DAI' : vault.depositTokenName;
  if (vault.depositTokenName === 'ARTH_DAI-UNI-LPv2') logos.push('ARTH', 'DAI');
  else if (vault.depositTokenName === 'ARTH_DAI-MLP-LPv1') logos.push('ARTH', 'DAI');
  else if (vault.depositTokenName === 'MAHA_ETH-UNI-LPv2') logos.push('MAHA', 'ETH');
  else if (vault.depositTokenName === 'ARTH_DAI-MAHA-LP') logos.push('ARTH', 'DAI');
  else if (vault.depositTokenName === 'ARTH') logos.push('ARTH', 'DAI');
  else logos.push(stakingToken.symbol);


  const tokenBalance = useTokenBalance(stakingToken);
  const stakedBalance = useStakedBalanceOnVault(vault.kind);

  const { onBond } = useStakeToVault(vault);
  const { onWithdraw } = WithdrawShareFromVault(vault);
  const { onUnbond } = useUnbondFromVault(vault);
  // eslint-disable-next-line
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

  // eslint-disable-next-line
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
    <CardWithTitle titleComponent fullWidth>
      <StyledCardHeader>        
        <StyledCardIcon>
          {logos && logos.length > 0 && (
            <LogoContainer>
              {logos.map((l: any, idx: number) => (
                <TokenSymbol key={idx} symbol={l} size={36} left={idx>0?-5:0} />
              ))}
            </LogoContainer>
          )}
        </StyledCardIcon>
        <StyleLabel>{`${title} Staked`} </StyleLabel>
      </StyledCardHeader>
      <StyledCardContent>
        <StyledCardContentInner>
          <StyledFieldLabel>Your liquidity</StyledFieldLabel>
          <StyledValue>
            <Bolded>
            {getDisplayBalance(stakedBalance)}
            </Bolded>
            <Darked>MAHASWAP L2-V1</Darked>
          </StyledValue>
          <StyledFieldLabel>
            {`${tokenBalance} ${logos[0]} + 0 DAI `} Staked
          </StyledFieldLabel>

          <StyledRow>
            <Button to={''} variant="rounded">
            Provide liquidity on MahaSwap
            <CallMade fontSize='small' style={{transform: "scale(0.7)", marginLeft: 3}} />
            </Button>
          </StyledRow>
        </StyledCardContentInner>

        <StyledValue>
          {unbondedAmount.gt(-1) && (
            <ProgressCountdown
              base={depositDate}
              deadline={endDate}
              description={`Withdraw Period`}
              tooltip="Withdraw Period Tooltip"
            />
          )}
        </StyledValue>
        <p style={{ color: '#fff9', fontSize: 13, fontWeight: 300, textAlign: 'center' }}>
          500 ARTH+DAI requested for withdraw
        </p>

        <Grid container spacing={2} justify="center">
          <Grid item md={6} lg={6}>
            <Button
              onClick={onWithdraw}
              variant="outlined"
              disabled={endDate.getTime() > Date.now()}
              text="Withdraw"
            />
          </Grid>            
          <Grid item md={6} lg={6}>
            <Button
              // disabled={approveStatus !== ApprovalState.NOT_APPROVED}
              onClick={approve}
              text="Deposit"
            />
          </Grid>
        </Grid>
      </StyledCardContent>
    </CardWithTitle>
  );
};


const StyledRow = styled.div`
  margin: 20px 0;
`;

const StyledValue = styled.div`
  color: rgba(255, 255, 255, 0.64);
  font-size: 18px;
  font-weight: 600;
  margin: 10 0px;
`;

const Bolded = styled.span`
  color: white;
  margin-right: 10px;
`;

const Darked = styled.span`
  color: rgba(255, 255, 255, 0.4);
`;

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  flex-direction: row;
`;
const StyledCardIcon = styled.div`
  background-color: ${(props) => props.theme.color.grey[900]};
  // width: 72px;
  height: 36px;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyleLabel = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-left: 20px;  
  color: #ffffff;
`;

const StyledFieldLabel = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.64);
`;


const StyledCardContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: ${props => props.theme.spacing[4]}px;
  width: 100%;
  height: 400px;
`

const StyledCardContentInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  flex: 1;
`;


export default Stake;
