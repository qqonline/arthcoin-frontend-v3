import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import HomeCard from './components/HomeCard';
import { OverviewData } from './types';
import useBasisCash from '../../hooks/useBasisCash';
import config from '../../config';
import StastIcon from './stats.png';

const Home: React.FC = () => {
  const basisCash = useBasisCash();

  const [{ cash, bond, share }, setStats] = useState<OverviewData>({});
  const fetchStats = useCallback(async () => {
    const [cash, bond, share] = await Promise.all([
      basisCash.getCashStatFromUniswap(),
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

  const cashAddr = useMemo(() => basisCash?.BAC.address, [basisCash]);
  const shareAddr = useMemo(() => basisCash?.BAS.address, [basisCash]);
  const bondAddr = useMemo(() => basisCash?.BAB.address, [basisCash]);

  return (
    <Page>
      <PageHeader
        icon={<img alt="stats" src={StastIcon} />}
        subtitle="View information about the current ARTH market"
        title="Statistics"
      />
      <Spacer size="md" />
      <CardWrapper>
        <HomeCard
          title="ARTH"
          symbol="ARTH"
          color="#EEA7ED"
          supplyLabel="Circulating Supply"
          address={cashAddr}
          stat={cash}
        />
        <Spacer size="lg" />
        <HomeCard title="MAHA" symbol="MAHA" color="#E83725" address={shareAddr} stat={share} />
        <Spacer size="lg" />
        <HomeCard
          title="ARTH Bond"
          symbol="ARTHB"
          color="#ECF25C"
          address={bondAddr}
          stat={bond}
        />
      </CardWrapper>
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

export default Home;
