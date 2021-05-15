import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import CustomInputContainer from '../../../components/CustomInputContainer';
import Button from '../../../components/Button';
import { ModeProps } from '../index';
import { StakingContract } from '../../../basis-cash';
import { BigNumber } from '@ethersproject/bignumber';
import CustomModal from '../../../components/CustomModal';
import useStakingWithdraw from '../../../hooks/callbacks/staking/useStakingWithdraw';
import { getDisplayBalance } from '../../../utils/formatBalance';

interface IProps {
  mode?: ModeProps;
  stakedBalance: BigNumber;
  pool: StakingContract;
  onCancel: () => void;
  onWithdraw?: () => void;
  isMobile: boolean;
}

export default (props: IProps) => {
  const [val, setValue] = useState<string>('0');
  const symbol = props.pool.depositTokenSymbols.join('-');

  const withdraw = useStakingWithdraw(
    props.pool.contract,
    Number(val),
    props.pool.depositToken,
  );

  return (
    <CustomModal
      closeButton
      handleClose={props.onCancel}
      open={true}
      modalTitleStyle={{}}
      modalContainerStyle={{}}
      modalBodyStyle={{}}
      title={`Withdraw Your Tokens`}
    >
      <CustomInputContainer
        ILabelValue={`How much ${symbol} would you like to withdraw?`}
        IBalanceValue={getDisplayBalance(props.stakedBalance)}//just pass the balance here
        showBalance={false}
        ILabelInfoValue={''}
        DefaultValue={String(val)}
        LogoSymbol={'ARTH'}
        hasDropDown={false}
        SymbolText={symbol}
        setText={(t) => {
          console.log(t);
          setValue(String(t));
        }}
        inputMode={'decimal'}
        tagText={'MAX'}
        dontShowBackgroundContainer={true}
        multiIcons={true}
        symbols={props.pool.depositTokenSymbols}
      />
      <OneLine>
        <div style={{ flex: 1 }}></div>
        <OneLine>
          <BeforeChip>Staked Amount: {getDisplayBalance(props.stakedBalance)}</BeforeChip>
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
          <Button variant={'transparent'} text="Cancel" size={'lg'} onClick={props.onCancel} />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Button text={'Withdraw'} size={'lg'} onClick={withdraw} />
        </Grid>
      </Grid>
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
