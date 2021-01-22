import React, { useState } from 'react';
import styled from 'styled-components';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import useStabilityFee from '../../../hooks/useStabilityFee';

interface TokenInputProps {
  value: any;
  max: number | string;
  approve: any;
  isMahaApproved: boolean;
}
const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 35,
      height: 19,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(15px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: '#F7653B',
          borderColor: '#F7653B',
        },
      },
    },
    thumb: {
      width: 15,
      height: 15,
      boxShadow: 'none',
      color: 'white',
    },
    track: {
      borderRadius: 18 / 2,
      opacity: 1,
      backgroundColor: '#363130',
    },
    checked: {},
  }),
)(Switch);
const MahaFeeCheck: React.FC<TokenInputProps> = ({ max, value, isMahaApproved, approve }) => {
  const symbol = 'MAHA';
  const stabilityFee = useStabilityFee();
  const [mahaAprroved, toggleCheckbox] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleCheckbox(event.target.checked);
  };
  return (
    <StyledTokenInput>
      <StyledMaxText>
        <span>
          {max.toLocaleString()} {symbol} Available
        </span>
        <span>Stability Fee: {stabilityFee.toString()}%</span>
      </StyledMaxText>

      <StyledInputWrapper style={{ border: mahaAprroved ? 'none' : '1px solid #f09700' }}>
        <StyledInput
          disabled
          placeholder={'0'}
          value={value * stabilityFee.toNumber() * 0.01}
        />
        <StyledTokenAdornmentWrapper>
          <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
          <StyledSpacer />
          <div>
            {/* <Button disabled={isMahaApproved} size="sm" text="Approve" onClick={approve} /> */}
            <AntSwitch checked={mahaAprroved} onChange={handleChange} name="checkedC" />
          </div>
        </StyledTokenAdornmentWrapper>
      </StyledInputWrapper>
      {!mahaAprroved && <HelperText>Approve MAHA to Reddem ARTH</HelperText>}
    </StyledTokenInput>
  );
};

const StyledInputWrapper = styled.div`
  align-items: center;
  background: #1f1e1e;
  box-sizing: border-box;
  border-radius: 6px;
  display: flex;
  padding: 0 ${(props) => props.theme.spacing[3]}px;
`;
const HelperText = styled.p`
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  color: #f09700;
`;
const StyledInput = styled.input`
  background: none;
  border: 0;
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 18px;
  flex: 1;
  height: 56px;
  margin: 0;
  padding: 0;
  outline: none;
`;
const StyledTokenInput = styled.div``;

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
`;

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const StyledMaxText = styled.div`
  align-items: center;
  color: ${(props) => props.theme.color.grey[400]};
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 44px;
  justify-content: space-between;
`;

const StyledTokenSymbol = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  opacity: 0.64;
`;

export default MahaFeeCheck;
