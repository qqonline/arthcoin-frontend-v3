import React from 'react';
import styled from 'styled-components';
import InfoIcon from '@material-ui/icons/Info';

import HtmlTooltip from '../../../components/HtmlTooltip';
import CustomToolTip from '../../../components/CustomTooltip';

const BondingDiscount: React.FC = () => {
  return (
    <CustomInfoCard className={'custom-mahadao-box'}>
      <CustomInfoCardHeader>Reward rates</CustomInfoCardHeader>
      <CustomInfoCardDetails>
        <OneLine>
          <div style={{ flex: 1 }}>
            <TextWithIcon>
              Bonus Rate
              <CustomToolTip toolTipText={'loreum ipsum'} />
            </TextWithIcon>
          </div>
          <OneLine>
            <BeforeChip>0.2%</BeforeChip>
          </OneLine>
        </OneLine>
        <OneLine>
          <div style={{ flex: 1 }}>
            <TextWithIcon>
              Highest Staking APY
              <CustomToolTip toolTipText={'loreum ipsum'} />
            </TextWithIcon>
          </div>
          <OneLine>
            <BeforeChip>150%</BeforeChip>
          </OneLine>
        </OneLine>
      </CustomInfoCardDetails>
    </CustomInfoCard>
  );
};

const CustomInfoCard = styled.div`
  min-height: 220px;
  @media (max-width: 600px) {
    min-height: auto;
    margin-top: 8px;
  }
`;

const CustomInfoCardHeader = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: #ffffff;
  margin-bottom: 24px;
`;

const CustomInfoCardDetails = styled.div`
  margin: 10px 0;
`;

const OneLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  margin: 4px 0;
`;

const TextWithIcon = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: rgba(255, 255, 255, 0.88);
  opacity: 0.64;
  vertical-align: center;
`;

const BeforeChip = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
`;

const TagChips = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 2px 8px;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.64);
`;

const ToolTipFont = styled.p`
  padding: 0px;
  margin: 0px;
`;

export default BondingDiscount;
