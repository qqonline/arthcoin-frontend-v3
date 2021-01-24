import React, { useCallback, useMemo } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import ExchangeCard from './components/Purchase/ExchangeCard';
import ExchangeCardBonds from './components/Redeem/ExchangeCardBonds';
import Container from '../../components/Container';
import styled from 'styled-components';
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
import useStabilityFee from '../../hooks/useStabilityFee';
import BondsIcon from '../../assets/svg/Bond.svg';
import Chart from './components/Chart';
import { BigNumber } from 'ethers';

const Bond: React.FC = () => {
  const { path } = useRouteMatch();
  const basisCash = useBasisCash();
  const addTransaction = useTransactionAdder();
  // const bondStat = useBondStats();
  const cash1hrPrice = useBondOraclePriceInLastTWAP();
  const targetPrice = useCashTargetPrice();
  const stabiltiyFees = useStabilityFee();

  const bondBalance = useTokenBalance(basisCash.ARTHB);

  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await basisCash.buyBonds(amount);

      addTransaction(tx, {
        summary: `Buy ARTHB with ${amount} DAI`,
      });
    },
    [basisCash, addTransaction],
  );

  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      const tx = await basisCash.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} ARTHB` });
    },
    [basisCash, addTransaction],
  );

  const isBondRedeemable = useMemo(() => cash1hrPrice.gt(targetPrice), [cash1hrPrice, targetPrice]);

  const isBondPurchasable = useMemo(() => {
    // 95 % of target price
    return cash1hrPrice.lt(targetPrice.mul(95).div(100))
  }, [cash1hrPrice, targetPrice]);

  // const isLaunched = Date.now() >= config.bondLaunchesAt.getTime();
  // if (!isLaunched) {
  //   return (
  //     <Switch>
  //       <Page>
  //         <PageHeader
  //           icon={<img alt="bonds" src={BondsIcon} width="200px" />}
  //           title="Buy & Redeem Bonds"
  //           subtitle="Purchasing ARTH Bonds has a direct impact on Uniswap price and is used to help bring the price of ARTH back to its target price"
  //         />

  //       </Page>
  //     </Switch>
  //   );
  // }

  if (!basisCash) return <div />;

  return (
    <Switch>
      <Page>
        <>
          <Route exact path={path}>
            <PageHeader
              icon={<img alt="bonds" src={BondsIcon} width="250px" />}
              title="Buy & Redeem Bonds"
              subtitle="Bonds can be bought when ARTH is trading below its target price and can be redeemed at a premium when ARTH is trading above its target price."
            />
          </Route>
          <Container size="lg">
            <div className="border-bottom width-100 margin-bottom-20" />
            <Grid container spacing={3} justify="center">
              <Grid item xs={12} md={8} lg={8} xl={8}>
                {false && (
                  <ChartContainer>
                    <p className="white font20 bold-600 margin-left-15">ARTH Price</p>
                    <Chart />
                  </ChartContainer>
                )}
                <Grid container spacing={3} justify="center">
                  <Grid item xs={12} md={6} lg={6} xl={6}>
                    <ExchangeCard
                      action="Purchase"
                      fromToken={basisCash.DAI}
                      fromTokenName="DAI"
                      toToken={basisCash.ARTHB}
                      toTokenName="ARTHB"
                      addOnTokeName="ARTH"
                      addOnToken="ARTH"
                      priceDesc={
                        !isBondPurchasable
                          ? 'ARTH is over its target price'
                          : `ARTH is below its target price. You can purchase bonds now.`
                      }
                      onExchange={handleBuyBonds}
                      disabled={!isBondPurchasable}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} xl={6}>
                    <ExchangeCardBonds
                      action="Redeem ARTHB"
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
                  </Grid>

                  <Grid container spacing={2} item xs={12} md={12} lg={12} xl={12}>
                    <Grid item xs={12} md={3} lg={3} xl={3}>
                      <ExchangeStat
                        title={`ARTH: $${getDisplayBalance(cash1hrPrice, 18, 2)}`}
                        description="1hr TWAP Price"
                      />
                    </Grid>
                    <Grid item xs={12} md={3} lg={3} xl={3}>
                      <ExchangeStat
                        title={`ARTHB: $${getDisplayBalance(cash1hrPrice.mul(80).div(100), 18, 2)}`}
                        description="ARTH Bond Price"
                      />
                    </Grid>
                    <Grid item xs={12} md={3} lg={3} xl={3}>
                      <ExchangeStat
                        title={`20%`}
                        description="Bond Discount"
                      />
                    </Grid>
                    <Grid item xs={12} md={3} lg={3} xl={3}>
                      <ExchangeStat
                        title={`Target: $${getDisplayBalance(targetPrice, 18, 2)}`}
                        description="Target Price"
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} xl={6}>
                      <ExchangeStat
                        title={`${stabiltiyFees}%`}
                        description="Fees paid in $MAHA when redeeming bonds"
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} xl={6}>
                      <ExchangeStat
                        title={`0 ARTHB`}
                        description="Bonds available for redeemtion"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
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

const LaunchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(70px);
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  margin-bottom: 30px;
`;

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(70px);
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  margin-bottom: 30px;
`;

export default Bond;
