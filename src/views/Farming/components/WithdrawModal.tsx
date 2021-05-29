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
import { ValidateNumber } from '../../../components/CustomInputContainer/RegexValidation';
import useTokenDecimals from '../../../hooks/useTokenDecimals';

interface IProps {
  mode?: ModeProps;
  stakedBalance: BigNumber;
  pool: StakingContract;
  onCancel: () => void;
  onWithdraw?: () => void;
  toggleSuccessModal?: () => void;
  isMobile: boolean;
  closeSuccessModal: () => void;
  openSuccessModal: () => void;
}

export default (props: IProps) => {
  const [isInputFieldError, setIsInputFieldError] = useState<boolean>(false);
  const [val, setValue] = useState<string>('0');
  const symbol = props.pool.depositTokenSymbols.join('-');

  const tokenDecimals = useTokenDecimals(props.pool.depositToken);
  
  const withdraw = useStakingWithdraw(
    props.pool.contract,
    Number(val),
    props.pool.depositToken,
  );

  const handleWithdraw = () => {
    withdraw(() => {
      props.onCancel();
      props.openSuccessModal();
      setTimeout(() => {
        props.closeSuccessModal();
      }, 5 * 1000)
    });
  }

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
        IBalanceValue={getDisplayBalance(props.stakedBalance)}
        showBalance={false}
        ILabelInfoValue={''}
        DefaultValue={String(val)}
        LogoSymbol={'ARTH'}
        hasDropDown={false}
        SymbolText={symbol}
        setText={(t) => {
          setValue(ValidateNumber(t) ? t : '0');
        }}
        inputMode={'decimal'}
        tagText={'MAX'}
        dontShowBackgroundContainer={true}
        multiIcons={true}
        symbols={props.pool.depositTokenSymbols}
        errorCallback={(flag: boolean) => { setIsInputFieldError(flag) }}
      />
      <OneLine>
        <div style={{ flex: 1 }}></div>
        <OneLine>
          <BeforeChip>Staked Amount: {Number(getDisplayBalance(props.stakedBalance, tokenDecimals)).toLocaleString()}</BeforeChip>
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
          <Button 
            text={'Withdraw'} 
            size={'lg'}
            disabled={isInputFieldError || !Number(val)}
            onClick={handleWithdraw} 
          />
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
