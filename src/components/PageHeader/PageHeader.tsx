import React from 'react';
import styled from 'styled-components';

interface PageHeaderProps {
  icon: React.ReactNode;
  subtitle?: string;
  title?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title }) => {
  return (
    <StyledPageHeader>
      <StyledTextContainer>
        <StyledTitle>{title}</StyledTitle>
        <StyledSubtitle>{subtitle}</StyledSubtitle>
      </StyledTextContainer>
      <StyledIcon>{icon}</StyledIcon>
    </StyledPageHeader>
  );
};

const StyledTextContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const StyledPageHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 900px;
  padding-bottom: ${(props) => props.theme.spacing[6]}px;
  padding-top: ${(props) => props.theme.spacing[6]}px;
`;

const StyledIcon = styled.div`
  font-size: 96px;
  height: 96px;
  line-height: 96px;
  width: 96px;
`;

const StyledTitle = styled.h1`
  color: ${(props) => props.theme.color.grey[100]};
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

const StyledSubtitle = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
`;

export default PageHeader;
