import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import useCore from '../../hooks/useCore';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import MintTabContent from './components/Mint';
import RedeemTabContent from './components/Redeem';

const Boardrooms = (props: WithSnackbarProps) => {
  useEffect(() => window.scrollTo(0, 0), []);
  const core = useCore();
  const [type, setType] = useState<'Mint' | 'Redeem'>('Redeem');

  // const isLaunched = Date.now() >= config.boardroomLaunchesAt.getTime();
  if (!core) return <div />;

  return (
    <>
      <GradientDiv />
      <Container size="lg">
        {type === 'Mint' && (
          <MintTabContent setType={(type: 'Mint' | 'Redeem') => setType(type)} />
        )}
        {type === 'Redeem' && (
          <RedeemTabContent setType={(type: 'Mint' | 'Redeem') => setType(type)} />
        )}
        {/* </LeftTopCard> */}
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

export default withSnackbar(Boardrooms);
