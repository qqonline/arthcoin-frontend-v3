import React from 'react';
import styled from 'styled-components';

import checkmark from '../../../assets/svg/checkmark.svg';

interface IProps {
  subText: string;
}
const CollaterallizeCheckmark = (props: IProps) => {
  return (
    <div
      className={'custom-mahadao-container-content'}
      style={{
        height: '386px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <img src={checkmark} height={112} alt="checkmark" />
        <HeaderSubtitle>
          <TextForInfoTitle>{props.subText}</TextForInfoTitle>
          <LearnMore>Learn More</LearnMore>
        </HeaderSubtitle>
      </div>
    </div>
  );
};

const HeaderSubtitle = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.88);
  margin: 12px 0px;
`;

const TextForInfoTitle = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: #ffffff;
  opacity: 0.64;
`;

const LearnMore = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  opacity: 0.64;
  margin: 8px 0px;
  color: #f47f57;
`;

export default CollaterallizeCheckmark;
