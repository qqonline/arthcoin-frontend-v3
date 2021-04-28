import CloseIcon from '../../assets/img/CloseIcon.svg';
import bellIcon from '../../assets/svg/BellIcon.svg';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';

export interface SnackObject {
  snackHeader?: string;
  headerCount?: string | number;
  type: 'red' | 'green' | 'other';
  bgColor?: string;
  data1: string;
  data2?: string;
  onClose: () => void;
}

export const CustomSnack = (snackObject: SnackObject) => (
  <SnackDiv style={{ width: 350 }}>
    <SnackHeader>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
        <HeaderCount>{snackObject?.headerCount || '1'}</HeaderCount>
        <HeaderText>{snackObject?.snackHeader || 'Transaction'}</HeaderText>
      </div>
      <IconButton aria-label="close" onClick={() => snackObject.onClose()}>
        <img src={CloseIcon} width="24px" alt="" />
      </IconButton>
    </SnackHeader>
    <SnackContent style={{ background: snackObject.type === 'red' ? '#BA1E38' : snackObject.type === 'green' ? '#178A50' : snackObject?.bgColor || '#178A50' }}>
      <BellIcon>
        <img src={bellIcon} height={21} />
      </BellIcon>
      <SnackData>
        <DataSpan>{snackObject.data1}</DataSpan>
        {snackObject.data2 && <DataSpan style={{ marginTop: 4 }}>{snackObject?.data2}</DataSpan>}
      </SnackData>
    </SnackContent>
  </SnackDiv>
)

const SnackDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const SnackHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
  border-radius: 4px 4px 0px 0px;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(70px);
`;

const HeaderCount = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.08);
  // opacity: 0.12;
  align-items: center;
  height: 24px;
  width: 24px;
  border-radius: 12px;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #FFFFFF;
  text-align: center;
  justify-content: center;
`;

const HeaderText = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #FFFFFF;
  opacity: 0.88;
  margin: 0px 12px;
`;

const SnackContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 20px;
  border-radius: 0px 0px 4px 4px;
`;

const BellIcon = styled.div`
  display: flex;
  align-items: center;
`;

const SnackData = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: space-evenly;
  padding: 8px 16px;
`;

const DataSpan = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #FFFFFF;
  opacity: 0.88;
`;
