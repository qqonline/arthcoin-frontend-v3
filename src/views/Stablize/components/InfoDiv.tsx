import React from 'react';
import styled from 'styled-components';

import InfoIcon from '@material-ui/icons/Info';
import CustomToolTip from '../../../components/CustomTooltip';

interface IProps {
  labelData: string;
  labelToolTipData?: string;
  rightLabelValue?: string;
  rightLabelUnit?: string;
}

const TransparentInfoDiv = (props: IProps) => {
  return (
    <TransInfoDiv>
      <InfoSpan>
        {props.labelData}
        {props.labelToolTipData && (
          <CustomToolTip toolTipText={props.labelToolTipData} />
        )}
      </InfoSpan>
      <LabelInfoData>
        {props.rightLabelValue && <LabelInfoText>{props.rightLabelValue}</LabelInfoText>}
        {props.rightLabelUnit && (
          <LabelInfoDataChip>
            <LabelInfoDataChipText>{props.rightLabelUnit}</LabelInfoDataChipText>
          </LabelInfoDataChip>
        )}
      </LabelInfoData>
    </TransInfoDiv>
  );
};

const InfoSpan = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.64);
  // margin: 10px 30px;
  text-align: center;
`;

const LabelInfoText = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: right;
  color: rgba(255, 255, 255, 0.88);
`;

const LabelInfoData = styled.div`
  // background: yellow;
  padding: 3px 4px;
  // height: fit-content;
  width: fit-content;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  color: rgba(255, 255, 255, 0.88);
`;

const LabelInfoDataChip = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 3px 4px;
  height: fit-content;
  // justify-content: space-between;
  display: flex;
  align-items: center;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  margin: 0px 2px;
  color: rgba(255, 255, 255, 0.64);
`;

const LabelInfoDataChipText = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.64);
`;

const TransInfoDiv = styled.div`
  // background: rgba(255, 255, 255, 0.08);
  // border-radius: 6px;
  // padding: 6px 4px;
  height: fit-content;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;
export default TransparentInfoDiv;
