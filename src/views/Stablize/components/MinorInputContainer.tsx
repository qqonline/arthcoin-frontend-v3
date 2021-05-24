import React, { useState } from 'react';
import styled from 'styled-components';
import { InputBase } from '@material-ui/core';

import TokenSymbol from '../../../components/TokenSymbol';
import CustomDropDown from '../../../components/CustomDropDown';
import DownArrow from '../../../assets/img/ArrowDown.svg';

type props = {
  ILabelValue: string;
  IBalanceValue: string;
  ILabelInfoValue: string;
  DefaultValue: string;
  LogoSymbol: string;
  hasDropDown: boolean;
  SymbolText: string;
  dropDownValues?: string[];
  ondropDownValueChange?: (data: string) => void;
};

const MinorInputContainer: React.FC<props> = (props) => {
  const {
    ILabelValue,
    IBalanceValue,
    ILabelInfoValue,
    DefaultValue,
    LogoSymbol,
    hasDropDown,
    SymbolText,
    dropDownValues,
    ondropDownValueChange,
  } = props;
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
          placeholder={DefaultValue || '0'}
          defaultValue={DefaultValue ? DefaultValue : 0}
          value={DefaultValue}
          inputProps={{ 'aria-label': 'naked' }}
          style={{ padding: '8px 12px', color: '#FFFFFF', flex: 1 }}
          disabled={true}
        />
        <IFieldRightContainer
          onClick={() => {
            if (hasDropDown) setModalOpen(!modalOpen);
          }}
        >
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
            <TokenSymbol symbol={LogoSymbol} size={25} />
          </IFieldRightContainerLogo>
          <IFieldRightContainerText>{SymbolText}</IFieldRightContainerText>
          {hasDropDown && (
            <IFieldRightContainerDropDown>
              {/*<KeyboardArrowDown fontSize='default' />*/}
              <img src={DownArrow} alt="down" height={20} style={{ marginLeft: 10 }} />
            </IFieldRightContainerDropDown>
          )}

          {modalOpen && hasDropDown && ondropDownValueChange && (
            <BackgroundAbsolute
              onClick={() => {
                setModalOpen(!modalOpen);
              }}
            />
          )}

          {modalOpen && hasDropDown && ondropDownValueChange && (
            <CustomDropDown
              dropDownValues={dropDownValues}
              ondropDownValueChange={ondropDownValueChange}
            />
          )}
        </IFieldRightContainer>
      </IFieldConatiner>
    </IConatiner>
  );
};

export default MinorInputContainer;

const BackgroundAbsolute = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: transparent;
  width: 100vw;
  height: 100vh;
  z-index: 11;
`;

const IConatiner = styled.div`
  border-radius: 8px;
`;

const ILabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ILabelLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const ILabelRight = styled.div``;

const ILabel = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.64);
  margin-bottom: 12px;
`;

const ILabelInfo = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #fd565660;
  margin-left: 5px;
  margin-bottom: 12px;
`;

const ILabelBalance = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: right;
  color: rgba(255, 255, 255, 0.64);
  margin-bottom: 12px;
`;

const IFieldConatiner = styled.div`
  display: flex;
  flex-direction: row;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 6px;
`;

const IFieldRightContainer = styled.div`
  padding: 10px 12px;
  background: transparent;
  border-radius: 0px 6px 6px 0px;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const IFieldRightContainerLogo = styled.span``;

const IFieldRightContainerText = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.64);
  margin-left: 9px;
`;

const IFieldRightContainerDropDown = styled.span`
  margin-left: 5px;
`;
