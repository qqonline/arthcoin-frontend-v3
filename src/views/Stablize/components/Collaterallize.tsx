import React from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import TokenSymbol from '../../../components/TokenSymbol';
import { useWallet } from 'use-wallet';
import useBasisCash from '../../../hooks/useBasisCash';
import InfoIcon from '../../../assets/img/InfoIcon.svg';
import { Boardrooms } from '../../../basis-cash/config';
import HtmlTooltip from '../../../components/HtmlTooltip';
import checkmark from '../../../assets/svg/checkmark.svg'

interface IProps{
    subText: string;
}
const CollaterallizeCheckmark = (props: IProps) => {
    return (
        <div style={{ height: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img
                src={checkmark}
                height={112}
            // style={{ alignSelf: 'center', justifyContent: 'center', display: 'flex' }}
            />
            <HeaderSubtitle
                style={{ alignSelf: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', margin: '10px 0px' }}
            >
                <TextForInfoTitle >{props.subText}</TextForInfoTitle>
                <LearnMore>Learn More</LearnMore>
            </HeaderSubtitle>
        </div>
    )
}

const HeaderSubtitle = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.88);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
`


const TextForInfoTitle = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: #FFFFFF;
  opacity: 0.64;
`

const LearnMore = styled.div`
font-family: Inter;
font-style: normal;
font-weight: 300;
font-size: 16px;
line-height: 150%;
opacity: 0.64;
margin: 8px 0px;
color: #F47F57;
`

export default CollaterallizeCheckmark;