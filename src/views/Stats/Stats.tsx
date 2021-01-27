import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import { commify } from 'ethers/lib/utils';
import Container from '../../components/Container';
import HomeCard from './components/HomeCard';
import { OverviewData } from './types';
import useBasisCash from '../../hooks/useBasisCash';
import config from '../../config';
import StastIcon from '../../assets/svg/Stats.svg';

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
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import useNextEpochTargets from '../../hooks/useNextEpochTargets';

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

  const arthPrice = useUniswapPrice(basisCash.DAI, basisCash.ARTH);
  const arthLiquidity = useUniswapLiquidity(basisCash.DAI, basisCash.ARTH);
  const targets = useNextEpochTargets(cash1hrPrice);

  const nextEpoch = useMemo(() => moment(prevEpoch).add(12, 'hour').toDate(), [prevEpoch]);

  const supplyIncrease = useMemo(
    () => Number(getDisplayBalance(targets.supplyIncrease, 18, 0)),
    [targets.supplyIncrease],
  );

  const supplyIncreasePercentage = useMemo(
    () => (cash ? (supplyIncrease / Number(cash?.totalSupply)) * 100 : 0),
    [cash, supplyIncrease],
  );

  return (
    <Page>
      <PageHeader
        icon={<img alt="stats" src={StastIcon} width="200px" />}
        subtitle="View information about the current ARTH protocol"
        title="Statistics"
        secondParaTitle="Next Epoch"
        secondParaDescription={
          cash1hrPrice.gt(targetPrice)
            ? `Protocol will expand the supply by approximately ${commify(
                supplyIncrease,
              )} ARTH or ${supplyIncreasePercentage.toFixed(0)}% of the current supply`
            : `Protocol will contract the supply by buying back approximately 5% of ARTH supply`
        }
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
          <Stat
            title={`$${commify(getDisplayBalance(arthLiquidity, 18, 0))}`}
            description="ARTH Liquidity"
          />
        </StyledHeader>
        <StyledHeader>
          <Stat
            title={cash1hrPrice ? `$${getDisplayBalance(cash1hrPrice, 18, 2)}` : '-'}
            description="ARTH Price (1hr TWAP)"
          />
          <Stat
            title={cashe12hrPrice ? `$${getDisplayBalance(cashe12hrPrice, 18, 2)}` : '-'}
            description="ARTH Price (12hr TWAP)"
          />
          <Stat title={arthPrice ? `$${arthPrice}` : '-'} description="ARTH Price (Spot)" />
          <Stat
            title={targetPrice ? `$${getDisplayBalance(targetPrice)}` : '-'}
            description="ARTH Price (Target)"
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
            title={targetPrice ? `12hr TWAP > $${getDisplayBalance(targetPrice, 18, 2)}` : '-'}
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
          />
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
