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
  text-align: center;
  color: #FFFFFF;
  background: transparent;
  opacity: 0.88;
  flex: none;
  border: 1px solid white;
  border-radius: 8px;
  box-shadow: ${(props) => props.boxShadow};
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: ${(props) => props.fontSize}px;
  font-weight: 700;
  height: 38px;
  justify-content: center;
  outline: none;
  padding: 10px 22px;
  pointer-events: ${(props) => (!props.disabled ? undefined : 'none')};
  width: 100%;
  width: 100%;
  &:hover {
    background: #423b38;
    border: 1px solid rgba(255, 255, 255, 0.88);
    box-sizing: border-box;
    border-radius: 6px;
  }
  &:selected {
    background: #2a2827;
    border: 1px solid rgba(255, 255, 255, 0.32);
    box-sizing: border-box;
    border-radius: 6px;
  }
  &:disabled {
    border: 1px solid rgba(255, 255, 255, 0.32);
    box-sizing: border-box;
    border-radius: 6px;
  }
  &:focus {
    outline: none;
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
