import React from 'react';
import Grid from '@material-ui/core/Grid';
import StakingCard from './StakingCard';
import useBanks from '../../hooks/useBanks';
import styled from 'styled-components';
import { TableContainer } from '@material-ui/core';
import CustomRowCard from './DesktopComponents/CustomRowCard';


const BankCardsV2: React.FC = () => {
  const [banks] = useBanks();
  const activeBanks = banks.filter((bank) => !bank.finished);
  const inactiveBanks = banks.filter((bank) => bank.finished);

  return (
    <DataContainer>
      <Grid container style={{ padding: '0px 32px ', marginBottom: '16px' }}>
        <Grid item lg={3}>
          <CustomTableHeading>
            Pair
          </CustomTableHeading>
        </Grid>
        <Grid item lg={3}>
          <CustomTableHeading>
            Wallet
          </CustomTableHeading>
        </Grid>
        <Grid item lg={1}>
          <CustomTableHeading>
            Apy
          </CustomTableHeading>
        </Grid>
        <Grid item lg={3}>
          <CustomTableHeading>
            Pool duration
          </CustomTableHeading>
        </Grid>
        <Grid item lg={2}>

        </Grid>
      </Grid>
      <CustomRowCard
        pair={['ARTH', 'MAHA']}
        walletUnit={'ARTH-MAHA LP'}
        walletValue={'12.2'}
        apy={'40%'}
        poolDur={'65 Days'}
        poolEndDate={Date.now() + 550000000}
        onClick={() => { }}
        deposited
      />
      <CustomRowCard
        pair={['ARTH', 'MAHA']}
        walletUnit={'ARTH-MAHA LP'}
        walletValue={'12.2'}
        apy={'40%'}
        poolDur={'65 Days'}
        poolEndDate={Date.now() + 550000000}
        onClick={() => { }}
      />
    </DataContainer>

  );
};


const DataContainer = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(70px);
  border-radius: 12px;
  padding: 24px 32px;
`

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
`

export default BankCardsV2;
