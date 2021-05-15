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
interface ModeProps {
  id: number, name: string, count: number
}

interface FarmCard {
  id: number,
  pair: [string, string],
  liquidity: string;
  volume: string;
  onClickLink: string;
}
interface IProps {
  mode?: ModeProps;
}
const BankCardsV2 = (props: WithSnackbarProps & IProps) => {
  console.log(props.mode)
  const isMobile = useMediaQuery({ maxWidth: '600px' });
  const [openModal, setOpenModal] = useState<boolean>(true);
  let dummyJSON: FarmCard[] = [
    {
      id: 1,
      pair: ['MAHA', 'ARTH'],
      liquidity: '$2.6b',
      volume: '$43,474,449',
      onClickLink: 'https://google.com'
    },
    {
      id: 2,
      pair: ['MAHA', 'ARTHX'],
      liquidity: '$2.65m',
      volume: '$434,749',
      onClickLink: 'https://google.com'
    },
    {
      id: 3,
      pair: ['USDT', 'ARTH'],
      liquidity: '$2.6m',
      volume: '$43,474,449',
      onClickLink: 'https://google.com'
    },
  ]
  const [data, setData] = useState<FarmCard[]>(dummyJSON)

  // const [action, setAction] = useState<'Deposit' | 'Withdraw' | 'Claim' | ''>('');


  const MobileCardRender = () => {
    return (
      <>
        {data.map(cardData => (
          <MobileTradingCards
            {...cardData}
          />
        ))}
      </>
    );
  };

  const DesktopCardRender = () => {
    return (
      <div>
        {data.map(cardData => (
          <CustomRowCard
            {...cardData}
          />
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
}

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
