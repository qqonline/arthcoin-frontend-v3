import React, { useState } from 'react';
import styled from 'styled-components';
import InfoIcon from '@material-ui/icons/Info';
import HtmlTooltip from '../../../components/HtmlTooltip';
import CallMadeIcon from '@material-ui/icons/CallMade';

type props = {
    stats?: boolean
    dataObj?: string[]
};

const UnderstandMore: React.FC<props> = (props: props) => {

    function ListItem(props: any) {
        return (
            <ListLi
            // style={{ listStyleType: 'circle', color: 'white', listStylePosition: 'inside', paddingBlock: 8}}
            >
                <ListSpan>
                    {props.value}
                </ListSpan>
                {/* <div style={{display: 'inline-block'}}>
                    <OneLine>
                        <div style={{ flex: 1 }}>
                            <TextWithIcon>
                                {props.value}
                            </TextWithIcon>
                        </div>
                    </OneLine>
                </div> */}

            </ListLi>
        )
    }

    return (
        <CustomInfoCard className={"custom-mahadao-box"}>
            <CustomInfoCardHeader>
                Understand more about how genesis is working
            </CustomInfoCardHeader>
            <CustomInfoCardDetails>
                <ul>
                    {props?.dataObj?.map(obj => (
                        <ListItem key={obj}
                            value={obj} />
                        // <li>{obj}</li>
                    ))}
                </ul>
                <LearnMore>
                    <span>
                        Go to ARTH V 2.0 article to learn more
                    </span>
                    <CallMadeIcon style={{ fontSize: 15, marginLeft: 4 }} />
                </LearnMore>
            </CustomInfoCardDetails>
        </CustomInfoCard>
    )
}

export default UnderstandMore;

const CustomInfoCard = styled.div`
  
`
const ListUl = styled.li`
`

const ListLi = styled.li`
`

const ListSpan = styled.span`
// padding: 80px 0;
font-family: Inter;
font-style: normal;
font-weight: 300;
font-size: 16px;
line-height: 150%;
color: rgba(255, 255, 255, 0.88);
// text-align: left;
`;

const LearnMore = styled.div`
  display: flex;
  flex-direction: row;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: #F7653B;
  margin-top: 10px;
  cursor: pointer;
//   color: #f7653b;
//   opacity: 0.88;
  align-items: center;
  &:hover {
    color: #f7653b;
    opacity: 0.88;
  }
`;

const CustomInfoCardHeader = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;
  margin-bottom: 24px;
`
const CustomStatsInfoCardHeader = styled.p`
font-family: Inter;
font-style: normal;
font-weight: 300;
font-size: 16px;
line-height: 150%;
color: rgba(255, 255, 255, 0.88);`;

const CustomInfoCardDetails = styled.div`
  margin: 10px 0;
`

const OneLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  margin: 4px 0;
`

const TextWithIcon = styled.div`
font-family: Inter;
font-style: normal;
font-weight: 300;
font-size: 16px;
line-height: 150%;
color: rgba(255, 255, 255, 0.88);
vertical-align: center;

`
const BeforeChip = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
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
