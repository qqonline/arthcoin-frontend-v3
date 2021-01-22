import React, { useContext, useMemo } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Link } from 'react-router-dom';

interface ButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  to?: string;
  variant?: 'default' | 'secondary' | 'tertiary';
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  href,
  onClick,
  size,
  text,
  to,
  variant,
}) => {
  const { color, spacing } = useContext(ThemeContext);

  let buttonColor: string;
  switch (variant) {
    case 'secondary':
      buttonColor = color.teal[200];
      break;
    case 'default':
    default:
      buttonColor = color.primary.main;
  }

  let boxShadow: string;
  let buttonSize: number;
  let buttonPadding: number;
  let fontSize: number;
  switch (size) {
    case 'sm':
      buttonPadding = spacing[3];
      buttonSize = 36;
      fontSize = 14;
      break;
    case 'lg':
      buttonPadding = spacing[4];
      buttonSize = 72;
      fontSize = 16;
      break;
    case 'md':
    default:
      buttonPadding = spacing[4];
      buttonSize = 56;
      fontSize = 16;
  }

  const ButtonChild = useMemo(() => {
    if (to) {
      return <StyledLink to={to}>{text}</StyledLink>;
    } else if (href) {
      return (
        <StyledExternalLink href={href} target="__blank">
          {text}
        </StyledExternalLink>
      );
    } else {
      return text;
    }
  }, [href, text, to]);

  return (
    <StyledButton
      boxShadow={boxShadow}
      color={buttonColor}
      disabled={disabled}
      fontSize={fontSize}
      onClick={onClick}
      padding={buttonPadding}
      size={buttonSize}
    >
      {children}
      {ButtonChild}
    </StyledButton>
  );
};

interface StyledButtonProps {
  boxShadow: string;
  color: string;
  disabled?: boolean;
  fontSize: number;
  padding: number;
  size: number;
}

const StyledButton = styled.button<StyledButtonProps>`
  align-items: center;
  white-space: nowrap;
  background: linear-gradient(38.44deg, #F47F57 15.81%, #FD5656 87.57%);
  border: 0;
  border-radius: 6px;
  box-shadow: ${(props) => props.boxShadow};
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 38px;
  justify-content: center;
  outline: none;
  padding: 10px 22px;
  pointer-events: ${(props) => (!props.disabled ? undefined : 'none')};
  width: 100%;
  &:hover {
    background: #FF7F57;
  }
  &:selected {
    background: linear-gradient(180deg, #F47F57 -11.33%, #FD5656 100%);
  }
  &:disabled {
    background: rgba(255,255,255,0.32);
    color: rgba(255, 255, 255, 0.88);
    cursor: not-allowed;
  }
`;

const StyledLink = styled(Link)`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 38px;
  justify-content: center;
  margin: 0 ${(props) => -props.theme.spacing[4]}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
`;

const StyledExternalLink = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 38px;
  justify-content: center;
  margin: 0 ${(props) => -props.theme.spacing[4]}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
`;

export default Button;
