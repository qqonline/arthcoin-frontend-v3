import React from 'react';
import styled from 'styled-components';
import InfoCard from '../../../components/InfoCard';

interface ExchangeStatProps {
  title: string;
  description: string;
}

const ExchangeStat: React.FC<ExchangeStatProps> = ({ title, description }) => {
  return (
    <InfoCard>
      <StyledCardContentInner>
        <StyledDesc>{description}</StyledDesc>
        <StyledCardTitle>{title}</StyledCardTitle>
      </StyledCardContentInner>
    </InfoCard>
  );
};

const StyledCardTitle = styled.div`
  font-size: 17px;
  font-weight: 700;
  text-align: center;
  color: #FFFFFF;
  opacity: 0.88;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledDesc = styled.span`
  color: #FFFFFF;
  opacity: 0.64;
  text-align: center;
  margin-bottom: 2px;
  font-size: 12px;
`;

const StyledCardContentInner = styled.div`
  height: 100%;
  width:100%;
  display: flex;
  // align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px 20px 0;
`;

export default ExchangeStat;
