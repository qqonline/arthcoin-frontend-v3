import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { InputBase } from '@material-ui/core';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import TokenSymbol from '../../../../components/TokenSymbol';

type props = {
  ILabelValue: string;
  IBalanceValue: string;
  ILabelInfoValue: string;
  DefaultValue: string;
  LogoSymbol: string;
  hasDropDown: boolean;
  SymbolText: string
};

const InputContainer: React.FC<props> = (props) => {
  const {ILabelValue, IBalanceValue, ILabelInfoValue, DefaultValue, LogoSymbol, hasDropDown, SymbolText} = props;
  return(
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
          style={{padding: '8px 12px', color: '#FFFFFF65', flex: 1}}
        />
        <IFieldRightContainer>
          <IFieldRightContainerLogo>
            <TokenSymbol symbol={LogoSymbol} size={25}/>
          </IFieldRightContainerLogo>
          <IFieldRightContainerText>
            {SymbolText}
          </IFieldRightContainerText>
          {hasDropDown && <IFieldRightContainerDropDown>
            <KeyboardArrowDown fontSize='default' />
          </IFieldRightContainerDropDown>}
        </IFieldRightContainer>
      </IFieldConatiner>
    </IConatiner>
  )
}

export default InputContainer

const IConatiner = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 12px;
  margin: 10px 0px;
`

const ILabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

const ILabelLeft = styled.div`
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
  margin: 0px;
  padding: 0px;
  margin-left: 4px;
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
  background: #151414;
  border-radius: 6px;
`

const IFieldRightContainer = styled.div`
  padding: 10px 12px;
  background: #1F1E1E;
  border-radius: 0px 6px 6px 0px;
  display: flex;
  align-items: center;
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
