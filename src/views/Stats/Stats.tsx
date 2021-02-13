import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme, withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import { commify } from 'ethers/lib/utils';
import Container from '../../components/Container';
import HomeCard from './components/HomeCard';
import { OverviewData } from './types';
import StatCard from './components/StatCard';
import useBasisCash from '../../hooks/useBasisCash';
import config from '../../config';
import StastIcon from '../../assets/svg/Stats.svg';
import PieChart from './components/PieChart';
import useTreasuryAmount from '../../hooks/useTreasuryAmount';
import { getDisplayBalance } from '../../utils/formatBalance';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useFundAmount from '../../hooks/useFundAmount';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import moment from 'moment';
import Stat from './components/Stat';
import PurchacseCard from './components/PurchaseCard';
import ProgressCountdown from './components/ProgressCountdown';
import useCashTargetPrice from '../../hooks/useCashTargetPrice';
import useUniswapPrice from '../../hooks/useUniswapPrice';
import useUniswapLiquidity from '../../hooks/useUniswapLiquidity';
import useBondOraclePriceInLastTWAP from '../../hooks/useBondOraclePriceInLastTWAP';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import useNextEpochTargets from '../../hooks/useNextEpochTargets';
import FAQCard from './components/FAQCard';
import useMahaswapPrice from '../../hooks/useMahaswapPrice';
const FaqData = [
  {
    question: 'Do I need $MAHA to buy/redeem ARTH bonds?',
    answer:
      'Although, you don’t need $MAHA to buy ARTH Bonds, while redeeming ARTH Bonds, a 1% fee is charged in MAHA. Thus, you will need MAHA to redeem bonds.',
  },
  {
    question: 'Do I need to buy ARTH Bonds or they are rewarded if I hold ARTH?',
    answer: 'ARTH Bonds are not rewarded but need to be bought. They can be bought here',
  },
  {
    question: 'When is the 12-hour TWAP updated?',
    answer: 'The 12-hour TWAP is updated at every epoch.',
  },
  {
    question: 'When is the 1-hour TWAP updated?',
    answer: 'The 1-hour TWAP is updated every hour',
  },
  {
    question: 'Can ARTHB expire?',
    answer:
      'No, ARTH Bonds never expire. You can redeem them whenever you like until the 12-hr TWAP & 1 hr TWAP is more than the target price (currently $1).',
  },
];
const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 4,
      borderRadius: 2,
      minWidth: 220,
      margin: '0px 10px',
    },
    colorPrimary: {
      backgroundColor: '#2A2827',
    },
    bar: {
      borderRadius: 2,
      backgroundColor: '#FFA981',
    },
  }),
)(LinearProgress);
const useStylesFacebook = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    bottom: {
      color: '#D74D26',
      opacity: 0.32,
    },
    top: {
      color: '#F7653B',
      position: 'absolute',
      left: 0,
    },
    circle: {
      strokeLinecap: 'round',
    },
  }),
);
const Home: React.FC = () => {
  const classes = useStylesFacebook();
  const basisCash = useBasisCash();

  const [{ cash, bond, share }, setStats] = useState<OverviewData>({});
  const fetchStats = useCallback(async () => {
    const [cash, bond, share] = await Promise.all([
      basisCash.getCashStatFromMahaswap(),
      basisCash.getBondStat(),
      basisCash.getShareStat(),
    ]);

    if (Date.now() < config.bondLaunchesAt.getTime()) {
      bond.priceInDAI = '-';
    }

    setStats({ cash, bond, share });
  }, [basisCash, setStats]);

  useEffect(() => {
    if (basisCash) {
      fetchStats().catch((err) => console.error(err.stack));
    }
  }, [basisCash, fetchStats]);

  const cashAddr = useMemo(() => basisCash.ARTH.address, [basisCash]);
  const shareAddr = useMemo(() => basisCash.MAHA.address, [basisCash]);
  const bondAddr = useMemo(() => basisCash.ARTHB.address, [basisCash]);

  const cash1hrPrice = useBondOraclePriceInLastTWAP();
  const cashe12hrPrice = useCashPriceInLastTWAP();
  const treasuryAmount = useTreasuryAmount();
  const targetPrice = useCashTargetPrice();

  const ecosystemFund = useFundAmount('ecosystem');

  const { prevAllocation, nextAllocation, currentEpoch } = useTreasuryAllocationTimes();

  const prevEpoch = useMemo(
    () =>
      nextAllocation.getTime() <= Date.now()
        ? moment().utc().startOf('day').toDate()
        : prevAllocation,
    [prevAllocation, nextAllocation],
  );

  const arthPrice = useMahaswapPrice(basisCash.DAI, basisCash.ARTH);
  const arthLiquidity = useUniswapLiquidity(basisCash.DAI, basisCash.ARTH);
  const targets = useNextEpochTargets(cash1hrPrice);

  const nextEpoch = useMemo(() => moment(nextAllocation).toDate(), [nextAllocation]);

  const supplyIncrease = useMemo(
    () => Number(getDisplayBalance(targets.supplyIncrease, 18, 0)),
    [targets.supplyIncrease],
  );

  const debtIncrease = useMemo(() => Number(getDisplayBalance(targets.debtIncrease, 18, 0)), [
    targets.debtIncrease,
  ]);

  const supplyIncreasePercentage = useMemo(
    () => (cash ? (supplyIncrease / Number(cash?.totalSupply)) * 100 : 0),
    [cash, supplyIncrease],
  );

  const debtIncreasePercentage = useMemo(
    () => (cash ? (debtIncrease / Number(cash?.totalSupply)) * 100 : 0),
    [cash, debtIncrease],
  );
  const percentage =
    Date.now() >= nextEpoch.getTime()
      ? 100
      : ((Date.now() - prevEpoch.getTime()) / (nextEpoch.getTime() - prevEpoch.getTime())) *
        100;
  const countdownRenderer = (countdownProps: CountdownRenderProps) => {
    const { days, hours, minutes, seconds } = countdownProps;
    const h = String(days * 24 + hours);
    const m = String(minutes);
    const s = String(seconds);
    return (
      <CurrenTimeTitle>
        {h.padStart(2, '0')}:{m.padStart(2, '0')}:{s.padStart(2, '0')}
      </CurrenTimeTitle>
    );
  };
  return (
    <Page>
      <PageHeader
        icon={<img alt="stats" src={StastIcon} width="200px" />}
        subtitle="View information about the current ARTH protocol"
        title="Statistics"
        // secondParaTitle="Next Epoch"
        // secondParaDescription={
        //   targets.isLoading
        //     ? 'Loading...'
        //     : targets.supplyIncrease.gt(0)
        //     ? `Based on the 1hr TWAP price, the protocol will expand the supply by approximately ${commify(
        //         supplyIncrease,
        //       )} ARTH or ${supplyIncreasePercentage.toFixed(0)}% of the current supply.`
        //     : targets.debtIncrease.gt(0)
        //     ? `Based on the 1hr TWAP price, the protocol will contract the supply by buying back approximately ${debtIncrease} ARTH or ${debtIncreasePercentage.toFixed(
        //         0,
        //       )}% of the current supply`
        //     : `Based on the 1hr TWAP price, the protocol will not do anything as price is within the safe range (0.95$-1$)`
        // }
      />
      <Container size="lg">
        <div className="border-bottom width-100 margin-bottom-20" />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <Card>
              <div
                className="margin-bottom-20"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <TitleString>Next Epoch</TitleString>
                <CurrentEpoch>{`Current Epoch: ${currentEpoch.toFixed(0)}`}</CurrentEpoch>
              </div>
              <Desc>
                Based on the 1hr TWAP price, the protocol will not do anything as price is
                within the safe range (0.95$-1$).
              </Desc>
              <Desc>
                Note that the 12hr TWAP is used to decide if the supply expands or contracts.
              </Desc>
              <LearnMore href="https://docs.arthcoin.com/arth-201/dynamic-epochs" target="">
                Learn more about Epoch
              </LearnMore>
              <div className="dialog-class margin-top-30">
                <div className={classes.root}>
                  <Box position="relative" display="inline-flex">
                    <CircularProgress
                      variant="determinate"
                      className={classes.bottom}
                      size={190}
                      thickness={1}
                      value={100}
                    />
                    <CircularProgress
                      variant="determinate"
                      value={percentage}
                      disableShrink
                      size={190}
                      thickness={1}
                      className={classes.top}
                      classes={{
                        circle: classes.circle,
                      }}
                    />
                    <Box
                      top={0}
                      left={0}
                      bottom={0}
                      right={0}
                      position="absolute"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {/* <CurrenTimeTitle>{NextDeadline}</CurrenTimeTitle> */}
                      <Countdown date={nextEpoch} renderer={countdownRenderer} />
                    </Box>
                  </Box>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={8} lg={8} xl={8}>
            <CardTyep2>
              <StatContainer>
                <div style={{ padding: '30px' }}>
                  <StyledTitle>ARTH Price</StyledTitle>
                  <TitleBold>{arthPrice ? `$${arthPrice}` : '-'}</TitleBold>
                  <IncreasedText>+0.15%</IncreasedText>
                </div>
                <LinearProgressDiv>
                  <TimeComponent>24 h</TimeComponent>
                  <ResponsiveLabelContainer>
                    <LabelComponentLite>Low</LabelComponentLite>
                    <LabelComponentBold>$0.96</LabelComponentBold>
                  </ResponsiveLabelContainer>
                  <div style={{ position: 'relative' }}>
                    <div className="dialog-class margin-bottom-10">
                      <LabelComponentLite>Target Price</LabelComponentLite>
                      <LabelComponentBold>$1.00</LabelComponentBold>
                    </div>
                    <BorderLinearProgress variant="determinate" value={50} />
                    <div className="dialog-class margin-top-10">
                      <LabelComponentLite>Currennt Price</LabelComponentLite>
                      <LabelComponentBold color="#F7653B">$0.98</LabelComponentBold>
                    </div>
                  </div>
                  <ResponsiveLabelContainer>
                    <LabelComponentLite>High</LabelComponentLite>
                    <LabelComponentBold>$1.6</LabelComponentBold>
                  </ResponsiveLabelContainer>
                </LinearProgressDiv>
              </StatContainer>
              <div className="border-bottom width-100" />
              <Grid container>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className="dynamicStatBorder">
                  <PurchacseCard
                    title="12 hr TWAP"
                    isPurchase
                    price={
                      cashe12hrPrice ? `$${getDisplayBalance(cashe12hrPrice, 18, 2)}` : '-'
                    }
                    timeRemaining="00:23:22"
                    toolTipTitle="dwdmwkemfwefmwkefm"
                    percenTageIncreaseText="+0.15%"
                    timeRemainingToolTip="fnenfioer"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <PurchacseCard
                    title="1hr TWAP"
                    isPurchase={false}
                    timeRemaining="00:23:22"
                    price={cash1hrPrice ? `$${getDisplayBalance(cash1hrPrice, 18, 2)}` : '-'}
                    toolTipTitle="dwdmwkemfwefmwkefm"
                    percenTageIncreaseText="+0.15%"
                    timeRemainingToolTip="fnenfioer"
                  />
                </Grid>
              </Grid>
            </CardTyep2>
          </Grid>
        </Grid>
        <div className="margin-top-bottom-20">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Card>
                <TitleString>ARTH Seigniorage Distribution</TitleString>
                <PieChartCard>
                  <PieChart />
                  <div className="margin-left-20">
                    <PieChartLables>
                      <ChartIconColor color="#178A50" />
                      <div>
                        <ChartLabelTitle>ARTH-DAI Uniswap LP</ChartLabelTitle>
                        <ChartLabelTitleBold>70% (70,0000 ARTH-DAI)</ChartLabelTitleBold>
                      </div>
                    </PieChartLables>
                    <PieChartLables>
                      <ChartIconColor color="#20C974" />
                      <div>
                        <ChartLabelTitle>ARTH</ChartLabelTitle>
                        <ChartLabelTitleBold>20% (20,000 ARTH)</ChartLabelTitleBold>
                      </div>
                    </PieChartLables>
                    <PieChartLables>
                      <ChartIconColor color="#C4F7DD" />
                      <div>
                        <ChartLabelTitle>MAHA-ETH Uniswap LP</ChartLabelTitle>
                        <ChartLabelTitleBold>10% (10,000 MAHA-ETH)</ChartLabelTitleBold>
                      </div>
                    </PieChartLables>
                  </div>
                </PieChartCard>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <StatCard
                statData={[
                  {
                    title: `${123} ARTHB`,
                    subTitle: 'Debt Available for Purchase',
                  },
                  {
                    title: '78,654 ARTH',
                    subTitle: 'Redeemable Debt',
                  },
                  {
                    title: '500 ARTH',
                    subTitle: 'Outstanding Debt',
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <StatCard
                    statData={[
                      {
                        title: '1%',
                        subTitle: 'Stability Fees',
                      },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <StatCard
                    statData={[
                      {
                        title: ecosystemFund
                          ? `${commify(getDisplayBalance(ecosystemFund, 18, 0))} ARTH`
                          : '-',
                        subTitle: 'Ecosystem Fund',
                      },
                    ]}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <HomeCard
              title="MAHA"
              uniswapInputAddress={basisCash.MAHA.address}
              symbol="MAHA"
              liquidity="$87,783,601"
              supplyLabel="Circulating Supply"
              address={shareAddr}
              stat={share}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <HomeCard
              title="ARTH"
              symbol="ARTH"
              liquidity="$2,462,492"
              uniswapInputAddress={basisCash.ARTH.address}
              supplyLabel="Circulating Supply"
              address={cashAddr}
              stat={cash}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <HomeCard
              title="ARTH Bond"
              symbol="ARTHB"
              liquidity="$2,462,492"
              uniswapInputAddress={basisCash.ARTHB.address}
              address={bondAddr}
              stat={bond}
            />
          </Grid>
        </Grid>
        {/* <StyledHeader>
          <ProgressCountdown
            base={prevEpoch}
            deadline={nextEpoch}
            description="Next Epoch in"
            toolTipTitle="Epoch refers to a unit of time interval that the ARTH protocol uses to decide when to make changes to the system. The current starting epoch is set to 12 hours. However, the epoch time is subject to change in the future."
            toolTipLink="https://docs.arthcoin.com/arth-201/dynamic-epochs"
          />
          <Stat
            title={currentEpoch.toFixed(0)}
            description="Number of epochs elapsed"
            toolTipTitle="This refers to the number of epochs that have elapsed."
            toolTipLink="https://docs.arthcoin.com/arth-201/dynamic-epochs"
          />
          <Stat
            title={'1 %'}
            description="Stability Fees"
            toolTipTitle="This refers to the stability fees that the ARTH protocol charges while redemption of ARTH Bonds. Current stability fees is 1% which is charged in $MAHA(MahaDAO) tokens. Please note, stability fees is subject to change depending on the governance model of MahaDAO"
            toolTipLink="https://docs.arthcoin.com/arth-201/how-does-arth-mitigate-against-stability-risk/stability-fees-in-maha"
          />
          {/* <Stat
            title={`$${arthLiquidity}`}
            description="ARTH Liquidity"
            toolTipTitle="This refers to the amount of liquidity available in the market for the ARTH-DAI pair"
          />
        </StyledHeader>
        <StyledHeader>
          <Stat
            title={cash1hrPrice ? `$${getDisplayBalance(cash1hrPrice, 18, 2)}` : '-'}
            description="ARTH Price (1hr TWAP)"
            toolTipTitle="TWAP means time weighted average price. Thus, the 1 hr TWAP refers to the 1 hr average price of ARTH. Note that the 1hr TWAP of ARTH is updated every hour"
          />
          <Stat
            title={cashe12hrPrice ? `$${getDisplayBalance(cashe12hrPrice, 18, 2)}` : '-'}
            description="ARTH Price (12hr TWAP)"
            toolTipTitle="TWAP means time weighted average price. Thus, the 12-hr TWAP refers to the 12 hr average price of ARTH. Note that the 12-hr TWAP of ARTH is always updated at every epoch & is not updated constantly."
          />
          <Stat
            title={arthPrice ? `$${arthPrice}` : '-'}
            description="ARTH Price (Spot)"
            toolTipTitle="This refers to the current price of ARTH"
          />
          <Stat
            title={targetPrice ? `$${getDisplayBalance(targetPrice)}` : '-'}
            description="ARTH Price (Target)"
            toolTipTitle="This refers to the target price or the peg that ARTH should ideally be at. As ARTH is pegged to Global Measurement Unit (GMU), the target price of ARTH is an ever-changing phenomenon. Currently, the target price is at $1."
            toolTipLink="https://docs.arthcoin.com/arth-201/target-price-of-arth"
          />
        </StyledHeader>
        <StyledHeader>
          {/* <Stat
            title="12hr TWAP > $1.05"
            description="Expansion happens when"
            toolTipTitle="When the 12hr TWAP of ARTH > $1.05, the system mints more ARTH tokens as seigniorage & distributes it amongst various participants of the protocol. This is known as Expansion."
            toolTipLink="https://docs.arthcoin.com/arth-201/expansion-mechanics#expansion-phase-in-arth"
          />
          <Stat
            title="12hr TWAP < $0.95"
            description="Contraction happens when"
            toolTipTitle="When the 12hr TWAP  of ARTH < $0.95 , the system issues ARTH Bonds which can be purchased at a discount to the ARTH price to increase demand in the market & decrease the supply through a burning mechanism. This is known as Contraction."
            toolTipLink="https://docs.arthcoin.com/arth-201/expansion-mechanics#contraction-phase-in-arth"
          />
          <Stat
            title="1hr TWAP > $1.00"
            description="Bond Redemption happens when"
            toolTipTitle="This refers to the condition that should be met for ARTH Bonds to become redeemable. Thus, you can redeem your ARTH Bonds only when the 12hr TWAP > $1.00."
            toolTipLink="https://docs.arthcoin.com/tutorials/redeeming-bonds"
          /> */}
          {/* <Stat
            title={`$${arthLiquidity}`}
            description="ARTH Liquidity"
            toolTipTitle="This refers to the amount of liquidity available in the market for the ARTH-DAI pair"
          />
        </StyledHeader>

        <StyledHeader>
          <Stat
            title={
              targetPrice
                ? `12hr TWAP > $${getDisplayBalance(targetPrice.mul(105).div(100), 18, 2)}`
                : '-'
            }
            description="Expansion happens when"
          />
          <Stat
            title={
              targetPrice
                ? `12hr TWAP < $${getDisplayBalance(targetPrice.mul(95).div(100), 18, 2)}`
                : '-'
            }
            description="Contraction happens when"
          />
          <Stat
            title={targetPrice ? `1hr TWAP < $0.95` : '-'}
            description="Bond Purchase happens when"
          />

          <Stat
            title={targetPrice ? `1hr TWAP > $1.00` : '-'}
            description="Bond Redemption happens when"
          />
        </StyledHeader>
        <StyledHeader>
          <Stat
            title={treasuryAmount ? `${getDisplayBalance(treasuryAmount)} ARTH` : '-'}
            description="Redeemable for Bonds"
          />
          <Stat
            title={
              ecosystemFund ? `${commify(getDisplayBalance(ecosystemFund, 18, 0))} ARTH` : '-'
            }
            description="Ecosystem Fund"
            toolTipTitle="When new ARTH is minted during an expansion phase, 2% of minted ARTH is deposited to the ecosystem fund that’ll be used purely for ecosystem development."
            toolTipLink="https://docs.arthcoin.com/arth-201/expansion-mechanics/seiongrage-distribution"
          />
        </StyledHeader>*/}
        <FaqTitle>FAQs</FaqTitle>
        {FaqData && FaqData.map((eachFaq) => <FAQCard key={eachFaq.question} {...eachFaq} />)}
      </Container>
    </Page>
  );
};
const FaqTitle = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 44px;
  color: #ffffff;
  opacity: 0.88;
  margin-top: 40px;
  margin-bottom: 20px;
`;
const ResponsiveLabelContainer = styled.div`
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const PieChartCard = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const Desc = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 140%;
  color: #d9d5d3;
  opacity: 0.64;
  margin-bottom: 5px;
`;
const CurrentEpoch = styled.div`
  background: #423b38;
  border-radius: 4px;
  font-weight: 600;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fcb400;
  flex: none;
  order: 0;
  flex-grow: 0;
  padding: 3px 10px;
  margin: 0px 10px;
`;
const TitleString = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
  opacity: 0.88;
`;
const Card = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(70px);
  border-radius: 12px;
  padding: 20px;
  height: 100%;
`;
const CardTyep2 = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(70px);
  border-radius: 12px;
`;
const LearnMore = styled.a`
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 140%;
  margin-top: 10px;
  cursor: pointer;
  color: #f7653b;
  opacity: 0.88;
  &:hover {
    color: #f7653b;
    opacity: 0.88;
  }
`;
const StyledTitle = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: #ffffff;
  opacity: 0.64;
`;
const CurrenTimeTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  color: #ffffff;
`;
const IncreasedText = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  color: #178a50;
`;
const TitleBold = styled.div`
  font-style: normal;
  margin-top: 13px;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #ffffff;
`;
const LinearProgressDiv = styled.div`
  display: flex !important;
  align-items: center;
  justify-content: center;
  padding-right: 30px;
  @media (max-width: 768px) {
    padding-bottom: 30px;
  }
`;
const StatContainer = styled.div`
  flex: 1 1;
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
  }
`;
const TimeComponent = styled.div`
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-weight: 600;
  margin-right: 10px;
  font-size: 12px;
  color: #ffffff;
  opacity: 0.6;
  padding: 2px 7px;
  margin: 0px 4px;
`;
const LabelComponentLite = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  margin-right: 5px;
  line-height: 140%;
  text-align: center;
  color: #ffffff;
  opacity: 0.6;
`;
const LabelComponentBold = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: ${(props) => (props.color ? props.color : '#ffffff')};
`;
const ChartLabelTitle = styled.div`
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: #ffffff;
  opacity: 0.64;
`;
const ChartLabelTitleBold = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
`;
const PieChartLables = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 12px;
`;
const ChartIconColor = styled.div`
  width: 14px;
  margin-right: 10px;
  height: 14px;
  border-radius: 50%;
  background: ${(props) => (props.color ? props.color : '#ffffff')};
`;
export default Home;
