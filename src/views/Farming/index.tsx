import React, { useState } from 'react';

import PageHeader from '../../components/PageHeader';
import Container from '../../components/Container';
// import BankPage from '../Bank';
// import BankCardsV2 from './BankCardsV2';

import styled from 'styled-components';
import { Grid } from '@material-ui/core';

const Banks: React.FC = () => {
  const [selectedId, setId] = useState<number>(1);
  let headerList = [
    {
      id: 1,
      name: 'All',
      count: 6,
    },
    {
      id: 2,
      name: 'ARTH Staking',
      count: 3,
    },
    {
      id: 3,
      name: 'ARTHX Staking',
      count: 3,
    },
  ];

  return (
    <>
      <GradientDiv />
      <PageHeader
        title="Farming"
        subtitle="Earn MAHA by providing liquidity."
        // learnMoreLink="#"
      />
      <Container size="lg">
        <ScrollDiv style={{ overflowX: 'scroll' }}>
          <ButtonGroupDiv>
            {headerList.map((obj) => (
              <TextDiv
                style={
                  selectedId === obj.id
                    ? {
                        background: selectedId === obj.id ? '#423B38' : 'transparent',
                      }
                    : {}
                }
                key={obj?.id}
                onClick={() => setId(obj?.id)}
              >
                <Text1>{obj?.name}</Text1>
                <Text2>{obj?.count}</Text2>
              </TextDiv>
            ))}
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
            {/* <BankCardsV2 /> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const GradientDiv = styled.div`
  background: linear-gradient(180deg, #2a2827 0%, rgba(42, 40, 39, 0) 100%);
  height: 270px;
  position: absolute;
  width: 100rem;
  z-index: -5;
`;

const ButtonGroupDiv = styled.div`
  background: #2a2827;
  border-radius: 4px;
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
  &:hover {
    background: #423b3860;
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
  color: #ffffff;
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
  color: #ffffff;
  margin: 0px 5px;
`;
export default Banks;
