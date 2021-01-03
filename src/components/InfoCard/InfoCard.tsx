import React from 'react';
import styled from 'styled-components';

const InfoCard: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>;

const StyledCard = styled.div`
  padding: 5px 0;
  color: #eee;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  backdrop-filter: blur(70px);
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.25);
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default InfoCard;
