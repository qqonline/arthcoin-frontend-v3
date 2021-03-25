import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CardWithTitle from '../../components/CardWithTitle';
import PageHeader from '../../components/PageHeader';
import Container from '../../components/Container';
import useBasisCash from '../../hooks/useBasisCash';
import Boardroom from './components/VaultRow';
import Grid from '@material-ui/core/Grid';
import InfoIcon from '@material-ui/icons/Info';
import { Vaults } from '../../basis-cash/config';
import Button from '../../components/Button';
import Modal from './components/modal';
import TokenSymbol from '../../components/TokenSymbol';
import arrowDown from '../../assets/svg/arrowDown.svg'
import plus from '../../assets/svg/plus.svg'
import InputContainer from './components/InputContainer';

const Boardrooms: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));
  const basisCash = useBasisCash();
  const [collateralValue, setCollateralValue] = useState<number>(98.12)
  const [algorithmicValue, setAlgorithmicValue] = useState<number>(2.34)
  const [finalValue, setFinalValue] = useState<number>(100)
  const [type, setType] = useState<'Mint' | 'Redeem'>('Redeem')
  // const isLaunched = Date.now() >= config.boardroomLaunchesAt.getTime();
  if (!basisCash) return <div />;

  return (
    <>
      <Modal
        open={true}
        modalTitleStyle={{
          color: 'rgba(255, 255, 255, 0.88)',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}
        modalContainerStyle={{
          width: '400px',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        modalBodyStyle={{
          background: 'linear-gradient(180deg, #48423E 0%, #373030 100%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '24px 32px'
        }}
        title={`Confirm ${type} ARTH`}
      >
        {type === 'Mint' ?
          <>
            <InfoDiv>
              <InfoTitle>
                Collateral : {collateralValue}
              </InfoTitle>
              <CurrencyTag>
                <TokenSymbol symbol={'USDT'} size={20} />
                <div style={{ marginInline: 5 }}>USDT</div>
              </CurrencyTag>
            </InfoDiv>
            <div style={{
              width: '100%',
              height: '32px',
              borderRadius: '1.33px',
              color: '#ffffff',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              fontSize: 20
            }}>
              <img src={plus} style={{ color: 'white' }} />
            </div>
            <InfoDiv>
              <InfoTitle>
                Algorithmic : {algorithmicValue}
              </InfoTitle>
              <CurrencyTag>
                <TokenSymbol symbol={'ARTH'} size={20} />
                <div style={{ marginInline: 5 }}>ARTHX</div>
              </CurrencyTag>
            </InfoDiv>
            <div style={{
              width: '100%',
              height: '32px',
              borderRadius: '1.33px',
              color: '#ffffff',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              fontSize: 20
            }}>
              <img src={arrowDown} />
            </div>
            <InfoDiv>
              <InfoTitle>
                {`  ` + finalValue}
              </InfoTitle>
              <CurrencyTag>
                <TokenSymbol symbol={'ARTH'} size={20} />
                <div style={{ marginInline: 5 }}>ARTH</div>
              </CurrencyTag>
            </InfoDiv>
            <div style={{ marginTop: 10 }} />

            <LabelDiv>
              <LabelInfo>Price</LabelInfo>
              <LabelInfoData>
                1.00
            <LabelInfoDataChip>
                  USDT
            </LabelInfoDataChip>
            /
            <LabelInfoDataChip>
                  ARTH
            </LabelInfoDataChip>
              </LabelInfoData>
            </LabelDiv>
            <LabelDiv>
              <LabelInfo>
                Minting Fee
            <InfoIcon fontSize="small" style={{ transform: 'scale(0.6)' }} />
              </LabelInfo>
              <LabelInfoData>
                1.00
            <LabelInfoDataChip>
                  USDT
            </LabelInfoDataChip>
              </LabelInfoData>
            </LabelDiv>
            <div style={{
              flexDirection: 'row',
              display: 'flex',
              width: '100%',
              marginTop: '10%',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8
            }}
            >
              <div style={{ flex: 1, marginRight: 10 }}>
                <Button
                  variant={'transparent'}
                  text="Cancel"
                  size={'lg'}
                // onClick={handleClose}
                />
              </div>
              <div style={{ flex: 1, marginLeft: 10 }}>
                <Button
                  text={'Confirm Mint'}
                  // textStyles={{ color: '#F5F5F5' }}
                  size={'lg'}
                />
              </div>
            </div>

          </> :
          <>
            <InfoDiv>
              <InfoTitle>
                {`  ` + finalValue}
              </InfoTitle>
              <CurrencyTag>
                <TokenSymbol symbol={'ARTH'} size={20} />
                <div style={{ marginInline: 5 }}>ARTHX</div>
              </CurrencyTag>
            </InfoDiv>
            <div style={{
              width: '100%',
              height: '32px',
              borderRadius: '1.33px',
              color: '#ffffff',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              fontSize: 20
            }}>
              <img src={arrowDown} />
            </div>

            <InfoDiv>
              <InfoTitle>
                Collateral : {collateralValue}
              </InfoTitle>
              <CurrencyTag>
                <TokenSymbol symbol={'USDT'} size={20} />
                <div style={{ marginInline: 5 }}>USDT</div>
              </CurrencyTag>
            </InfoDiv>

            <div style={{
              width: '100%',
              height: '32px',
              borderRadius: '1.33px',
              color: '#ffffff',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              fontSize: 20
            }}>
              <img src={plus} style={{ color: 'white' }} />
            </div>
            <InfoDiv>
              <InfoTitle>
                Algorithmic : {algorithmicValue}
              </InfoTitle>
              <CurrencyTag>
                <TokenSymbol symbol={'ARTH'} size={20} />
                <div style={{ marginInline: 5 }}>ARTHX</div>
              </CurrencyTag>
            </InfoDiv>
            <div style={{ marginTop: 10 }} />

            <LabelDiv>
              <LabelInfo>Price</LabelInfo>
              <LabelInfoData>
                1.00
          <LabelInfoDataChip>
                  USDT
          </LabelInfoDataChip>
          /
          <LabelInfoDataChip>
                  ARTH
          </LabelInfoDataChip>
              </LabelInfoData>
            </LabelDiv>
            <LabelDiv>
              <LabelInfo>
                Redemption Fee
          <InfoIcon fontSize="small" style={{ transform: 'scale(0.6)' }} />
              </LabelInfo>
              <LabelInfoData>
                1.00
          <LabelInfoDataChip>
                  USDT
          </LabelInfoDataChip>
              </LabelInfoData>
            </LabelDiv>

            <div style={{
              flexDirection: 'row',
              display: 'flex',
              width: '100%',
              marginTop: '10%',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8
            }}
            >
              <div style={{ flex: 1, width: '50%', marginRight: 10 }}>
                <Button
                  variant={'transparent'}
                  text="Cancel"
                  size={'lg'}
                // onClick={handleClose}
                />
              </div>
              <div style={{ width: '50%', marginLeft: 10 }}>
                <Button
                  text={'Confirm Redeem'}
                  // textStyles={{ color: '#F5F5F5' }}
                  size={'lg'}
                />
              </div>
            </div>

          </>
        }
      </Modal>
      <PageHeader

        title="ARTH Distribution"
        subtitle="Bond/Stake tokens and earn inflationary rewards when the ARTH supply expands. Rewards are redeemable only if the protocol is in expansion mode."
      />
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
const StyledTableHeaderTextRight = styled.h6`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[600]};
  margin: 10px 10px;
`;

const LabelDiv = styled.div`
// background: rgba(255, 255, 255, 0.08);
// border-radius: 6px;
// padding: 6px 4px;
height: fit-content;
justify-content: space-between;
display: flex;
align-items: center;
// margin: 5px 0px 0px 0px;
`;

const LabelInfo = styled.div`
// background: rgba(255, 255, 255, 0.08);
// border-radius: 6px;
padding: 3px 4px;
height: fit-content;
// justify-content: space-between;
display: flex;
align-items: center;
font-family: Inter;
font-style: normal;
font-weight: 300;
font-size: 12px;
line-height: 130%;
color: rgba(255, 255, 255, 0.88);
`;

const LabelInfoData = styled.div`
// background: yellow;
padding: 3px 4px;
// height: fit-content;
width: fit-content;
justify-content: space-between;
display: flex;
flex-direction: row;
align-items: center;
font-family: Inter;
font-style: normal;
font-weight: 300;
font-size: 12px;
line-height: 130%;
color: rgba(255, 255, 255, 0.88);
`;

const LabelInfoDataChip = styled.div`
background: rgba(255, 255, 255, 0.08);
border-radius: 4px;
padding: 3px 4px;
height: fit-content;
// justify-content: space-between;
display: flex;
align-items: center;
font-family: Inter;
font-style: normal;
font-weight: 300;
font-size: 12px;
line-height: 130%;
margin: 0px 2px;
color: rgba(255, 255, 255, 0.64);
`;

const InfoDiv = styled.div`
background: rgba(255, 255, 255, 0.08);
border-radius: 6px;
padding: 6px 4px;
height: fit-content;
justify-content: space-between;
display: flex;
align-items: center;
`;

const InfoTitle = styled.div`
padding: 6px 4px;
height: fit-content;
display: flex;
align-items: center;
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
color: rgba(255, 255, 255, 0.88);
`;

const CurrencyTag = styled.div`
padding: 6px 4px;
width: 85px;
justify-content: space-around;
height: fit-content;
display: flex;
align-items: center;
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
color: rgba(255, 255, 255, 0.64);
`;
export default Boardrooms;
