import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Container from '../../components/Container';
import BankPage from '../Bank';
import BankCardsV2 from './BankCardsV2';
import StakingIcon from '../../assets/svg/Staking.svg';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { useMediaQuery } from 'react-responsive';
import { MobileFarm } from './MobileFarm';
import { ButtonGroup } from 'react-bootstrap';

const Banks: React.FC = () => {
  const { path } = useRouteMatch();
  const isMobile = useMediaQuery({ 'maxWidth': '600px' })
  let headerList = [
    {
      id: 1,
      name: 'All',
      count: 25
    },
    {
      id: 2,
      name: 'MAHA Farming',
      count: 25
    },
    {
      id: 3,
      name: 'Yearn Finance',
      count: 25
    },
    {
      id: 4,
      name: 'Cream Finance',
      count: 25
    },
    {
      id: 5,
      name: 'Pickle Finance',
      count: 25
    },
    {
      id: 6,
      name: 'Sushiswap',
      count: 25
    },
    {
      id: 7,
      name: 'Uniswap',
      count: 25
    },
  ]

  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <PageHeader
            title="Farming"
            subtitle="Earn MAHA by providing liquidity."
            learnMoreLink="#"
          />
          <Container size="lg">
            <div style={{overflowX: 'scroll'}}>
              <ButtonGroupDiv>
                {headerList.map((obj) =>
                  <TextDiv key={obj?.id}>
                    <Text1>
                      {obj?.name}
                    </Text1>
                    <Text2>
                      {obj?.count}
                    </Text2>
                  </TextDiv>
                )}
              </ButtonGroupDiv>
            </div>
            <div className="border-bottom width-100 margin-bottom-20 margin-top-10" />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {/*{!isMobile ?*/}
                {/*  <BankCardsV2 />*/}
                {/*  :*/}
                {/*  <BankCards />*/}
                {/*}*/}
                <BankCardsV2/>
              </Grid>
            </Grid>
          </Container>
        </Route>
        <Route path={`${path}/:bankId`}>
          <BankPage />
        </Route>
      </Page>
    </Switch>
  );
};

const ButtonGroupDiv = styled.div`
  background: #2A2827;
  border-radius: 4px;
  // overflow-x: scroll;
  display: flex;
  flex-direction: row;
  width: fit-content;
`;

const TextDiv = styled.div`
  height: 52px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: fit-content;
  margin: 0px 6px;
  padding: 0px 12px;
  // background: grey;
`;

const Text1 = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #FFFFFF;
`;

const Text2 = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 2px 5px;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  color: #FFFFFF;
  margin: 0px 5px;
`;
export default Banks;
