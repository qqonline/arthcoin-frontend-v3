import React from 'react';
import styled from 'styled-components';
import PriceLine from './PriceLine';
import TWAPInformation from './TWAPInformation';


const PriceInformation: React.FC = () => {
  return (
    <CardTyep2>
      <PriceLine />
      <div className="border-bottom width-100" />
      <TWAPInformation />
    </CardTyep2>
  );
};

const CardTyep2 = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(70px);
  border-radius: 12px;
`;


export default PriceInformation;
