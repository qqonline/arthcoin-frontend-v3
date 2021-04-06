import React from 'react';
import styled from 'styled-components';
import TokenSymbol from '../TokenSymbol';

export interface InputProps {
  dropDownValues: string[];
  ondropDownValueChange: (data: string) => void;
}

const CustomDropDown: React.FC<InputProps> = (props) => {
  const {dropDownValues, ondropDownValueChange} = props;
  return (
    <CustomDropDownContainer>
      {dropDownValues.map((item) => {
        return(
          <CustomDropDownLi onClick={() => {
            ondropDownValueChange(item);
          }}>
            <TokenSymbol symbol={item} size={25} />
            <CustomDropDownLiText>{item}</CustomDropDownLiText>
          </CustomDropDownLi>
        )
      })}
    </CustomDropDownContainer>
  );
};

const CustomDropDownContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 0px;
  z-index: 12;
  background: #1F1E1E;
  border-radius: 6px;
  min-width: 125px;
  max-height: 192px;
  overflow-y: scroll;
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

export default CustomDropDown;
