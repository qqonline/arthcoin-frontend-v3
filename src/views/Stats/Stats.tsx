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
import Humanize from 'humanize-plus';
import { getBalance, getDisplayBalance } from '../../utils/formatBalance';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useFundAmount from '../../hooks/useFundAmount';

import moment from 'moment';

import Stat from './components/Stat';
import ProgressCountdown from './components/ProgressCountdown';
import useCashTargetPrice from '../../hooks/useCashTargetPrice';
import useUniswapPrice from '../../hooks/useUniswapPrice';
import useUniswapLiquidity from '../../hooks/useUniswapLiquidity';
import { BigNumber } from 'ethers';
import useBondOraclePriceInLastTWAP from '../../hooks/useBondOraclePriceInLastTWAP';

const Home: React.FC = () => {
  const basisCash = useBasisCash();
  const [tick, setTick] = useState(1);

  const [{ cash, bond, share }, setStats] = useState<OverviewData>({});
  const fetchStats = useCallback(async () => {
    const [cash, bond, share] = await Promise.all([
      basisCash.getCashStatFromUniswap(),
      basisCash.getBondStat(),
      // basisCash.getShareStat(),
      basisCash.getBondStat(),
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
  const mahaPrice = useUniswapPrice(basisCash.DAI, basisCash.ARTH);
  const arthLiquidity = useUniswapLiquidity(basisCash.DAI, basisCash.ARTH);
  // @ts-ignore
  const nextEpoch = useMemo(() => moment(prevEpoch).add(1, 'hour').toDate(), [prevEpoch]);

  return (
    <Page>
      <PageHeader
        icon={<img alt="stats" src={StastIcon} width="200px" />}
        subtitle="View information about the current ARTH market"
        title="Statistics"
        secondParaTitle="Next Epoch:"
        secondParaDescription="Protocol debt will increase by 12,218,780.65 ESD. 56.24% coupon premium. No reward for Bonding or LPing."
      />
      <Container size="lg">
        <div className="border-bottom width-100 margin-bottom-20" />
        <CardWrapper>
          <HomeCard
            title="MAHA"
            uniswapInputAddress={basisCash.DAI.address}
            symbol="MAHA"
            address={shareAddr}
            stat={share}
          />
          <HomeCard
            title="ARTH"
            symbol="ARTH"
            uniswapInputAddress={basisCash.DAI.address}
            supplyLabel="Circulating Supply"
            address={cashAddr}
            stat={cash}
          />
          <HomeCard
            title="ARTH Bond"
            symbol="ARTHB"
            uniswapInputAddress={basisCash.DAI.address}
            address={bondAddr}
            stat={bond}
          />
        </CardWrapper>
        <StyledHeader>
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
          <Stat
            title={`$${arthLiquidity}`}
            description="ARTH Liquidity"
            toolTipTitle="This refers to the amount of liquidity available in the market for the ARTH-DAI pair"
          />
          {/* <Stat title={scalingFactor ? `x${scalingFactor}` : '-'} description="Scaling Factor" /> */}
        </StyledHeader>
        <StyledHeader>
          <Stat
            title={cashStat ? `$${getDisplayBalance(cashOraclePrice, 18, 2)}` : '-'}
            description="ARTH Price (TWAP)"
            toolTipTitle="TWAP means time weighted average price. Thus, the 1 hr TWAP refers to the 1 hr average price of ARTH. Note that the 1hr TWAP of ARTH is updated every hour"
          />
          <Stat
            title={cashStat ? `$${arthPrice}` : '-'}
            description="ARTH Price (Spot)"
            toolTipTitle="This refers to the current price of ARTH"
          />
          <Stat
            title={cashStat ? `$${getDisplayBalance(targetPrice)}` : '-'}
            description="ARTH Price (Target)"
            toolTipTitle="This refers to the target price or the peg that ARTH should ideally be at. As ARTH is pegged to Global Measurement Unit (GMU), the target price of ARTH is an ever-changing phenomenon. Currently, the target price is at $1."
            toolTipLink="https://docs.arthcoin.com/arth-201/target-price-of-arth"
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
            toolTipTitle="When new ARTH is minted during an expansion phase, 2% of minted ARTH is deposited to the ecosystem fund that’ll be used purely for ecosystem development."
            toolTipLink="https://docs.arthcoin.com/arth-201/expansion-mechanics/seiongrage-distribution"
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
