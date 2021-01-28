import React from 'react';
import styled from 'styled-components';
import Card from '../../../components/InfoCard';
import { withStyles, Theme } from '@material-ui/core/styles';
import InfoIcon from '../../../assets/img/InfoIcon.svg';
import Tooltip from '@material-ui/core/Tooltip';
const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#2A2827',
    color: 'white',
    fontWeight: 300,
    fontSize: '13px',
    borderRadius: '6px',
    padding: '20px',
  },
}))(Tooltip);
interface StatProps {
  icon?: string;
  title: string;
  description: string;
  toolTipTitle?: string;
  toolTipLink?: string;
}

const Stat: React.FC<StatProps> = ({ icon, title, description, toolTipTitle, toolTipLink }) => {
  return (
    <Card>
      <StyledCardContentInner>
        {icon && <StyledIcon>{icon}</StyledIcon>}
        <StyledTextWrapper>
          <StyledDesc>
            {description}
            <HtmlTooltip
              enterTouchDelay={0}
              title={
                <span>
                  {toolTipTitle}
                  {toolTipLink && <a href={toolTipLink}>{toolTipLink}</a>}
                </span>
              }
            >
              <img src={InfoIcon} alt="Inof" width="16px" className="margin-left-5" />
            </HtmlTooltip>
          </StyledDesc>
          <StyledCardTitle>{title}</StyledCardTitle>
        </StyledTextWrapper>
      </StyledCardContentInner>
    </Card>
  );
};

const StyledCardTitle = styled.div`
  color: ${(props) => props.theme.color.grey[200]};
  font-size: 18px;
  font-weight: 700;
`;

const StyledDesc = styled.span`
  color: ${(props) => props.theme.color.grey[400]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledIcon = styled.span`
  font-size: 28px;
  margin-right: 10px;
`;

const StyledTextWrapper = styled.span`
  display: flex;
  flex-direction: column;
`;

const StyledCardContentInner = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: ${(props) => props.theme.spacing[2]}px ${(props) => props.theme.spacing[4]}px;
`;

export default Stat;
