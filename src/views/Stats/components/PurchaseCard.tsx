import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button/Button';
import { withStyles, Theme } from '@material-ui/core/styles';
import InfoIcon from '../../../assets/img/ToolTipColored.svg';
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
  timeRemaining?: string;
  timeRemainingToolTip?: string;
  title: string;
  price: string;
  isPurchase: boolean;
  toolTipTitle?: string;
  percenTageIncreaseText?: string;
}

const PurchaseCard: React.FC<StatProps> = ({
  isPurchase,
  timeRemaining,
  price,
  percenTageIncreaseText,
  title,
  toolTipTitle,
  timeRemainingToolTip,
}) => {
  return (
    <PurChaseCardPadding isPurchase={isPurchase}>
      <InfoContent>
        <div>
          <StyledTitle>
            {title}
            <HtmlTooltip enterTouchDelay={0} title={<span>{toolTipTitle}</span>}>
              <img src={InfoIcon} alt="Inof" width="16px" className="margin-left-5" />
            </HtmlTooltip>
          </StyledTitle>
          <TitleBold>{price}</TitleBold>
          <IncreasedText>{percenTageIncreaseText}</IncreasedText>
        </div>
        <div className="dialog-class">
          <TimeComponent>{timeRemaining}</TimeComponent>
          <HtmlTooltip enterTouchDelay={0} title={<span>{timeRemainingToolTip}</span>}>
            <img src={InfoIcon} alt="Inof" width="16px" />
          </HtmlTooltip>
        </div>
      </InfoContent>
      <StyledDesc>ARTH Bonds ($ARTHB) can be purchased at 20% discount</StyledDesc>
      <Button text="Purchase ARTHB at 20% Discount" />
      <ConditionText>{'Enable until 12hr TWAP < $0.95'}</ConditionText>
    </PurChaseCardPadding>
  );
};
const PurChaseCardPadding = styled.div<{ isPurchase: boolean }>`
  padding: 30px;
`;

const StyledTitle = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: #ffffff;
  opacity: 0.64;
`;
const TimeComponent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-weight: 600;
  margin-right: 10px;
  font-size: 12px;
  color: #ffffff;
  opacity: 0.6;
  padding: 5px 10px;
`;
const IncreasedText = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  color: #178a50;
`;
const TitleBold = styled.div`
  font-style: normal;
  margin-top: 13px;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #ffffff;
`;
const InfoContent = styled.div`
  flex: 1 1;
  display: flex !important;
  align-items: end;
  justify-content: space-between;
`;
const StyledDesc = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 140%;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  color: #ffffff;
  opacity: 0.88;
`;
const ConditionText = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 140%;
  text-align: center;
  color: #ffffff;
  opacity: 0.6;
  margin-top: 15px;
`;
export default PurchaseCard;
