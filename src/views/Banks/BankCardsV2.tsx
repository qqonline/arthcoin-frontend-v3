import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import StakingCard from './StakingCard';
import { Bank } from '../../basis-cash';
import Button from '../../components/Button';
import Card from '../../components/Card';
import CardContent from '../../components/CardContent';
import CardIcon from '../../components/CardIcon';
import useBanks from '../../hooks/useBanks';
import TokenSymbol from '../../components/TokenSymbol';
import { useWallet } from 'use-wallet';
import styled from 'styled-components';


const BankCardsV2: React.FC = () => {
  const { path } = useRouteMatch();
  const [banks] = useBanks();
  const activeBanks = banks.filter((bank) => !bank.finished);
  const inactiveBanks = banks.filter((bank) => bank.finished);

  return (
    <StyledCards>
      <VFATAnn>
        <span role="img" aria-label="farming">
          🌾
        </span>{' '}
        Unofficial farming dashboard at{' '}
        <a
          href="https://vfat.tools/arth"
          style={{ color: '#FFf' }}
          rel="noopener noreferrer"
          target="_blank"
        >
          vfat.tools/arth
        </a>{' '}
        <span role="img" aria-label="farming">
          🌾
        </span>
      </VFATAnn>

      {/* {inactiveRows[0].length > 0 && (
        <StyledInactiveNoticeContainer>
          <Notice color="grey">
            <b>You have banks where the mining has finished.</b>
            <br />
            Please withdraw and settle your stakes.
          </Notice>
        </StyledInactiveNoticeContainer>
      )} */}


      <Grid container spacing={5} justify="center" alignItems="stretch">
        {activeBanks.map((item, j) => (
          <Grid key={j} container item xs={12} md={6} lg={4} xl={4}>
            <StakingCard bank={item} />
          </Grid>
        ))}
      </Grid>

      <StyledInactiveBankTitle>Closed Pools</StyledInactiveBankTitle>
      <Grid container spacing={5} justify="center" alignItems="stretch">

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

const Apy = styled.div`
  background: #fff3;
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  margin: 10px;
  text-align: center;
`;

const ApyTitle = styled.div`
  color: #fff9;
  margin-top: 10px;
  font-size: 16px;
`;

const ApyNote = styled.div`
  color: #fff9;
`;

const ApyBlocks = styled.div`
  margin: 5px;
  display: flex;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  margin-bottom: 25px;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 2);
  position: relative;
`;

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[200]};
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`;

const StyledDesc = styled.h4`
  color: #fff9;
  font-size: 14px;
  // font-weight: 700;
  text-align: center;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`;

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
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
