import React, { useState } from 'react';
import styled from 'styled-components';

type props = {

};

const CoinsPrice: React.FC<props> = (props) => {


  return (
    <CustomInfoCard className={"custom-mahadao-box"}>
      <CustomInfoCardDetails>
        <OneLine style={{marginTop: '0px'}}>
          <div>
            <TextWithIcon>ARTH Current Price</TextWithIcon>
            <TargetPriceTag>Target Price: $1.20</TargetPriceTag>
          </div>
          <div>
            <BeforeChip>0.2%</BeforeChip>
            <PercentChange>+0.15%</PercentChange>
          </div>
        </OneLine>
        <OneLine>
          <div>
            <TextWithIcon>ARTHX Price</TextWithIcon>
            {/*<TargetPriceTag>Target Price: $1.20</TargetPriceTag>*/}
          </div>
          <div>
            <BeforeChip>0.2%</BeforeChip>
            <PercentChange>+0.15%</PercentChange>
          </div>
        </OneLine>
        <OneLine>
          <div>
            <TextWithIcon>MAHA Price</TextWithIcon>
            {/*<TargetPriceTag>Target Price: $1.20</TargetPriceTag>*/}
          </div>
          <div>
            <BeforeChip>0.2%</BeforeChip>
            <PercentChange>+0.15%</PercentChange>
          </div>
        </OneLine>
      </CustomInfoCardDetails>
    </CustomInfoCard>
  )
}

export default CoinsPrice

const CustomInfoCard = styled.div`
  
`
const CustomInfoCardHeader = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: #FFFFFF;
  margin-bottom: 24px;
`

const CustomInfoCardDetails = styled.div`
  margin: 10px 0;
`

const OneLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 40px;
`

const TextWithIcon = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: rgba(255, 255, 255, 0.88);
  opacity: 0.64;
  vertical-align: center;

`
const BeforeChip = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  text-align: right;
  color: #FFFFFF;
`

const TagChips = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 2px 8px;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.64);
`

const ToolTipFont = styled.p`
  padding: 0px;
  margin: 0px;
`

const PercentChange = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  text-align: right;
  color: #178A50;
  margin: 0;
`

const TargetPriceTag = styled.p`
  background: #423B38;
  border-radius: 4px;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #FCB400;
  margin: 0;
  padding: 2px 4px;

`
