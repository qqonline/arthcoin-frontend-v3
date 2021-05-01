import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import CustomInputContainer from '../../../components/CustomInputContainer';
import Button from '../../../components/Button';
import CustomModal from '../../../components/CustomModal';
import { StakingContract } from '../../../basis-cash';
import { BigNumber } from '@ethersproject/bignumber';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useStakingDeposit from '../../../hooks/callbacks/staking/useStakingDeposit';
import useApprove, { ApprovalState } from '../../../hooks/callbacks/useApprove';
import useCore from '../../../hooks/useCore';

interface IProps {
  onCancel: () => void;
  onDeposit?: () => void;
  isMobile: boolean;

  tokenBalance: BigNumber;
  pool: StakingContract;
}

export default (props: IProps) => {
  const symbol = props.pool.depositTokenSymbols.join('-');
  const core = useCore();

  const stake = useStakingDeposit(props.pool.contract, 0.1, props.pool.depositToken);
  const contract = core.contracts[props.pool.contract];

  const [approveStatus, approve] = useApprove(
    core.tokens[props.pool.depositToken],
    contract.address,
  );

  return (
    <CustomModal
      closeButton
      handleClose={props.onCancel}
      open={true}
      modalTitleStyle={{}}
      modalContainerStyle={{}}
      modalBodyStyle={{}}
      title={`Stake Your Tokens`}
    >
      <div>
        <CustomInputContainer
          ILabelValue={`How much ${symbol} would you like to supply?`}
          IBalanceValue={''}
          ILabelInfoValue={''}
          DefaultValue={'0.00'}
          LogoSymbol={'ARTH'}
          hasDropDown={false}
          SymbolText={symbol}
          setText={(val) => {}}
          inputMode={'decimal'}
          tagText={'MAX'}
          dontShowBackgroundContainer={true}
          multiIcons={true}
          symbols={props.pool.depositTokenSymbols}
        />
        <OneLine>
          <div style={{ flex: 1 }}></div>
          <OneLine>
            <BeforeChip>Balance: {getDisplayBalance(props.tokenBalance)}</BeforeChip>
            <TagChips>{symbol}</TagChips>
          </OneLine>
        </OneLine>
        <Grid
          container
          spacing={2}
          direction={props.isMobile ? 'column-reverse' : 'row'}
          style={{ marginTop: '32px' }}
        >
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Button
              variant={'transparent'}
              text="Cancel"
              size={'lg'}
              onClick={props.onCancel}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {approveStatus !== ApprovalState.APPROVED ? (
              <Button
                disabled={approveStatus === ApprovalState.PENDING}
                text={approveStatus === ApprovalState.PENDING ? 'Approving' : 'Approve'}
                size={'lg'}
                onClick={approve}
              />
            ) : (
              <Button
                text={'Deposit'}
                size={'lg'}
                onClick={async () => {
                  stake();
                  // if (props.onDeposit) props.onDeposit();
                }}
              />
            )}
          </Grid>
        </Grid>
      </div>
    </CustomModal>
  );
};

const OneLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  margin: 5px 0;
`;

const BeforeChip = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.64);
  margin-right: 5px;
`;

const TagChips = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 2px 8px;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.64);
`;
