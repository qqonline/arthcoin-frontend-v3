import React from 'react';
import styled from 'styled-components';

interface ProgressCountdownProps {
  percentage: number;
  description: string;
}

const ProgressCountdown: React.FC<ProgressCountdownProps> = ({ percentage }) => {
  return (
    <Card>
      <StyledCardContentInner>
        <StyledProgressOuter>
          <StyledProgress progress={percentage} />
        </StyledProgressOuter>
        <StyledDesc>{`${percentage} %`}</StyledDesc>
      </StyledCardContentInner>
    </Card>
  );
};

const StyledCountdown = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.color.grey[100]};
  margin: 0 0 6px 0;
`;

const StyledProgressOuter = styled.div`
  width: 100%;
  height: 15px;
  border-radius: 15px;
  background: ${(props) => props.theme.color.grey[700]};
`;

const StyledProgress = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 100%;
  border-radius: 15px;
  background: #f7653b;
`;

const StyledDesc = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 130%;
  text-align: center;
  color: #ffffff;
  white-space: nowrap;
  margin-left: 10px;
`;

const StyledCardContentInner = styled.div`
  height: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  padding: ${(props) => props.theme.spacing[2]}px ${(props) => props.theme.spacing[4]}px;
`;
const Card = styled.div`
  min-width: 250px;
`;

export default ProgressCountdown;
