import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import useCore from '../../hooks/useCore';
import StabilizePageHeader from '../../components/PageHeader/StabilizePageHeader';
import BuyBack from './components/BuyBack';
import Recollatateralize from './components/Recollatateralize';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';

export default () => {
  const core = useCore();
  const { stabilizeType } = useParams<{ stabilizeType: string }>()
  const [type, setType] = useState(stabilizeType || 'buyback');

  useEffect(() => window.scrollTo(0, 0), []);

  const isMobile = useMediaQuery({ query: '(max-device-width: 600px)' })

  // const isLaunched = Date.now() >= config.boardroomLaunchesAt.getTime();
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
        {type === "buyback" &&
          <BuyBack
            onChange={() => setType('recollateralize')}
          />
        }
        {type === "recollateralize" &&
          <Recollatateralize
            onChange={() => setType('buyback')}
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
