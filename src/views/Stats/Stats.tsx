import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import Container from '../../components/Container';
import HomeCard from './components/HomeCard';
import { OverviewData } from './types';
import useBasisCash from '../../hooks/useBasisCash';
import config from '../../config';
import StastIcon from '../../assets/svg/Stats.svg';

import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useTreasuryAmount from '../../hooks/useTreasuryAmount';
import { getDisplayBalance } from '../../utils/formatBalance';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useFundAmount from '../../hooks/useFundAmount';

import moment from 'moment';

import Stat from './components/Stat';
import ProgressCountdown from './components/ProgressCountdown';
import useCashTargetPrice from '../../hooks/useCashTargetPrice';
import useUniswapPrice from '../../hooks/useUniswapPrice';
import useUniswapLiquidity from '../../hooks/useUniswapLiquidity';
import useBondOraclePriceInLastTWAP from '../../hooks/useBondOraclePriceInLastTWAP';

const Home: React.FC = () => {
  const basisCash = useBasisCash();
  const [tick, setTick] = useState(1);

  const [{ cash, bond, share }, setStats] = useState<OverviewData>({});
  const fetchStats = useCallback(async () => {
    const [cash, bond, share] = await Promise.all([
      basisCash.getCashStatFromUniswap(),
      basisCash.getBondStat(),
      basisCash.getShareStat()
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

  const cashStat = useCashPriceInEstimatedTWAP();
  const cashOraclePrice = useBondOraclePriceInLastTWAP();
  const treasuryAmount = useTreasuryAmount();
  const targetPrice = useCashTargetPrice();

  const ecosystemFund = useFundAmount('ecosystem');

  // const scalingFactor = useMemo(

  //   () => (cashStat ? Number(cashStat.priceInDAI).toFixed(2) : null),
  //   [cashStat],
  // );

  const { prevAllocation, nextAllocation, currentEpoch } = useTreasuryAllocationTimes();

  const prevEpoch = useMemo(
    () =>
      nextAllocation.getTime() <= Date.now()
        ? moment().utc().startOf('day').toDate()
        : prevAllocation,
    [prevAllocation, nextAllocation],
  );

  useEffect(() => {
    let _tick = 0;
    const interval: NodeJS.Timeout = setInterval(() => setTick(_tick++), 1000);
    return () => {
      clearInterval(interval);
    };
  });

  const arthPrice = useUniswapPrice(basisCash.DAI, basisCash.ARTH);
  const arthLiquidity = useUniswapLiquidity(basisCash.DAI, basisCash.ARTH);

  // @ts-ignore
  const nextEpoch = useMemo(() => moment(prevEpoch).add(12, 'hour').toDate(), [prevEpoch]);

  return (
    <Page>
      <PageHeader
        icon={<img alt="stats" src={StastIcon} width="200px" />}
        subtitle="View information about the current ARTH protocol"
        title="Statistics"
        secondParaTitle="Protocol Launch"
        secondParaDescription="Bonding opens at 3pm GMT and the first epoch starts at 4pm GMT"
      />
      <Container size="lg">
        <div className="border-bottom width-100 margin-bottom-20" />
        <CardWrapper>
          <HomeCard
            title="MAHA"
            uniswapInputAddress={basisCash.MAHA.address}
            symbol="MAHA"
            supplyLabel="Circulating Supply"
            address={shareAddr}
            stat={share}
          />
          <HomeCard
            title="ARTH"
            symbol="ARTH"
            uniswapInputAddress={basisCash.ARTH.address}
            supplyLabel="Circulating Supply"
            address={cashAddr}
            stat={cash}
          />
          <HomeCard
            title="ARTH Bond"
            symbol="ARTHB"
            uniswapInputAddress={basisCash.ARTHB.address}
            address={bondAddr}
            stat={bond}
          />
        </CardWrapper>
        <StyledHeader>
          <ProgressCountdown base={prevEpoch} deadline={nextEpoch} description="Next Epoch" />
          <Stat title={currentEpoch.toFixed(0)} description="Current Epoch" />
          <Stat title={'1 %'} description="Stability Fees" />
          <Stat title={`$${arthLiquidity}`} description="ARTH Liquidity" />
          {/* <Stat title={scalingFactor ? `x${scalingFactor}` : '-'} description="Scaling Factor" /> */}
        </StyledHeader>
        <StyledHeader>
          <Stat
            title={cashOraclePrice ? `$${getDisplayBalance(cashOraclePrice, 18, 2)}` : '-'}
            description="ARTH Price (1hr TWAP)"
          />
          <Stat title={arthPrice ? `$${arthPrice}` : '-'} description="ARTH Price (Spot)" />
          <Stat
            title={targetPrice ? `$${getDisplayBalance(targetPrice)}` : '-'}
            description="ARTH Price (Target)"
          />
        </StyledHeader>
        <StyledHeader>
          <Stat
            title={treasuryAmount ? `${getDisplayBalance(treasuryAmount)} ARTH` : '-'}
            description="Redeemable for Bonds"
          />
          <Stat
            title={ecosystemFund ? `${getDisplayBalance(ecosystemFund)} ARTH` : '-'}
            description="Ecosystem Fund"
          />
          {/* <Stat
          title={cdpFund ? `${getDisplayBalance(cdpFund)} ARTH` : '-'}
          description="CDP Fund"
        /> */}
        </StyledHeader>
      </Container>
    </Page>
  );
};

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledHeader = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: row;
  margin-bottom: ${(props) => props.theme.spacing[5]}px;

  > * {
    flex: 1;
    height: 84px;
    margin: 0 ${(props) => props.theme.spacing[2]}px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    margin-bottom: 0px;
  }
`;

export default Home;
