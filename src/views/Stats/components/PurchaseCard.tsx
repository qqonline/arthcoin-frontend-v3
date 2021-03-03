import React from 'react';
import styled from 'styled-components';
import InfoIcon from '../../../assets/img/ToolTipColored.svg';
import { BigNumber } from 'ethers';
import { getDisplayBalance } from '../../../utils/formatBalance';
import HtmlTooltip from '../../../components/HtmlTooltip';

interface StatProps {
  timeRemaining?: string;
  priceToCompare12Twap?: BigNumber;
  priceToCompare1Twap?: BigNumber;
  timeRemainingToolTip?: string;
  title: string;
  price: BigNumber;
  isPurchase: boolean;
  toolTipTitle?: string;
  percenTageIncreaseText?: string;
}

const PurchaseCard: React.FC<StatProps> = ({
  isPurchase,
  price,
  title,
  toolTipTitle,
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
          <TitleBold>{getDisplayBalance(price)}</TitleBold>
          {/* <IncreasedText>{percenTageIncreaseText}</IncreasedText> */}
        </div>
        {/* <div className="dialog-class">
          <TimeComponent>{timeRemaining}</TimeComponent>
          <HtmlTooltip enterTouchDelay={0} title={<span>{timeRemainingToolTip}</span>}>
            <img src={InfoIcon} alt="Inof" width="16px" />
          </HtmlTooltip>
        </div> */}
      </InfoContent>
      {/* <StyledDesc>{buttonTopDesc}</StyledDesc>
      <Button disabled={buttonDisabled} text={buttonText} />
      <ConditionText>{buttonBottomDesc}</ConditionText> */}
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

export default PurchaseCard;
