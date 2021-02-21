import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Theme, withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import { commify } from 'ethers/lib/utils';
import Container from '../../components/Container';
import HomeCard from './components/HomeCard';
import { OverviewData } from './types';
import StatCard from './components/StatCard';
import useBasisCash from '../../hooks/useBasisCash';
import config from '../../config';
// import StastIcon from '../../assets/svg/Stats.svg';
import DistributonSection from './components/DistributonSection';
import PriceInformation from './components/PriceInformation';
import { getDisplayBalance } from '../../utils/formatBalance';
import useFundAmount from '../../hooks/useFundAmount';
import InfoIcon from '../../assets/img/ToolTipColored.svg';
import EpochTimer from './components/EpochTimer';
import FAQCard from './components/FAQCard';
import Tooltip from '@material-ui/core/Tooltip';
import { useSelector } from 'react-redux';
import { AppState } from '../../state';
import { BigNumber } from 'ethers';

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#2A2827',
    color: 'white',
    fontWeight: 300,
    fontSize: '13px',
    borderRadius: '6px',
    padding: '20px',
  },
}))(Tooltip);

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


const Home: React.FC = () => {
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

  const accumulatedSeigniorage = useSelector<AppState, BigNumber>(s => s.treasury.coreState.accumulatedSeigniorage)
  const cashToBondConversionLimit = useSelector<AppState, BigNumber>(s => s.treasury.coreState.cashToBondConversionLimit)
  const price1hr = useSelector<AppState, BigNumber>(s => s.treasury.get1hrTWAPOraclePrice)

  const cashAddr = useMemo(() => basisCash.ARTH.address, [basisCash]);
  const shareAddr = useMemo(() => basisCash.MAHA.address, [basisCash]);
  const bondAddr = useMemo(() => basisCash.ARTHB.address, [basisCash]);

  const ecosystemFund = useFundAmount('ecosystem');

  return (
    <Page>
      <PageHeader
        icon={<div style={{ width: '200px', height: '200px' }} />}
        subtitle="View information about the current ARTH protocol"
        title="Statistics" />
      <Container size="lg">
        <div className="border-bottom width-100 margin-bottom-20" />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
            <EpochTimer />
          </Grid>
          <Grid item xs={12} sm={6} md={8} lg={8} xl={8}>
            <PriceInformation />
          </Grid>
        </Grid>
        <div className="margin-top-bottom-20">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <DistributonSection />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <StatCard
                statData={[
                  {
                    title: `${getDisplayBalance(cashToBondConversionLimit)} ARTHB`,
                    subTitle: 'Debt Available for Purchase',
                    tooltipHtml:
                      'The total number of ARTH Bonds available for purchase from the protocol at a 20% discount.',
                  },
                  {
                    title: `${getDisplayBalance(accumulatedSeigniorage)} ARTH`,
                    subTitle: 'Redeemable Debt',
                    tooltipHtml:
                      'The number of ARTH that can be redeemed depending on the number of ARTH Bonds available (Note: ARTH Bonds are always redeemed at a 1:1 ratio with ARTH tokens).',
                  },
                  {
                    title: '500 ARTHB',
                    subTitle: 'Outstanding Debt',
                    tooltipHtml:
                      'The number of ARTH that can be redeemed depending on the number of ARTH Bonds available(Note: ARTH Bonds are always redeemed at a 1:1 ratio with ARTH tokens)',
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
                        tooltipHtml:
                          'This refers to the stability fees that the ARTH protocol charges while redemption of ARTH Bonds. Current stability fees is 1% which is charged in $MAHA(MahaDAO) tokens. Please note, stability fees is subject to change depending on the governance model of MahaDAO',
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
                        tooltipHtml:
                          'When new ARTH is minted during an expansion phase, 2% of minted ARTH is deposited to the ecosystem fund that’ll be used purely for ecosystem development. ',
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
            title={'0 %'}
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

const CurrenTimeTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 32px;
  text-align: center;
  color: #ffffff;
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
