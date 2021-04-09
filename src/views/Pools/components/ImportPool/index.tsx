import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import TokenSymbol from '../../../../components/TokenSymbol';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import plus from '../../../../assets/svg/plus.svg';
import CustomImportPoolDropDown from './components/CustomImportPoolDropDown';
import InfoIcon from '@material-ui/icons/Info';

type props = {

};

const ImportPool: React.FC<props> = (props) => {
  const { } = props;
  const [dropDownNo, setDropDownNo] = useState<number>(0);
  const [dropDownValues, setDropDownValues] = useState<string[]>(['MAHA', 'ARTH', 'USDT', 'USDC', 'ETH', 'WBTC']);
  const defaultDropdownValues = [];

  return (
    <div>
      <CustomCard>
        <CustomCardHeader>
          <EachElement> <ArrowBackIos fontSize="default" color={'inherit'} htmlColor={'#ffffff'}/> </EachElement>
          <EachElement> <CardTitle> Import Pool </CardTitle></EachElement>
        </CustomCardHeader>
        <CustomCardContainer>
          <CoinSelection onClick={() => {
            if (dropDownNo === 1){
              setDropDownNo(0)
            } else {
              setDropDownNo(1)
            }
          }}>
            <TokenConatiner>
              <TokenSymbol symbol={'MAHA'} size={25} />
              <TokenText>{'MAHA'}</TokenText>
            </TokenConatiner>
            <KeyboardArrowDown fontSize={'default'} htmlColor={'#fffff80'} />
            {dropDownNo === 1 && <CustomImportPoolDropDown
              dropDownValues={dropDownValues}
              ondropDownValueChange={() => {
              }}
            />}
          </CoinSelection>
          <PlusMinusArrow>
            <img src={plus} />
          </PlusMinusArrow>
          <CoinSelection onClick={() => {
            if (dropDownNo === 2){
              setDropDownNo(0)
            } else {
              setDropDownNo(2)
            }
          }}>
            <TokenConatiner>
              <TokenSymbol symbol={'MAHA'} size={25} />
              <TokenText>{'MAHA'}</TokenText>
            </TokenConatiner>
            <KeyboardArrowDown fontSize={'default'} htmlColor={'#fffff80'} />
            {dropDownNo === 2 && <CustomImportPoolDropDown
              dropDownValues={dropDownValues}
              ondropDownValueChange={() => {
              }}
            />}
          </CoinSelection>
          <div style={{marginTop: '24px'}}>
            <InfoMessage>
              Select a token to find your liquidity.
            </InfoMessage>
            <ActionMessage>
              Add liquidity
            </ActionMessage>
          </div>
        </CustomCardContainer>
      </CustomCard>
      <CustomInfoCard>
        <CustomInfoCardHeader>
          Your Position
        </CustomInfoCardHeader>
        <CustomInfoCardDetails>
          <OneLine>
            <div style={{ flex: 1 }}>
              <TextWithIcon> Your total pool tokens </TextWithIcon>
            </div>
            <OneLine>
              <BeforeChip>1000.00</BeforeChip>
              <TagChips>ARTH / ETH </TagChips>
            </OneLine>
          </OneLine>
          <OneLine>
            <div style={{ flex: 1 }}>
              <TextWithIcon> Pooled ARTH </TextWithIcon>
            </div>
            <OneLine>
              <BeforeChip>1500.00</BeforeChip>
              <TagChips>ARTH</TagChips>
            </OneLine>
          </OneLine>
          <OneLine>
            <div style={{ flex: 1 }}>
              <TextWithIcon>Pooled ETH</TextWithIcon>
            </div>
            <OneLine>
              <BeforeChip>1500.00</BeforeChip>
              <TagChips>ETH</TagChips>
            </OneLine>
          </OneLine>
          <OneLine>
            <div style={{ flex: 1 }}>
              <TextWithIcon>Your pool share</TextWithIcon>
            </div>
            <OneLine>
              <BeforeChip>1.08</BeforeChip>
              <TagChips>0.06%</TagChips>
            </OneLine>
          </OneLine>
        </CustomInfoCardDetails>
      </CustomInfoCard>
    </div>
  )
}

export default ImportPool

const CustomCard = styled.div`
  background: linear-gradient(180deg, #48423E 0%, #373030 100%);
  border-radius: 12px;
  margin-top: 12px;
`

const CustomCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: 24px 32px;
  align-items: center;
  align-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  @media (max-width: 600px) {
    padding: 12px 16px;
  }
`

const EachElement = styled.div`
  flex: 0.3333;
`
const CustomCardContainer = styled.div`
  padding: 32px 32px;
  @media (max-width: 600px) {
    padding: 16px 16px;
  }
`
const CardTitle = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: rgba(255, 255, 255);
  margin: 0px;
`

const CoinSelection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #1F1E1E;
  border-radius: 6px;
  position: relative;
  cursor: pointer;
`
const TokenConatiner = styled.div`
  flex: 1;
`
const TokenText = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.64);
  margin-left: 10px;
`
const PlusMinusArrow = styled.div`
  width: 100%;
  height: 40px;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  font-size: 20px;
`

const InfoMessage = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  margin-bottom: 4px;
  color: white;
`
const ActionMessage = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #F7653B;
  margin: 0px;
  cursor: pointer;
`

const CustomInfoCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(21px);
  border-radius: 12px;
  padding: 32px;
  margin-top: 20px;
  @media (max-width: 600px) {
    padding: 16px;
  }
`
const CustomInfoCardHeader = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255);
  margin: 0;
`

const CustomInfoCardDetails = styled.div`
  margin: 10px 0;
`

const OneLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  margin: 5px 0;
`

const TextWithIcon = styled.div`
  ont-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.64);

`
const BeforeChip = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.64);
  margin-right: 5px;
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
