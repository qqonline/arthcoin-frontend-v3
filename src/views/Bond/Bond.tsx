import React, { useCallback, useMemo } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import ExchangeCard from './components/ExchangeCard';
import ExchangeCardBonds from './components/ExchangeCardBonds';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import useBondStats from '../../hooks/useBondStats';
import useBasisCash from '../../hooks/useBasisCash';
import useBondOraclePriceInLastTWAP from '../../hooks/useBondOraclePriceInLastTWAP';
import { useTransactionAdder } from '../../state/transactions/hooks';
import config from '../../config';
import LaunchCountdown from '../../components/LaunchCountdown';
import ExchangeStat from './components/ExchangeStat';
import useTokenBalance from '../../hooks/useTokenBalance';
import useCashTargetPrice from '../../hooks/useCashTargetPrice';
import { getDisplayBalance } from '../../utils/formatBalance';
import useStabilityFees from '../../hooks/useStabilityFee';
import BondsIcon from './bonds.png';
import { BigNumber } from 'ethers';

const Bond: React.FC = () => {
  const { path } = useRouteMatch();
  const basisCash = useBasisCash();
  const addTransaction = useTransactionAdder();
  const bondStat = useBondStats();
  const cashPrice = useBondOraclePriceInLastTWAP();
  const targetPrice = useCashTargetPrice();
  const stabiltiyFees = useStabilityFees();

  const bondBalance = useTokenBalance(basisCash.ARTHB);

  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await basisCash.buyBonds(amount);
      const bondAmount = Number(amount) / Number(getDisplayBalance(cashPrice));
      addTransaction(tx, {
        summary: `Buy ${bondAmount.toFixed(2)} ARTHB with ${amount} ARTH`,
      });
    },
    [basisCash, addTransaction, cashPrice],
  );

  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      const tx = await basisCash.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} ARTHB` });
    },
    [basisCash, addTransaction],
  );

  const isBondRedeemable = useMemo(() => cashPrice?.gt(targetPrice), [cashPrice, targetPrice]);
  const isBondPurchasable = useMemo(() => {
    const denominator1e18 = BigNumber.from(10).pow(18);

    const currentPrice = BigNumber.from(Number(bondStat?.priceInDAI || 0) * 1000)
      .mul(denominator1e18)
      .div(1000);
    return currentPrice.lt(targetPrice);
  }, [bondStat, targetPrice]);

  const isLaunched = Date.now() >= config.bondLaunchesAt.getTime();

  if (!isLaunched) {
    return (
      <Switch>
        <Page>
          <PageHeader
            icon={<img alt="bonds" src={BondsIcon} />}
            title="Buy & Redeem Bonds"
            subtitle="Earn premiums upon redemption"
          />
          <LaunchCountdown
            deadline={config.bondLaunchesAt}
            description="How does ARTH Bond work?"
            descriptionLink="https://docs.basis.cash/mechanisms/stabilization-mechanism"
          />
        </Page>
      </Switch>
    );
  }

  if (!basisCash) return <div />;

  return (
    <Switch>
      <Page>
        <>
          <Route exact path={path}>
            <PageHeader
              icon={<img alt="bonds" src={BondsIcon} />}
              title="Buy & Redeem Bonds"
              subtitle="Bonds can be bought when ARTH is trading below it's target price and can be redeemed at a premium when ARTH is trading above it's target price."
            />
          </Route>
          <StyledBond>
            <StyledCardWrapper>
              <ExchangeCard
                action="Purchase"
                fromToken={basisCash.DAI}
                fromTokenName="DAI"
                toToken={basisCash.ARTHB}
                toTokenName="ARTHB"
                priceDesc={
                  !isBondPurchasable
                    ? "ARTH is over it's target price"
                    : `${Math.floor(
                        100 / Number(bondStat?.priceInDAI) - 100,
                      )}% return when ARTH is over it's target price`
                }
                onExchange={handleBuyBonds}
                disabled={!isBondPurchasable}
              />
            </StyledCardWrapper>
            <Spacer size="md" />

            <StyledCardWrapper>
              <ExchangeCardBonds
                action="Redeem"
                fromToken={basisCash.ARTHB}
                fromTokenName="ARTHB"
                toToken={basisCash.DAI}
                toTokenName="DAI"
                priceDesc={`${getDisplayBalance(bondBalance)} ARTHB Available`}
                onExchange={handleRedeemBonds}
                disabled={!isBondRedeemable}
                disabledDescription={
                  !isBondRedeemable
                    ? `Enabled when ARTH > $${getDisplayBalance(targetPrice)}`
                    : null
                }
              />
            </StyledCardWrapper>
          </StyledBond>

          <Spacer size="md" />

          <StyledBond>
            <StyledStatsWrapper>
              <ExchangeStat
                title={`ARTH: $${getDisplayBalance(cashPrice, 18, 2)}`}
                description="Last-Hour TWAP Price"
              />
              <Spacer size="md" />
              <ExchangeStat
                title={`ARTHB: $${bondStat?.priceInDAI || '-'}`}
                description="Current Price: (ARTH)^2"
              />
              <Spacer size="md" />
            </StyledStatsWrapper>

            <Spacer size="md" />
            <StyledStatsWrapper>
              <ExchangeStat
                title={`Target: $${getDisplayBalance(targetPrice, 18, 2)}`}
                description="What the Price of ARTH should be"
              />
              <Spacer size="md" />
              <ExchangeStat
                title={`Bond Redemtion Fees: ${stabiltiyFees}%`}
                description="Fees paid in $MAHA when redeeming bonds"
              />
              <Spacer size="md" />
            </StyledStatsWrapper>
          </StyledBond>
        </>
      </Page>
    </Switch>
  );
};

const StyledBond = styled.div`
  display: flex;
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StyledStatsWrapper = styled.div`
  display: flex;
  flex: 0.8;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 80%;
    margin: 16px 0;
  }
`;

export default Bond;
