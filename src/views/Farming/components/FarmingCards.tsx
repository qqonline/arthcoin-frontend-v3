import React, { useMemo } from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { ModeProps } from '../index';
import FarmingCard from './FarmingCard';
import { stakingContracts } from '../../../config';


interface IProps {
  mode?: ModeProps;
}

const BankCardsV2 = (props: WithSnackbarProps & IProps) => {
  const isMobile = useMediaQuery({ maxWidth: '600px' });
  // const rawData: FarmCard[] = [
  //   {
  //     id: 1,
  //     type: 'ARTH Staking',
  //     pair: ['MAHA', 'ARTH'],
  //     walletUnit: 'ARTH-MAHA LP',
  //     walletValue: '12.2',
  //     apy: '40%',
  //     poolDur: '65 Days',
  //     deposited: false,
  //     poolEndDate: Date.now() + 550000000,
  //     lockedStake: '0 ARTH-MAHA LP',
  //     earned: '12 MAHA'
  //   },
  //   {
  //     id: 2,
  //     type: 'ARTHX Staking',
  //     pair: ['MAHA', 'ARTHX'],
  //     walletUnit: 'ARTHX-MAHA LP',
  //     walletValue: '1222.2',
  //     apy: '4%',
  //     poolDur: '6 Days',
  //     deposited: true,
  //     poolEndDate: Date.now() + 550000000,
  //     lockedStake: '0 ARTH-MAHA LP',
  //     earned: '12 MAHA'
  //   },
  //   {
  //     id: 3,
  //     type: 'ARTH Staking',
  //     pair: ['MAHA', 'ARTH'],
  //     walletUnit: 'ARTH-MAHA LP',
  //     walletValue: '12.2',
  //     apy: '40%',
  //     poolDur: '65 Days',
  //     deposited: false,
  //     poolEndDate: Date.now() + 550000000,
  //     lockedStake: '0 ARTH-MAHA LP',
  //     earned: '12 MAHA'
  //   },
  // ]

  const rawData = stakingContracts

  const data = useMemo(() => {
    if (props?.mode?.id === 'all') return rawData
    return rawData.filter(obj => obj.categories.includes(props?.mode?.id))
  }, [props, rawData])

  return (
    <DataContainer className={'custom-mahadao-box'}>
      {!isMobile && (
        <Grid container style={{ padding: '0px 32px ', marginBottom: '16px' }}>
          <Grid item lg={3}>
            <CustomTableHeading>Pair</CustomTableHeading>
          </Grid>
          <Grid item lg={3}>
            <CustomTableHeading>Wallet</CustomTableHeading>
          </Grid>
          <Grid item lg={2}>
            <CustomTableHeading>APY</CustomTableHeading>
          </Grid>
           <Grid item lg={2}>
            <CustomTableHeading>Reward</CustomTableHeading>
          </Grid>
          <Grid item lg={2}></Grid>
        </Grid>
      )}

      <div>
        {data.map(cardData => (
          <FarmingCard
            cardData={cardData}
            mode={props.mode}
          />
        ))}
      </div>
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
  opacity: 0.64;
  text-align: left;
`;


export default withSnackbar(BankCardsV2);
