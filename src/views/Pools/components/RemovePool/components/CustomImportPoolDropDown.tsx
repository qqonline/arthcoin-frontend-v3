import React from 'react';
import styled from 'styled-components';
import TokenSymbol from '../../../../../components/TokenSymbol';

export interface InputProps {
  dropDownValues: string[];
  ondropDownValueChange: (data: string) => void;
}

const CustomImportPoolDropDown: React.FC<InputProps> = (props) => {
  const {dropDownValues, ondropDownValueChange} = props;
  return (
    <CustomDropDownContainer>
      {dropDownValues.map((item) => {
        return(
          <CustomDropDownLi onClick={() => {ondropDownValueChange(item);}}>
            <div style={{flex: 1}}>
              <TokenSymbol symbol={item} size={25} />
              <CustomDropDownLiText>{item}</CustomDropDownLiText>
            </div>
            <SymbolInfo>
              {'20.00 '}{item}
            </SymbolInfo>
          </CustomDropDownLi>
        )
      })}
    </CustomDropDownContainer>
  );
}

export default CustomImportPoolDropDown;

const CustomDropDownContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 12;
  background: #1F1E1E;
  border-radius: 6px;
  width: 100%;
  max-height: 192px;
  overflow-y: scroll;
`

const CustomDropDownLi = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  padding: 0 12px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
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
  margin-left: 10px;
`

const SymbolInfo = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 140%;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;

`


