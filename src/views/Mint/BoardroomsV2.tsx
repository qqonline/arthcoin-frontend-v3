import React, { useEffect } from 'react';
import styled from 'styled-components';
import CardWithTitle from '../../components/CardWithTitle';
import PageHeader from '../../components/PageHeader';
import Container from '../../components/Container';
import useBasisCash from '../../hooks/useBasisCash';
import Boardroom from './components/VaultRow';
import Grid from '@material-ui/core/Grid';
import InfoIcon from '@material-ui/icons/Info';
import { Vaults } from '../../basis-cash/config';
import InputContainer from './components/InputContainer';

const Boardrooms: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));
  const basisCash = useBasisCash();


  // const isLaunched = Date.now() >= config.boardroomLaunchesAt.getTime();
  if (!basisCash) return <div />;

  return (
    <>
      <Container size="lg">
        <Grid container style={{marginTop: '24px'}}>
          <Grid item lg={6} style={{paddingRight: '24px'}}>
            <LeftTopCard>
              <LeftTopCardHeader>
                <ActiveTab></ActiveTab>
                <TabContainer>
                  <TabText>Mint</TabText>
                </TabContainer>
                <TabContainer>
                  <TabText>Redeem</TabText>
                </TabContainer>
              </LeftTopCardHeader>
              <LeftTopCardContainer>
                <InputContainer
                  ILabelValue={'Enter Collateral'}
                  IBalanceValue={'Balance 500.00'}
                  ILabelInfoValue={''}
                  DefaultValue= {'0.00'}
                  LogoSymbol={'MAHA'}
                  hasDropDown={true}
                  SymbolText={'USDT'}
                />
                <InputContainer
                  ILabelValue={'Enter ARTHX Share'}
                  IBalanceValue={'Balance 500.00'}
                  ILabelInfoValue={'How can i get it?'}
                  DefaultValue= {'0.00'}
                  LogoSymbol={'MAHA'}
                  hasDropDown={false}
                  SymbolText={'ARTHX'}
                />
                <InputContainer
                  ILabelValue={'You will receive'}
                  IBalanceValue={'Balance 500.00'}
                  ILabelInfoValue={''}
                  DefaultValue= {'0.00'}
                  LogoSymbol={'MAHA'}
                  hasDropDown={false}
                  SymbolText={'ARTH'}
                />
              </LeftTopCardContainer>
            </LeftTopCard>
          </Grid>
          <Grid item lg={5} style={{paddingRight: '24px'}}>
            <RightTopCard>

            </RightTopCard>
          </Grid>

        </Grid>

      </Container>
    </>
  );
};


const StyledTableHeaderTextCenter = styled.h6`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[600]};
  margin: 10px 30px;
  text-align: center;
`;

const LeftTopCard = styled.div`
  min-height: 50vh;
  background: linear-gradient(180deg, #48423E 0%, #373030 100%);
  border-radius: 12px;
`

const RightTopCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(21px);
  border-radius: 12px;
  min-height: 50vh;
`

const LeftTopCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 32px;
  padding-left: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`
const LeftTopCardContainer = styled.div`
  padding: 24px 32px;
  
`
const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 12px;
  width: 100px;
  height: 80px;
  z-index: 1;
`

const TabText = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.88);
`

const ActiveTab = styled.div`
  position: absolute;
  width: 100px;
  padding: 32px 12px;
  background: linear-gradient(180deg, rgba(244, 127, 87, 0) 0%, #FD565620);
  height: 80px;
  z-index: 0;
  border-bottom: 2px solid #FD5656;
`
export default Boardrooms;
