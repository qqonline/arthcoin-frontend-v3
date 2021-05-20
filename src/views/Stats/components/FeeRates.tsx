import React from 'react';
import styled from 'styled-components';

import CustomToolTip from '../../../components/CustomTooltip';
import usePoolMintingFees from '../../../hooks/state/pools/usePoolMintingFees';
import { getDisplayBalance } from '../../../utils/formatBalance';

type props = {};

const BondingDiscount: React.FC<props> = () => {
  const mintingFees = usePoolMintingFees('');

  return (
    <CustomInfoCard className={'custom-mahadao-box'}>
      <CustomInfoCardHeader>Fee rates</CustomInfoCardHeader>
      <CustomInfoCardDetails>
        <OneLine>
          <div style={{ flex: 1 }}>
            <TextWithIcon>
              Trading fee
              <CustomToolTip toolTipText={'loreum ipsum'} />
            </TextWithIcon>
          </div>
          <OneLine>
            <BeforeChip>{getDisplayBalance(mintingFees, 4)}%</BeforeChip>
            {/*<TagChips>ARTH</TagChips>*/}
          </OneLine>
        </OneLine>
        <OneLine>
          <div style={{ flex: 1 }}>
            <TextWithIcon>
              Stability fee
              <CustomToolTip toolTipText={'loreum ipsum'} />
            </TextWithIcon>
          </div>
          <OneLine>
            <BeforeChip>1%</BeforeChip>
            {/*<TagChips>ETH</TagChips>*/}
          </OneLine>
        </OneLine>

        <OneLine>
          <div style={{ flex: 1 }}>
            <TextWithIcon>
              Pool Minting fee
              <CustomToolTip />
            </TextWithIcon>
          </div>
          <OneLine>
            <BeforeChip>{getDisplayBalance(mintingFees, 3)}%</BeforeChip>
            {/*<TagChips>ETH</TagChips>*/}
          </OneLine>
        </OneLine>
        {/*<OneLine>
          <div style={{ flex: 1 }}>
            <TextWithIcon>Your pool share</TextWithIcon>
          </div>
          <OneLine>
            <BeforeChip>1.08</BeforeChip>
            <TagChips>0.06%</TagChips>
          </OneLine>
        </OneLine>*/}
      </CustomInfoCardDetails>
    </CustomInfoCard>
  );
};

export default BondingDiscount;

const CustomInfoCard = styled.div`
  min-height: 220px;
  @media (max-width: 600px) {
    min-height: auto;
    margin-top: 8px;
    margin-bottom: 8px;
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
