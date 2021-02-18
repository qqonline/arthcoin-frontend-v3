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
import useMahaswapPrice from '../../hooks/useMahaswapPrice';

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

  return (
    <Page>
      <PageHeader
        icon={<img alt="stats" src={StastIcon} width="200px" />}
        subtitle="View information about the current ARTH protocol"
        title="Statistics"
        secondParaTitle="Next Epoch"
        secondParaDescription={
          targets.isLoading
            ? 'Loading...'
            : targets.supplyIncrease.gt(0)
            ? `Based on the 1hr TWAP price, the protocol will expand the supply by approximately ${commify(
                supplyIncrease,
              )} ARTH or ${supplyIncreasePercentage.toFixed(0)}% of the current supply.`
            : targets.debtIncrease.gt(0)
            ? `Based on the 1hr TWAP price, the protocol will contract the supply by buying back approximately ${debtIncrease} ARTH or ${debtIncreasePercentage.toFixed(
                0,
              )}% of the current supply`
            : `Based on the 1hr TWAP price, the protocol will not do anything as price is within the safe range (0.95$-1$)`
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
          /> */}
          {/* <Stat title={scalingFactor ? `x${scalingFactor}` : '-'} description="Scaling Factor" /> */}
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
          /> */}
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
    // height: 84px;
    margin: 0 ${(props) => props.theme.spacing[2]}px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    margin-bottom: 0px;
  }
`;

export default Home;
