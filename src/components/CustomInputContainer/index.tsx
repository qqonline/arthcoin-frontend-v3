import React, { useState } from 'react';
import styled from 'styled-components';
import { InputBase } from '@material-ui/core';
import TokenSymbol from '../TokenSymbol';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
// @ts-ignore
import Select, { components, provided, state } from "react-select";
import CustomDropDown from '../CustomDropDown';

type props = {
  ILabelValue: string;
  IBalanceValue: string;
  ILabelInfoValue?: string;
  DefaultValue: string;
  LogoSymbol: string;
  hasDropDown: boolean;
  SymbolText: string;
  setText?: (val: string) => void;
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  tagText?: string;
  dropDownValues?: string[];
  ondropDownValueChange?: (data: string) => void;
  multiIcons?: boolean;
  symbol1?: string;
  symbol2?: string;
  dontShowBackgroundContainer?: boolean;
};

const CustomInputContainer: React.FC<props> = (props) => {
  const { ILabelValue, IBalanceValue, ILabelInfoValue, DefaultValue, LogoSymbol, hasDropDown, SymbolText, tagText, dropDownValues, ondropDownValueChange, multiIcons = false, symbol1, symbol2 } = props;
  const [modalOpen, setModalOpen] = useState<boolean>(false);


  return (
    <IConatiner style={props.dontShowBackgroundContainer? {padding: '0px', backgroundColor: 'transparent'}: {}} >
      <ILabelContainer>
        <ILabelLeft>
          <ILabel>{ILabelValue}</ILabel>
          {ILabelInfoValue !== '' && <ILabelInfo>{ILabelInfoValue}</ILabelInfo>}
        </ILabelLeft>
        <ILabelRight>
          <ILabelBalance>{IBalanceValue}</ILabelBalance>
        </ILabelRight>
      </ILabelContainer>
      <IFieldConatiner>
        <InputBase
          inputMode={props?.inputMode}
          placeholder={DefaultValue}
          inputProps={{ 'aria-label': 'naked' }}
          style={{ padding: '8px 12px', color: '#FFFFFF', flex: 1 }}
          onChange={(event) => {
            if (props?.setText && event.target.value.trim() !== '') {
              props.setText(event.target.value)
            }
          }}
        />
        {tagText !== '' && <MaxTagConatiner>
          {tagText}
        </MaxTagConatiner>}
        <IFieldRightContainer onClick={() => {
          if (hasDropDown) setModalOpen(!modalOpen)
        }}>
          {/*<Select
            width='500px'
            style={{

              background: 'red'
            }}
            options={options}
            defaultValue={options[0]}
            components={{ Option: IconOption, Menu }}
            menuColor='red'

          />*/}
          <IFieldRightContainerLogo>
            {
              multiIcons && symbol1 && symbol2 ?
                <LLabel>
                  <TokenSymbol symbol={symbol1} size={25} style={{ zIndex: 2 }} />
                  <TokenSymbol symbol={symbol2} size={25} style={{ zIndex: 1, marginLeft: -5 }} />
                  {/* <LPairLabel>{liquidityPair.pairName}</LPairLabel> */}
                </LLabel>
                :
                <TokenSymbol symbol={LogoSymbol} size={25} />

            }
          </IFieldRightContainerLogo>
          <IFieldRightContainerText>
            {SymbolText}
          </IFieldRightContainerText>
          {hasDropDown && <IFieldRightContainerDropDown>
            <KeyboardArrowDown fontSize='default' />
          </IFieldRightContainerDropDown>}

          {modalOpen && hasDropDown && ondropDownValueChange &&
            <CustomDropDown
              dropDownValues={dropDownValues}
              ondropDownValueChange={ondropDownValueChange}
            />}
        </IFieldRightContainer>
      </IFieldConatiner>
    </IConatiner>
  )
}

export default CustomInputContainer

const IConatiner = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 12px;
  margin: 10px 0px;
`

const ILabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ILabelLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`

const ILabelRight = styled.div`

`

const ILabel = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.64);
`

const ILabelInfo = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #FD565660;
  margin-left: 5px;
`

const ILabelBalance = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: right;
  color: rgba(255, 255, 255, 0.64);
`
const LLabel = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;

const LPairLabel = styled.div`
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 24px;
color: #FFFFFF;
opacity: 0.88;
margin: 0px 0px 0px 16px;
`;


const IFieldConatiner = styled.div`
  display: flex;
  flex-direction: row;
  background: #151414;
  border-radius: 6px;
  max-height: 44px;
`

const IFieldRightContainer = styled.div`
  padding: 10px 12px;
  background: #1F1E1E;
  border-radius: 0px 6px 6px 0px;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`

const MaxTagConatiner = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #F7653B;
  padding: 10px 12px;
  background: transparent;
  border-radius: 0px 6px 6px 0px;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;

`

const IFieldRightContainerLogo = styled.span`

`

const IFieldRightContainerText = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.64);
  margin-left: 5px;
`

const IFieldRightContainerDropDown = styled.span`
  margin-left: 5px;
`
