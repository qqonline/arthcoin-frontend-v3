import React, { useCallback, useMemo } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import ExchangeCard from './components/ExchangeCard';
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
import { getDisplayBalance } from '../../utils/formatBalance';
import { BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN } from '../../basis-cash/constants';
import BondsIcon from './bonds.png';

const Bond: React.FC = () => {
  const { path } = useRouteMatch();
  const basisCash = useBasisCash();
  const addTransaction = useTransactionAdder();
  const bondStat = useBondStats();
  const cashPrice = useBondOraclePriceInLastTWAP();

  const bondBalance = useTokenBalance(basisCash?.BAB);

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
  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
  const isBondPurchasable = useMemo(() => Number(bondStat?.priceInDAI) < 1.0, [bondStat]);

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
              subtitle="Earn premiums upon redemption"
            />
          </Route>
          <StyledBond>
            <StyledCardWrapper>
              <ExchangeCard
                action="Purchase"
                fromToken={basisCash.BAC}
                fromTokenName="ARTH"
                toToken={basisCash.BAB}
                toTokenName="ARTHB"
                priceDesc={
                  !isBondPurchasable
                    ? "ARTH is over it's target price"
                    : `${Math.floor(
                        100 / Number(bondStat.priceInDAI) - 100,
                      )}% return when ARTH is below it's target price`
                }
                onExchange={handleBuyBonds}
                disabled={!bondStat || isBondRedeemable}
              />
            </StyledCardWrapper>
            <StyledStatsWrapper>
              <ExchangeStat
                tokenName="ARTH"
                description="Last-Hour TWAP Price"
                price={getDisplayBalance(cashPrice, 18, 2)}
              />
              <Spacer size="md" />
              <ExchangeStat
                tokenName="ARTHB"
                description="Current Price: (ARTH)^2"
                price={bondStat?.priceInDAI || '-'}
              />
            </StyledStatsWrapper>
            <StyledCardWrapper>
              <ExchangeCard
                action="Redeem"
                fromToken={basisCash.BAB}
                fromTokenName="ARTHB"
                toToken={basisCash.BAC}
                toTokenName="ARTH"
                priceDesc={`${getDisplayBalance(bondBalance)} ARTHB Available`}
                onExchange={handleRedeemBonds}
                disabled={!bondStat || bondBalance.eq(0) || !isBondRedeemable}
                disabledDescription={
                  !isBondRedeemable ? `Enabled when ARTH > $${BOND_REDEEM_PRICE}` : null
                }
              />
            </StyledCardWrapper>
          </StyledBond>
        </>
      </Page>
    </Switch>
  );
};

// ) : (
//   <div
//     style={{
//       alignItems: 'center',
//       display: 'flex',
//       flex: 1,
//       justifyContent: 'center',
//     }}
//   >
//     <Button onClick={() => connect('injected')} text="Unlock Wallet" />
//   </div>
// )}

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
  margin: 0 20px;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 80%;
    margin: 16px 0;
  }
`;

export default Bond;
