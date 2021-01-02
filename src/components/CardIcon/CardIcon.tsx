import React from 'react';
import styled from 'styled-components';

interface CardIconProps {
  children?: React.ReactNode;
}

const CardIcon: React.FC<CardIconProps> = ({ children }) => (
  <StyledCardIcon>{children}</StyledCardIcon>
);

const StyledCardIcon = styled.div`
  background-color: ${(props) => props.theme.color.grey[900]};
  width: 72px;
  height: 72px;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
`;

export default CardIcon;
