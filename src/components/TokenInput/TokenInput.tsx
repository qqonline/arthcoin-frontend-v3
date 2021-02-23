import React from 'react';
import styled from 'styled-components';
import Input, { InputProps } from '../Input';

interface TokenInputProps extends InputProps {
  max: number | string;
  symbol: string;
  type?: string;
  label?: string;
  onSelectMax?: () => void;
}

const TokenInput: React.FC<TokenInputProps> = ({
  max,
  symbol,
  label,
  onChange,
  type,
  onSelectMax,
  value,
}) => {
  return (
    <StyledTokenInput>
      <StyledMaxText>
        {`${max.toLocaleString()} ${symbol} Available`}
      </StyledMaxText>
      {label && (<StyledMaxText>{label}</StyledMaxText>)}
      <br />
      <Input
        type={type}
        endAdornment={
          <StyledTokenAdornmentWrapper>
            <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
            <StyledSpacer />
            <div>
              <Button onClick={onSelectMax}>SET MAX</Button>
            </div>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
      />
    </StyledTokenInput>
  );
};

/*
            <div>
              <Button size="sm" text="Max" />
            </div>
*/

const StyledTokenInput = styled.div``;
const Button = styled.button`
  font-weight: 600;
  cursor: pointer;
  font-size: 16px;
  line-height: 20px;
  text-align: right;
  color: #F7653B;
  background: transparent;
  border: none;
  outline: none !important
  &:hover {
    background: transparent;
    color: #FFA981;
    border: none;
  }
  &:focus {
    background: transparent;
    border: none;
    outline: none;
  }
  &:disabled: {
    color: #ffffff;
    opacity: 0.32;
  }
`;
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
  // margin-bottom: 15px;
  height: 44px;
  justify-content: flex-start;
`;

const StyledTokenSymbol = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  opacity: 0.64;
`;

export default TokenInput;
