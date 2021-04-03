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

const StyledProgressOuter = styled.div`
  width: 100%;
  height: 5px;
  border-radius: 5px;
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
  font-size: 12px;
  line-height: 130%;
  text-align: center;
  color: #ffffff;
  white-space: nowrap;
  margin-left: 10px;
`;

const StyledCardContentInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: ${(props) => props.theme.spacing[2]}px ${(props) => props.theme.spacing[4]}px;
`;
const Card = styled.div`
  min-width: 300px;
`;

export default ProgressCountdown;
