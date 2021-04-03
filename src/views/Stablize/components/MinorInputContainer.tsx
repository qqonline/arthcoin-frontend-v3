import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { InputBase } from '@material-ui/core';
import TokenSymbol from '../../../components/TokenSymbol';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
// @ts-ignore
import Select, { components, provided, state } from "react-select";

const options = [
  {
    value: "MAHA",
    label: "MAHA",
  },
  {
    value: "USDT",
    label: "USDT",
  }, {
    value: "USDC",
    label: "USDC",
  }, {
    value: "ETH",
    label: "ETH",
  }, {
    value: "WBTC",
    label: "WBTC",
  }
];


const { Option } = components;
const IconOption = (props: any) => (
  <Option {...props}>
    <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '5em' }}>
      <img
        src={require('../../../assets/svg/' + props.data?.label?.toLowerCase() + '.svg')}
        style={{ width: 30 }}
        alt={props.data.label}
      />
      <div>
        {props.data.label}
      </div>

    </div>
  </Option>
);

const Menu = (props: any) => (
  <components.Menu style={{background: 'green'}} {...props}>
    {props.children}
  </components.Menu>
);

type props = {
  ILabelValue: string;
  IBalanceValue: string;
  ILabelInfoValue: string;
  DefaultValue: string;
  LogoSymbol: string;
  hasDropDown: boolean;
  SymbolText: string
};

const MinorInputContainer: React.FC<props> = (props) => {
  const { ILabelValue, IBalanceValue, ILabelInfoValue, DefaultValue, LogoSymbol, hasDropDown, SymbolText } = props;
  const [modalOpen, setModalOpen] = useState<boolean>(false);


  return (
    <IConatiner>
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
          defaultValue={DefaultValue}
          inputProps={{ 'aria-label': 'naked' }}
          style={{ padding: '8px 12px', color: '#FFFFFF', flex: 1 }}
          disabled={true}
        />
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
            <TokenSymbol symbol={LogoSymbol} size={25}/>
          </IFieldRightContainerLogo>
          <IFieldRightContainerText>
            {SymbolText}
          </IFieldRightContainerText>
          {hasDropDown && <IFieldRightContainerDropDown>
            <KeyboardArrowDown fontSize='default' />
          </IFieldRightContainerDropDown>}

          {modalOpen && hasDropDown && <CustomDropDown>
            <CustomDropDownLi>
              <TokenSymbol symbol={'MAHA'} size={25} />
              <CustomDropDownLiText>MAHA</CustomDropDownLiText>
            </CustomDropDownLi>
            <CustomDropDownLi>
              <TokenSymbol symbol={'USDC'} size={25} />
              <CustomDropDownLiText>USDC</CustomDropDownLiText>
            </CustomDropDownLi>
            <CustomDropDownLi>
              <TokenSymbol symbol={'ETH'} size={25} />
              <CustomDropDownLiText>ETH</CustomDropDownLiText>
            </CustomDropDownLi>
            <CustomDropDownLi>
              <TokenSymbol symbol={'WBTC'} size={25} />
              <CustomDropDownLiText>WBTC</CustomDropDownLiText>
            </CustomDropDownLi>
          </CustomDropDown>}
        </IFieldRightContainer>
      </IFieldConatiner>
    </IConatiner>
  )
}

export default MinorInputContainer

const IConatiner = styled.div`
  border-radius: 8px;
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

const IFieldConatiner = styled.div`
  display: flex;
  flex-direction: row;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 6px;
`

const IFieldRightContainer = styled.div`
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
  margin-left: 9px;
`

const IFieldRightContainerDropDown = styled.span`
  margin-left: 5px;
`

const CustomDropDown = styled.div`
  position: absolute;
  top: 50px;
  right: 0px;
  z-index: 12;
  background: #151414;
  border-radius: 6px;
  min-width: 125px;
`

const CustomDropDownLi = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  padding: 0px 12px;
  align-items: center;
  &:hover {
    background: rgba(62, 62, 62, 0.31);
  }
`

const CustomDropDownLiText = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.64);
  margin-left: 5px;
  
`
