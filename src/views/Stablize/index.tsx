import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import BuyBack from './components/BuyBack';
import Container from '../../components/Container';
import Recollatateralize from './components/Recollatateralize';
import StabilizePageHeader from '../../components/PageHeader/StabilizePageHeader';

import useCore from '../../hooks/useCore';
import { WalletAutoConnect } from '../../components/WalletAutoConnect';
import useArthxRedeemRewards from '../../hooks/state/controller/useArthxRedeemRewards';

export default () => {
  const isMobile = useMediaQuery({ query: '(max-device-width: 600px)' });

  useEffect(() => window.scrollTo(0, 0), []);

  const core = useCore();
  const {isLoading: isRecollateralizableValueLoading, value: recollateralizableValue} = useArthxRedeemRewards();
  
  WalletAutoConnect();

  if (!core) return <div />;

  return (
    <>
      <GradientDiv />
      <StabilizePageHeader
        title="Stabilize"
        subtitle="Earn ARTHX by helping stabilize the protocol with collateral"
        mobile={isMobile ? true : false}
      />
      <Container size="lg">
        {recollateralizableValue.eq(0) && <BuyBack />}
        {recollateralizableValue.gt(0) && <Recollatateralize />}
      </Container>
    </>
  );
};

const GradientDiv = styled.div`
  background: linear-gradient(180deg, #2a2827 0%, rgba(42, 40, 39, 0) 100%);
  height: 270px;
  position: absolute;
  width: 100%;
  z-index: -5;
`;
