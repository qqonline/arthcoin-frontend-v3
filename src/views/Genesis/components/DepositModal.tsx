import { BigNumber } from '@ethersproject/bignumber';
import { StakingContract } from '../../../basis-cash';
import React, { useState } from 'react';
import useCore from '../../../hooks/useCore';
import useTokenDecimals from '../../../hooks/useTokenDecimals';
import useApprove, { ApprovalState } from '../../../hooks/callbacks/useApprove';
import useStakingDeposit from '../../../hooks/callbacks/staking/useStakingDeposit';
import CustomModal from '../../../components/CustomModal';
import CustomInputContainer from '../../../components/CustomInputContainer';
import { getDisplayBalance } from '../../../utils/formatBalance';
import { ValidateNumber } from '../../../components/CustomInputContainer/RegexValidation';
import Grid from '@material-ui/core/Grid';
import Button from '../../../components/Button';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

interface IProps {
  onCancel: () => void;
  onDeposit?: () => void;
}

export default (props: IProps) => {
  const [val, setValue] = useState<string>('0');
  const [isInputFieldError, setIsInputFieldError] = useState<boolean>(false);
  const isMobile = useMediaQuery({ maxWidth: '600px' });

  const symbol = 'ARTH' // change this for the collateral
  const tokenDecimals = 8 //token decimals over hee

  // const core = useCore();
  // const contract = core.contracts[props.pool.contract];
  // const tokenDecimals = useTokenDecimals(props.pool.depositToken);
  // const [approveStatus, approve] = useApprove(
  //   core.tokens[props.pool.depositToken],
  //   contract.address,
  // );
  //
  // const symbol = props.pool.depositTokenSymbols.join('-');
  //
  // const stake = useStakingDeposit(
  //   props.pool.contract,
  //   Number(val),
  //   props.pool.depositToken,
  //   symbol
  // );
  //
  // const handleStaking = () => {
  //   stake(() => {
  //     props.onCancel();
  //     props.openSuccessModal();
  //   });
  // }
  //
  // const isApproved = approveStatus === ApprovalState.APPROVED;
  // const isApproving = approveStatus === ApprovalState.PENDING;

  return (
    <CustomModal
      closeButton
      handleClose={props.onCancel}
      open={true}
      modalTitleStyle={{}}
      modalContainerStyle={{}}
      modalBodyStyle={{}}
      title={`Modal Header over here`}
    >
      <div>
        <CustomInputContainer
          ILabelValue={`Some Text over here`}
          IBalanceValue={'0'} //pass the balance here for MAX to work
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
          multiIcons={false}
          errorCallback={(flag: boolean) => { setIsInputFieldError(flag) }}
        />
        <OneLine>
          <div style={{ flex: 1 }}></div>
          <OneLine>
            <BeforeChip>Balance: //Balance over heere</BeforeChip>
            <TagChips>{symbol}</TagChips>
          </OneLine>
        </OneLine>

        <Grid
          container
          spacing={2}
          direction={isMobile ? 'column-reverse' : 'row'}
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
            <Button
              loading={false}
              text={'Deposit'}
              size={'lg'}
              onClick={() => {}}
              disabled={false}
            />
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
