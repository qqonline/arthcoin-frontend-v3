import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import useBasisCash from '../../hooks/useBasisCash';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import MintTabContent from './components/Mint'
import RedeemTabContent from './components/Redeem'
import { useParams } from "react-router-dom"

const Boardrooms = (props: WithSnackbarProps) => {
  // @ts-ignore
  const { paramType } = useParams()
  useEffect(() => window.scrollTo(0, 0), []);
  const basisCash = useBasisCash();
  const [type, setType] = useState<'mint' | 'redeem'>(paramType || 'mint')

  // const isLaunched = Date.now() >= config.boardroomLaunchesAt.getTime();
  if (!basisCash) return <div />;

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
