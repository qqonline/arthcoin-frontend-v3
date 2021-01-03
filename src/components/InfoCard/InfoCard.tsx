import React from 'react';
import styled from 'styled-components';

const InfoCard: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>;

const StyledCard = styled.div`
  padding: 5px 0;
  color: #eee;
  border-radius: 12px;
  // backdrop-filter: blur(70px);
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  flex: 1;
  // flex-direction: column;

  position: relative; /*  */
  box-sizing: border-box;

  background: #1a1919;
  background-clip: padding-box;
  border: solid 1px transparent;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -1px;
    border-radius: inherit;
    background: linear-gradient(to bottom, #4f1e23, #1d1a1a);
  }
`;

export default InfoCard;
