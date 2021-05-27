import React, { useEffect, /*useState*/ } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
// import { useParams } from 'react-router-dom';

import Container from '../../components/Container';
import useCore from '../../hooks/useCore';
import StabilizePageHeader from '../../components/PageHeader/StabilizePageHeader';
import BuyBack from './components/BuyBack';
import Recollatateralize from './components/Recollatateralize';
import useArthxRedeemRewards from '../../hooks/state/controller/useArthxRedeemRewards';
import { WalletAutoConnect } from '../../components/WalletAutoConnect';

export default () => {
  const core = useCore();
  
  // const { stabilizeType } = useParams<{ stabilizeType: 'buyback' | 'recollateralize' }>();
  // const [type, setType] = useState<'buyback' | 'recollateralize'>(
  //   stabilizeType || 'recollateralize',
  // );
  WalletAutoConnect();

  const isMobile = useMediaQuery({ query: '(max-device-width: 600px)' });
  const recollateralizableValue = useArthxRedeemRewards();

  useEffect(() => window.scrollTo(0, 0), []);

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
        {/* {type === 'buyback' && <BuyBack onChange={() => setType('recollateralize')} />}
        {type === 'recollateralize' && ( */}
        {recollateralizableValue.eq(0) && <BuyBack />}
        {recollateralizableValue.gt(0) && <Recollatateralize />}
        {/* )} */}
      </Container>
    </>
  );
};

const GradientDiv = styled.div`
  background: linear-gradient(180deg, #2a2827 0%, rgba(42, 40, 39, 0) 100%);
  height: 270px;
  position: absolute;
  // border: 1px solid;
  width: 100%;
  z-index: -5;
`;
