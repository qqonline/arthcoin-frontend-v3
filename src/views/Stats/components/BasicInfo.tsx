import React from 'react';
import styled from 'styled-components';
import InfoIcon from '@material-ui/icons/Info';
import HtmlTooltip from '../../../components/HtmlTooltip';
import arrowRightWhite from '../../../assets/svg/arrowRightWhite.svg';

type props = {};

const BasicInfo: React.FC<props> = (props) => {
  return (
    <CustomInfoCard className={'custom-mahadao-box'}>
      <CustomInfoCardDetails>
        <OneCardLeft>
          <OneLine>
            <div>
              <TextWithIcon>
                Available to mint
                <HtmlTooltip
                  title={
                    <React.Fragment>
                      <ToolTipFont>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text ever
                        since the 1500s, when an unknown printer took a galley of type and
                        scrambled
                      </ToolTipFont>
                    </React.Fragment>
                  }
                >
                  <InfoIcon
                    fontSize="default"
                    style={{ transform: 'scale(0.6)', marginBottom: '4px' }}
                  />
                </HtmlTooltip>
              </TextWithIcon>
              <BeforeChip>54.76M</BeforeChip>
            </div>
            <img src={arrowRightWhite} style={{ cursor: 'pointer' }} />
          </OneLine>
        </OneCardLeft>
        <OneCardRight>
          <OneLine>
            <div>
              <TextWithIcon>
                Pool Balance
                <HtmlTooltip
                  title={
                    <React.Fragment>
                      <ToolTipFont>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text ever
                        since the 1500s, when an unknown printer took a galley of type and
                        scrambled
                      </ToolTipFont>
                    </React.Fragment>
                  }
                >
                  <InfoIcon
                    fontSize="default"
                    style={{ transform: 'scale(0.6)', marginBottom: '4px' }}
                  />
                </HtmlTooltip>
              </TextWithIcon>
              <BeforeChip>157.89M</BeforeChip>
            </div>
            <img src={arrowRightWhite} style={{ cursor: 'pointer' }} />
          </OneLine>
        </OneCardRight>
      </CustomInfoCardDetails>
    </CustomInfoCard>
  );
};

export default BasicInfo;

const CustomInfoCard = styled.div`
  padding: 0 !important;
  margin-top: 16px;
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
  display: flex;
  flex-direction: row;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const OneLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

const PercentChange = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  text-align: right;
  color: #178a50;
  margin: 0;
`;

const TargetPriceTag = styled.p`
  background: #423b38;
  border-radius: 4px;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fcb400;
  margin: 0;
  padding: 2px 4px;
`;

const OneCardRight = styled.div`
  flex: 0.5;
  padding: 32px 32px;
  @media (max-width: 600px) {
    padding: 16px 16px;
  }
`;

const OneCardLeft = styled.div`
  flex: 0.5;
  border-right: 0.5px solid #ffffff50;
  border-bottom: 0 solid #ffffff50;
  margin: 32px 0px;
  padding: 0 32px;
  @media (max-width: 600px) {
    border-right: 0 solid #ffffff50;
    border-bottom: 0.5px solid #ffffff50;
    padding: 16px 0;
    margin: 0 16px;
  }
`;
