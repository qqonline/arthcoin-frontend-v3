import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Container from '../../components/Container';
import StakingCard from './StakingCard';
import Bank from '../Bank';
import BankCards from './BankCards';
import StakingIcon from '../../assets/svg/Staking.svg';
import RSRIcon from '../../assets/img/RSR.webp';
import COMPIcon from '../../assets/img/Staking/COMP.webp';
import DOTIcon from '../../assets/img/Staking/DOT.webp';
import CURVEIcon from '../../assets/img/Staking/CURVE.webp';
import ESDIcon from '../../assets/img/Staking/ESD.webp';
import FRAIcon from '../../assets/img/Staking/FRAX SHARE.webp';
import MaticIcon from '../../assets/img/Staking/Matic.webp';
import SUSHIIcon from '../../assets/img/Staking/SUSHI.webp';
import YFIIcon from '../../assets/img/Staking/YFI.webp';
const stakeCardData = [
  {
    title: 'MAHA Stakers',
    logo: [RSRIcon, COMPIcon, DOTIcon],
    toolTipDesciption:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    appyPercentage: '10',
    poolSize: '165,518',
    percentage: 10,
    buttonText: 'Stake Now',
  },
  {
    title: 'MahaDAO ($MAHA)',
    toolTipDesciption:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    logo: [RSRIcon],
    appyPercentage: '30',
    poolSize: 'No limit',
    percentage: 12,
    buttonText: 'Stake Now',
  },
  {
    title: '$MAHA ETH LP',
    logo: [RSRIcon],
    toolTipDesciption:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    appyPercentage: '30',
    poolSize: 'No limit',
    percentage: 8,
    buttonText: 'Stake Now',
  },
  {
    title: 'Matic Network ($MATIC)',
    logo: [MaticIcon],
    appyPercentage: '2.50',
    poolSize: '41,666,667',
    percentage: 5,
    buttonText: 'Stake Now',
  },
  {
    title: 'Yearn.Finance ($FYI)',
    logo: [YFIIcon],
    appyPercentage: '2.50',
    poolSize: '455',
    percentage: 5,
    buttonText: 'Stake Now',
  },
  {
    title: 'Compound Finance ($COMP)',
    logo: [COMPIcon],
    appyPercentage: '2.50',
    poolSize: '80,397',
    percentage: 5,
    buttonText: 'Stake Now',
  },
  {
    title: 'Curve Finance (CRV)',
    logo: [CURVEIcon],
    appyPercentage: '2.50',
    poolSize: '961,539',
    toolTipDesciption:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    percentage: 5,
    buttonText: 'Stake Now',
  },
  {
    title: 'MakerDAO ($MKR)',
    logo: [RSRIcon],
    appyPercentage: '2.50',
    poolSize: '8,334',
    percentage: 5,
    buttonText: 'Stake Now',
  },
  {
    title: 'Reserve Protocol ($RSR)',
    logo: [RSRIcon],
    appyPercentage: '2.50',
    poolSize: '416,666,667',
    percentage: 5,
    buttonText: 'Stake Now',
  },
  {
    title: 'Dollar Prot Share (PROT)',
    logo: [RSRIcon],
    appyPercentage: '2.50',
    poolSize: '21,551,725',
    percentage: 5,
    buttonText: 'Stake Now',
  },
  {
    title: 'Basis Share ($BAS)',
    logo: [RSRIcon],
    appyPercentage: '2.50',
    poolSize: '84,460',
    percentage: 5,
    buttonText: 'Stake Now',
  },
  {
    title: 'Polkadot ($DOT)',
    logo: [DOTIcon],
    appyPercentage: '10',
    poolSize: '165,518',
    percentage: 5,
    buttonText: 'Stake Now',
  },
  {
    title: 'Empty Set Dollar ($ESD)',
    logo: [ESDIcon],
    appyPercentage: '2.50',
    poolSize: '19,230,770',
    percentage: 5,
    buttonText: 'Stake Now',
  },
  {
    title: 'Dynamic Set Dollar ($DSD)',
    logo: [RSRIcon],
    appyPercentage: '2.50',
    poolSize: '19,531,250',
    percentage: 5,
    buttonText: 'Stake Now',
  },
  {
    title: 'Frax ($FRAX)',
    logo: [FRAIcon],
    appyPercentage: '2.50',
    poolSize: '901,226',
    percentage: 5,
    buttonText: 'Stake Now',
  },
  {
    title: 'SushiSwap ($SUSHI)',
    logo: [SUSHIIcon],
    appyPercentage: '2.50',
    poolSize: '3,881,988',
    percentage: 5,
    buttonText: 'Stake Now',
  },
];
const Banks: React.FC = () => {
  const { path } = useRouteMatch();
  console.log('path is ', path);
  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <PageHeader
            icon={<img alt="staking" src={StakingIcon} width="200px" />}
            title="Pick a Staking Pool"
            subtitle="Earn ARTH by providing liquidity"
          />
          <BankCards />
          <Container size="lg">
            <div className="border-bottom width-100 margin-bottom-20" />
            <Grid container spacing={5} justify="center" alignItems="stretch">
              {stakeCardData &&
                stakeCardData.map((eachStake) => (
                  <Grid container item xs={12} md={6} lg={4} xl={4}>
                    <StakingCard {...eachStake} />
                  </Grid>
                ))}
            </Grid>
          </Container>
        </Route>
        <Route path={`${path}/:bankId`}>
          <Bank />
        </Route>
      </Page>
    </Switch>
  );
};

export default Banks;
