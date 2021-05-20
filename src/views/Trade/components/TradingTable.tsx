import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import CustomRowCard from './CustomRowCard';
import CustomModal from '../../../components/CustomModal';
import CustomInputContainer from '../../../components/CustomInputContainer';
import Button from '../../../components/Button';
import { useMediaQuery } from 'react-responsive';
import MobileTradingCards from './MobileTradingCards';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { CustomSnack } from '../../../components/SnackBar';
import { tradingPairs } from '../../../config';
interface ModeProps {
  id: number;
  name: string;
  count: number;
}

interface FarmCard {
  id: number;
  pair: [string, string];
  liquidity: string;
  volume: string;
}
interface IProps {
  mode?: ModeProps;
}
const BankCardsV2 = (props: WithSnackbarProps & IProps) => {
  const isMobile = useMediaQuery({ maxWidth: '600px' });

  const MobileCardRender = () => {
    return (
      <>
        {tradingPairs.map((cardData) => (
          <MobileTradingCards info={cardData} />
        ))}
      </>
    );
  };

  const DesktopCardRender = () => {
    return (
      <div>
        {tradingPairs.map((cardData) => (
          <CustomRowCard info={cardData} />
        ))}
      </div>
    );
  };

  return (
    <DataContainer className={'custom-mahadao-box'}>
      {!isMobile && (
        <Grid container style={{ padding: '0px 32px ', marginBottom: '16px' }}>
          <Grid item lg={3}>
            <CustomTableHeading>Pair</CustomTableHeading>
          </Grid>
          <Grid item lg={3}>
            <CustomTableHeading>Liquidity</CustomTableHeading>
          </Grid>
          <Grid item lg={3}>
            <CustomTableHeading>Volume (24 hours)</CustomTableHeading>
          </Grid>
          <Grid item lg={3}></Grid>
        </Grid>
      )}
      {!isMobile ? DesktopCardRender() : MobileCardRender()}
    </DataContainer>
  );
};

const DataContainer = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(70px);
  border-radius: 12px;
  padding: 24px 32px;
  @media (max-width: 600px) {
    background: transparent;
    backdrop-filter: none;
    border-radius: 12px;
    padding: 0;
  }
`;

const CustomTableHeading = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.32);
  // opacity: 0.64;
  text-align: left;
`;

const OneLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  margin: 5px 0;
`;

const BeforeChip = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.64);
  margin-right: 5px;
`;

const TagChips = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 2px 8px;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.64);
`;

export default withSnackbar(BankCardsV2);
