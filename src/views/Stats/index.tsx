import { OverviewData } from './types';
import Container from '../../components/Container';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { BigNumber } from '@ethersproject/bignumber';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import HomeCard from './components/HomeCard';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import useCore from '../../hooks/useCore';
import usePoolBalances from '../../hooks/state/pools/usePoolBalances';
import CollateralRatio from './components/CollateralRatio';
import PieChart from './components/PieChart';
import BondingDiscount from './components/BondingDiscount';
import RewardRates from './components/RewardRates';
import FeeRates from './components/FeeRates';
import CoinsPrice from './components/CoinsPrice';
import BasicInfo from './components/BasicInfo';
import StakeBox from './components/StakeBox';
import CustomToolTip from '../../components/CustomTooltip';
import { getDisplayBalance } from '../../utils/formatBalance';
import { WalletAutoConnect } from '../../components/WalletAutoConnect';

const Home: React.FC = () => {
  const core = useCore();
  WalletAutoConnect();
  const [{ cash, bond, share }, setStats] = useState<OverviewData>({});
  const fetchStats = useCallback(async () => {
    // const [cash, bond, share] = await Promise.all([
    //   // core.getCashStat(),
    //   // core.getBondStat(),
    //   // core.getShareStat(),
    // ]);
    // // console.log('bond', bond)
    // setStats({ cash, bond, share });
  }, []);

  useEffect(() => {
    if (core) {
      fetchStats().catch((err) => console.error(err.stack));
      // @ts-ignore
    }
  }, [core, fetchStats]);
  const isMobile = useMediaQuery({ maxWidth: '600px' });

  const cashAddr = useMemo(() => core.ARTH.address, [core]);
  const shareAddr = useMemo(() => core.MAHA.address, [core]);
  const bondAddr = useMemo(() => core.ARTHX.address, [core]);

  const balances = usePoolBalances();

  const totalCollateral = balances.reduce((p, c) => p.add(c.balance), BigNumber.from(0));

  const formattedBalances = balances.map((b) => ({
    name: b.poolToken,
    amount: Number(getDisplayBalance(b.balance, 6)),
    percentage: Number(getDisplayBalance(b.balance.mul(1e8).div(totalCollateral), 6)),
  }));

  return (
    <Page>
      <GradientDiv />
      <PageHeader
        subtitle="View information about the current ARTH protocol"
        title="Analytics"
      />
      <Container size="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Card className={'custom-mahadao-box'}>
              <Grid item sm={12} md={12} lg={12} direction={'column'}>
                <Grid
                  item
                  sm={12}
                  md={12}
                  lg={12}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    // justifyContent: 'center',
                    flexDirection: isMobile ? 'column' : 'row',
                    paddingBottom: '24px',
                  }}
                >
                  <CollateralRatio />
                </Grid>
                <div className="border-bottom" />
                {/* <Grid item sm={12} md={12} lg={12}>
                  <Grid container alignItems={'center'} justify={'center'}>
                    <InfoDiv style={{ marginTop: '24px' }}>
                      Recollatearlize the protocol to receive ARTHX
                    </InfoDiv>
                    <HeaderSubtitle>
                      342.450K <HardChip>ARTHX</HardChip>{' '}
                      <TextForInfoTitle>Rewards to claim</TextForInfoTitle>
                    </HeaderSubtitle>
                    <ButtonDiv style={{ width: '100%', marginBottom: '24px' }}>
                      <IconButtons style={{ color: '#F7653B' }}>
                        <ToLink to={'/stabilize/recollateralize'}>
                          <ButtonText style={{ color: '#F7653B' }}>Recollateralize</ButtonText>
                        </ToLink>
                        <img src={arrowRight} height={18} style={{ marginLeft: 8 }} />
                      </IconButtons>
                      <div
                        style={{
                          border: '1px solid #FFFFFF',
                          height: 34,
                          marginLeft: -15,
                          opacity: 0.12,
                        }}
                      />
                      <IconButtons style={{ color: 'rgba(255, 255, 255, 0.16)' }}>
                        <ToLink to={'/stabilize/buyback'}>
                          <ButtonText style={{ color: 'rgba(255, 255, 255, 0.16)' }}>
                            Buyback
                          </ButtonText>
                        </ToLink>
                        <img src={arrowRightDisabled} height={18} style={{ marginLeft: 8 }} />
                      </IconButtons>
                    </ButtonDiv>
                  </Grid>
                </Grid> */}
                <div className="border-bottom width-100" />
                <Grid item sm={12} md={12} lg={12} style={{ padding: '24px 0 0 0' }}>
                  <TitleString style={{ textAlign: isMobile ? 'center' : 'left' }}>
                    Collateral Breakdown
                    <CustomToolTip toolTipText={'loreum ipsum'} />
                  </TitleString>
                  <Grid container style={{}} direction={isMobile ? 'column' : 'row'}>
                    <Grid
                      item
                      sm={12}
                      md={12}
                      lg={12}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        // justifyContent: 'center',
                        flexDirection: isMobile ? 'column' : 'row',
                      }}
                    >
                      <Grid item sm={12} md={6} lg={6}>
                        <PieChart balances={formattedBalances} />
                      </Grid>
                      <Grid item style={{ width: '100%' }} sm={12} md={6} lg={6}>
                        <PercentCard>
                          {formattedBalances.map((b) => (
                            <PercentCardInfo>
                              <PercentCardLabel>
                                <div
                                  style={{
                                    height: 14,
                                    width: 14,
                                    background: '#D74D26',
                                    borderRadius: 7,
                                  }}
                                />
                                <OpacitySpan>{b.name}</OpacitySpan>
                              </PercentCardLabel>
                              <PercentCardValue>
                                {Math.floor(b.amount)} - {Math.floor(b.percentage)}%
                              </PercentCardValue>
                            </PercentCardInfo>
                          ))}
                        </PercentCard>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CoinsPrice />
            {/* <BasicInfo /> */}
            <StakeBox />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: '8px' }}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <BondingDiscount stats />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <RewardRates />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <FeeRates />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: '8px' }}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <HomeCard
              title="MAHA"
              uniswapInputAddress={core.MAHA.address}
              symbol="MAHA"
              // liquidity="$87,783,601"
              address={shareAddr}
              stat={share}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <HomeCard
              title="ARTH"
              symbol="ARTH"
              // liquidity="$2,462,492"
              uniswapInputAddress={core.ARTH.address}
              address={cashAddr}
              stat={cash}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <HomeCard
              title="ARTHX"
              symbol="ARTHX"
              // liquidity={'$2,462,492'}
              uniswapInputAddress={core.ARTHX.address}
              address={bondAddr}
              stat={bond}
            />
          </Grid>
        </Grid>
        {/* <FaqTitle>FAQs</FaqTitle> */}
        {/* {FaqData && FaqData.map((eachFaq) => <FAQCard key={eachFaq.question} {...eachFaq} />)} */}
      </Container>
    </Page>
  );
};

const ToLink = styled(Link)`
  z-index: 1;
  colo
`;

const GradientDiv = styled.div`
  background: linear-gradient(180deg, #2a2827 0%, rgba(42, 40, 39, 0) 100%);
  height: 270px;
  position: absolute;
  // border: 1px solid;
  width: 100%;
  z-index: -50;
`;

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
const Card = styled.div``;
const PercentCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content space-between;
  width: 100%;
  align-items: center;
  height: fit-content;
  // border: 0.5px solid;
`;

const PercentCardInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content space-between;
  width: 100%;
  margin: 6px;
`;

const InfoDiv = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.64);
  margin: 12px 0px 0px 0px;
  text-align: center;
`;

const PercentCardLabel = styled.div`
  display: flex;
  flex-direction: row;
  // justify-content space-between;
  width: fit-content;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: #ffffff;
  align-items: center;
`;

const OpacitySpan = styled.span`
  opacity: 0.64;
  padding: 0 8px;
`;

const PercentCardValue = styled.div`
  display: flex;
  flex-direction: row;
  // justify-content space-between;
  // width: 100%;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
`;

const TextForInfoTitle = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: rgba(255, 255, 255, 0.88);
  opacity: 0.64;
  text-align: center;
`;

const PercentNumber = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  text-align: right;
  display: flex;
  align-items: center;
  flex: 1;
  color: rgba(255, 255, 255, 0.88);
`;

const HeaderSubtitle = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.88);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  margin: 12px 0px 22px 0px;
`;

const HardChip = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 2px 8px;
  font-family: Inter;
  font-style: normal;
  color: rgba(255, 255, 255, 0.64);
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin-left: 10px;
  margin-right: 10px;
`;

const ButtonDiv = styled.div`
  // height: 10px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
`;

const IconButtons = styled.div`
  width: fit-content;
  display: flex;
  // justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const ButtonText = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
`;

const TitleString = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: #ffffff;
  opacity: 0.88;
`;
export default Home;
