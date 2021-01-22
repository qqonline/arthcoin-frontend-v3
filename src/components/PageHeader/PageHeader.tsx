import React, { useMemo } from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import Container from '../../components/Container';
import ProgressCountdown from './ProgressCountdown';

interface PageHeaderProps {
  icon?: React.ReactNode;
  subtitle?: string;
  title?: string;
  secondParaTitle?: string;
  showEpoch?: boolean;
  secondParaDescription?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  icon,
  subtitle,
  title,
  secondParaTitle,
  secondParaDescription,
  showEpoch = false,
}) => {
  const { prevAllocation, nextAllocation, currentEpoch } = useTreasuryAllocationTimes();
  const prevEpoch = useMemo(
    () =>
      nextAllocation.getTime() <= Date.now()
        ? moment().utc().startOf('day').toDate()
        : prevAllocation,
    [prevAllocation, nextAllocation],
  );
  const nextEpoch = useMemo(() => moment(prevEpoch).add(1, 'hour').toDate(), [prevEpoch]);
  return (
    <StyledPageHeader>
      <Container size="lg">
        <StyledPageContent>
          <StyledTextContainer>
            <StyledTitle>{title}</StyledTitle>
            <StyledSubtitle>{subtitle}</StyledSubtitle>
            {secondParaTitle && <SecondParaTitle>{secondParaTitle}</SecondParaTitle>}
            {secondParaDescription && (
              <SecondParaDescription>{secondParaDescription}</SecondParaDescription>
            )}
            {showEpoch && (
              <Grid
                container
                spacing={5}
                justify="flex-start"
                alignItems="flex-start"
                style={{ marginTop: '20px' }}
              >
                {/* <Grid item xs={12} md={4} lg={4} xl={4}>
                  <ProgressCountdown
                    base={prevEpoch}
                    deadline={nextEpoch}
                    description="Lock in period ends in"
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6} xl={6}>
                  <ProgressCountdown
                    base={prevEpoch}
                    deadline={nextEpoch}
                    description="Next Epoch"
                    showAdvanceButton
                  />
                </Grid> */}
              </Grid>
            )}
          </StyledTextContainer>
          <ALignRightOnMobile>{icon}</ALignRightOnMobile>
        </StyledPageContent>
      </Container>
    </StyledPageHeader>
  );
};
const ALignRightOnMobile = styled.div`
  align-self: center;
  @media (max-width: 768px) {
    align-self: flex-end;
  } ;
`;
const StyledPageContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  min-height: 150px;
  padding: 0 15px;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 0px;
  } ;
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    margin-top: -100px;
  } ;
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
  @media (max-width: 768px) {
    width: auto;
    padding-left: 0px;
    padding-right: 0px;
  } ;
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
  font-size: 16px;
  padding-top: 10px;
  font-weight: 300;
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
