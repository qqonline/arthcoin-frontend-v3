import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import MintTabContent from './components/Mint'
import RedeemTabContent from './components/Redeem'
import { useParams } from "react-router-dom"

const Boardrooms = (props: WithSnackbarProps) => {
  const { paramType } = useParams()
  useEffect(() => window.scrollTo(0, 0), []);
  const [type, setType] = useState<'mint' | 'redeem'>(paramType || 'mint')

  return (
    <>
      <GradientDiv />
      <Container size="lg">
        {type === 'mint' && <MintTabContent setType={(type: 'mint' | 'redeem') => setType(type)} />}
        {type === 'redeem' && <RedeemTabContent setType={(type: 'mint' | 'redeem') => setType(type)} />}
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
