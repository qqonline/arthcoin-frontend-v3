import React, { useState } from 'react';
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
  const [selectedId, setId] = useState<number>(1)
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
            <ScrollDiv style={{ overflowX: 'scroll' }}>
              <ButtonGroupDiv>
                {headerList.map((obj) =>
                  <TextDiv
                    style={selectedId === obj.id ? {
                      background: selectedId === obj.id ? '#423B38' : 'transparent',
                    }:{}}
                    key={obj?.id}
                    onClick={() => setId(obj?.id)}
                  >
                    <Text1>
                      {obj?.name}
                    </Text1>
                    <Text2>
                      {obj?.count}
                    </Text2>
                  </TextDiv>
                )}
              </ButtonGroupDiv>
            </ScrollDiv>
            <div className="border-bottom width-100 margin-bottom-20 margin-top-10" />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {/*{!isMobile ?*/}
                {/*  <BankCardsV2 />*/}
                {/*  :*/}
                {/*  <BankCards />*/}
                {/*}*/}
                <BankCardsV2 />
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
  align-items: center;
  padding: 6px 0;
`;

const TextDiv = styled.div`
  height: 40px;
  display: inline-flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-radius: 4px;
  margin: 0px 6px;
  padding: 0px 12px;
  cursor: pointer;
  // background: grey;
  &:hover {
    background: #423B3860;
  }
`;

const ScrollDiv = styled.div`
::-webkit-scrollbar {
  height: 0px;
  background: transparent; /* make scrollbar transparent */
}
`;

const Text1 = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #FFFFFF;
  margin: 0;
`;

const Text2 = styled.p`
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
