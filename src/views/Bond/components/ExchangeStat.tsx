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
        <StyledCardTitle>{title}</StyledCardTitle>
        <StyledDesc>{description}</StyledDesc>
      </StyledCardContentInner>
    </InfoCard>
  );
};

const StyledCardTitle = styled.div`
  color: ${(props) => props.theme.color.grey[200]};
  font-size: 20px;
  font-weight: 700;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledDesc = styled.span`
  color: ${(props) => props.theme.color.grey[300]};
  text-align: center;
`;

const StyledCardContentInner = styled.div`
  height: 100%;
  display: flex;
  // align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px 20px;
`;

export default ExchangeStat;
