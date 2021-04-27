import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import useCore from '../../hooks/useCore';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import MintTabContent from './components/Mint'
import RedeemTabContent from './components/Redeem'

const Boardrooms = (props: WithSnackbarProps) => {
  useEffect(() => window.scrollTo(0, 0), []);
  const basisCash = useCore();
  const [type, setType] = useState<'Mint' | 'Redeem'>('Mint')

  // const isLaunched = Date.now() >= config.boardroomLaunchesAt.getTime();
  if (!basisCash) return <div />;

  return (
    <>
      <GradientDiv />
      <Container size="lg">
        {type === 'Mint' && <MintTabContent setType={(type: 'Mint' | 'Redeem') => setType(type)} />}
        {type === 'Redeem' && <RedeemTabContent setType={(type: 'Mint' | 'Redeem') => setType(type)} />}
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
const LeftTopCard = styled.div``;


const LeftTopCardHeader = styled.div`
  display: flex;
  flex-direction: row;
`;
const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 12px;
  width: 100px;
  height: 80px;
  z-index: 1;
  cursor: pointer;
`;

const TabText = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.88);
`;
const ActiveTab = styled.div`
  position: absolute;
  width: 100px;
  padding: 32px 12px;
  background: linear-gradient(180deg, rgba(244, 127, 87, 0) 0%, #fd565620);
  height: 80px;
  z-index: 0;
  border-bottom: 2px solid #fd5656;
`;

export default withSnackbar(Boardrooms);
