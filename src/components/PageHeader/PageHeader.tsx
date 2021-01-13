import React from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';

interface PageHeaderProps {
  icon?: React.ReactNode;
  subtitle?: string;
  title?: string;
  secondParaTitle?: string;
  secondParaDescription?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title, secondParaTitle, secondParaDescription }) => {
  return (
    <StyledPageHeader>
      <Container size="lg">
        <StyledPageContent>
          <StyledTextContainer>
            <StyledTitle>{title}</StyledTitle>
            <StyledSubtitle>{subtitle}</StyledSubtitle>
            {secondParaTitle && <SecondParaTitle>{secondParaTitle}</SecondParaTitle>}
            {secondParaDescription && <SecondParaDescription>{secondParaDescription}</SecondParaDescription>}
          </StyledTextContainer>
          {icon}
        </StyledPageContent>
      </Container>
    </StyledPageHeader>
  );
};

const StyledPageContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  min-height: 150px;
  padding: 0 15px;
`;

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
  background: linear-gradient(180deg, #2a2827 0%, rgba(42, 40, 39, 0) 100%);
  padding-bottom: ${(props) => props.theme.spacing[6]}px;
  padding-top: ${(props) => props.theme.spacing[6]}px;
  padding-left: 15px;
  padding-right: 15px;
`;

const SecondParaTitle = styled.h3`
  color: ${(props) => props.theme.color.grey[100]};
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 0;
`;

const StyledSubtitle = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  max-width: 500px;
  padding: 0;
`;
const SecondParaDescription = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 18px;
  font-weight: 300;
  max-width: 500px;
  margin: 0;
  padding: 0;
`;
const StyledTitle = styled.h1`
  color: ${(props) => props.theme.color.grey[100]};
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;
export default PageHeader;
