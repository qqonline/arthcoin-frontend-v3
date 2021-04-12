import React from 'react';
import Grid from '@material-ui/core/Grid';
import StakingCard from './StakingCard';
import useBanks from '../../hooks/useBanks';
import styled from 'styled-components';


const BankCardsV2: React.FC = () => {
  const [banks] = useBanks();
  const activeBanks = banks.filter((bank) => !bank.finished);
  const inactiveBanks = banks.filter((bank) => bank.finished);

  return (
    <StyledCards>

      <Grid container spacing={3} justify="center" alignItems="stretch">
        <Grid container item xs={12} md={6} lg={6} xl={6}>
          <StakingCard bank={activeBanks[0]} />
        </Grid>
        <Grid container item xs={12} md={6} lg={6} xl={6}>
          <StakingCard bank={activeBanks[0]} />
        </Grid>
        <Grid container item xs={12} md={6} lg={6} xl={6}>
          <StakingCard bank={activeBanks[0]} />
        </Grid>
      </Grid>

      {inactiveBanks.length > 0 && (<StyledInactiveBankTitle>Closed Pools</StyledInactiveBankTitle>)}
      <Grid container justify="center" alignItems="stretch">

        {inactiveBanks.map((bank, j) => (
          <Grid key={j} container item xs={12} md={6} lg={4} xl={4}>
            <StakingCard bank={bank} />
            {j < inactiveBanks.length - 1 && <StyledSpacer />}
          </Grid>
        ))}
      </Grid>
    </StyledCards>
  );
};


const StyledCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledInactiveBankTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[400]};
  margin-top: ${(props) => props.theme.spacing[5]}px;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const VFATAnn = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: #fff9;
  margin-bottom: 30px;
`;


export default BankCardsV2;
