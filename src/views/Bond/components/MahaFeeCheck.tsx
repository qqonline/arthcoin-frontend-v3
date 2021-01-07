import React from 'react';
import styled from 'styled-components';

import Button from '../..//../components/Button';
import useStabilityFees from '../../../hooks/useStabilityFee';

interface TokenInputProps {
  value: any;
  max: number | string;
  approve: any;
  isMahaApproved: boolean;
}

const MahaFeeCheck: React.FC<TokenInputProps> = ({ max, value, isMahaApproved, approve }) => {
  const symbol = 'MAHA';
  const stabilityFee = useStabilityFees();

  return (
    <StyledTokenInput>
      <StyledMaxText>
        {max.toLocaleString()} {symbol} Available &middot; Stability Fee:{' '}
        {stabilityFee.toString()}%
      </StyledMaxText>

      <StyledInputWrapper>
        <StyledInput disabled placeholder={'0'} value={value * stabilityFee.toNumber()} />
        <StyledTokenAdornmentWrapper>
          <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
          <StyledSpacer />
          <div>
            <Button disabled={isMahaApproved} size="sm" text="Approve" onClick={approve} />
          </div>
        </StyledTokenAdornmentWrapper>
      </StyledInputWrapper>
    </StyledTokenInput>
  );
};

const StyledInputWrapper = styled.div`
  align-items: center;
  background-color: #222;
  border-radius: ${(props) => props.theme.borderRadius}px;
  display: flex;
  padding: 0 ${(props) => props.theme.spacing[3]}px;
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
  justify-content: flex-end;
`;

const StyledTokenSymbol = styled.span`
  color: ${(props) => props.theme.color.grey[600]};
  font-weight: 700;
`;

export default MahaFeeCheck;
