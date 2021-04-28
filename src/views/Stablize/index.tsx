import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import useCore from '../../hooks/useCore';
import StabilizePageHeader from '../../components/PageHeader/StabilizePageHeader';
import BuyBack from './components/BuyBack';
import Recollatateralize from './components/Recollatateralize';

const Stabelize = () => {
  const core = useCore();
  const [type, setType] = useState<'Buyback' | 'Recollateralize'>('Buyback');

  useEffect(() => window.scrollTo(0, 0), []);

  // const isLaunched = Date.now() >= config.boardroomLaunchesAt.getTime();
  if (!core) return <div />;

  return (
    <>
      <GradientDiv />
      <StabilizePageHeader
        title="Stabilize"
        subtitle="Earn MAHA and ARTH Share by Stabilize the collateral in the protocol"
        mobile
      />
      <Container size="lg" margin={'10px 0px'}>
        {type === "Buyback" &&
          <BuyBack
            onChange={() => setType('Recollateralize')}
          />
        }
        {type === "Recollateralize" &&
          <Recollatateralize
            onChange={() => setType('Buyback')}
          />
        }
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

export default Stabelize;
