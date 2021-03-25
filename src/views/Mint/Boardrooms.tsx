import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';

import Boardroom from './components/Vault';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '../../components/Container';
import useBasisCash from '../../hooks/useBasisCash';
import DistributionIcon from '../../assets/svg/Boardroom.svg';
import { Vaults } from '../../basis-cash/config';
import Button from '../../components/Button';
import Modal from './components/modal';
import TokenSymbol from '../../components/TokenSymbol';
import arrowDown from '../../assets/svg/arrowDown.svg'
import plus from '../../assets/svg/plus.svg'
import styled from 'styled-components';
import InfoIcon from '@material-ui/icons/Info';
import InputContainer from './components/InputContainer';

const Boardrooms: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));
  const basisCash = useBasisCash();

  const [collateralValue, setCollateralValue] = useState<number>(98.12)
  const [algorithmicValue, setAlgorithmicValue] = useState<number>(2.34)
  const [finalValue, setFinalValue] = useState<number>(100)
  const [type, setType] = useState<'Mint' | 'Redeem'>('Mint')
  const [openModal, setOpenModal] = useState<boolean>(false);
  if (!basisCash) return <div />;

  const mintTabContent = () => {
    return (
      <Grid container style={{marginTop: '24px'}}>
        <Grid item lg={6} sm={12}>
          <LeftTopCard>
            <LeftTopCardHeader>
              <ActiveTab></ActiveTab>
              <TabContainer>
                <TabText>Mint</TabText>
              </TabContainer>
              <TabContainer onClick={() => setType('Redeem')}>
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
              <PlusMinusArrow>
                <img src={plus} />
              </PlusMinusArrow>
              <InputContainer
                ILabelValue={'Enter ARTHX Share'}
                IBalanceValue={'Balance 500.00'}
                ILabelInfoValue={'How can i get it?'}
                DefaultValue= {'0.00'}
                LogoSymbol={'MAHA'}
                hasDropDown={false}
                SymbolText={'ARTHX'}
              />
              <PlusMinusArrow>
                <img src={arrowDown} />
              </PlusMinusArrow>
              <InputContainer
                ILabelValue={'You will receive'}
                IBalanceValue={'Balance 500.00'}
                ILabelInfoValue={''}
                DefaultValue= {'0.00'}
                LogoSymbol={'MAHA'}
                hasDropDown={false}
                SymbolText={'ARTH'}
              />
              <div style={{marginTop: '24px'}}>
                <OneLineInput>
                  <div style={{flex: 1}}>
                    <TextWithIcon>
                      Trading Fee
                      <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                    </TextWithIcon>
                  </div>
                  <OneLineInput>
                    <BeforeChip>1.08</BeforeChip>
                    <TagChips>ARTH/ETH</TagChips>
                  </OneLineInput>
                </OneLineInput>
                <Button text={'Confirm Mint'} size={'lg'} onClick={() => setOpenModal(true)}/>
              </div>
            </LeftTopCardContainer>
          </LeftTopCard>
        </Grid>
        <Grid item lg={5} style={{paddingRight: '24px'}}>
          <RightTopCard>
            <div style={{marginBottom: '12px'}}>
              <OneLineInput>
                <div style={{flex: 1}}>
                  <TextForInfoTitle>ARTHX Price</TextForInfoTitle>
                </div>
                <InputLabelSpanRight>$5.4</InputLabelSpanRight>
              </OneLineInput>
            </div>
            <div style={{marginBottom: '12px'}}>
              <OneLineInput>
                <div style={{flex: 1}}>
                  <TextForInfoTitle>
                    Collateral Ratio
                    <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                  </TextForInfoTitle>
                </div>
                <InputLabelSpanRight>86%</InputLabelSpanRight>
              </OneLineInput>
            </div>
            <div style={{marginBottom: '12px'}}>
              <OneLineInput>
                <div style={{flex: 1}}>
                  <TextForInfoTitle>
                    Pool Balance
                  </TextForInfoTitle>
                </div>
                <InputLabelSpanRight>154.6M</InputLabelSpanRight>
              </OneLineInput>
            </div>
            <div style={{marginBottom: '12px'}}>
              <OneLineInput>
                <div style={{flex: 1}}>
                  <TextForInfoTitle>
                    Avaiable to Mint
                  </TextForInfoTitle>
                </div>
                <InputLabelSpanRight>$54.7M</InputLabelSpanRight>
              </OneLineInput>
            </div>
            <div style={{marginBottom: '12px'}}>
              <OneLineInput>
                <div style={{flex: 1}}>
                  <TextForInfoTitle>
                    Stability Fee
                    <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                  </TextForInfoTitle>
                </div>
                <InputLabelSpanRight>2%</InputLabelSpanRight>
              </OneLineInput>
            </div>
            <div style={{marginBottom: '12px'}}>
              <OneLineInput>
                <div style={{flex: 1}}>
                  <TextForInfoTitle>
                    Trading Fee
                    <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                  </TextForInfoTitle>
                </div>
                <InputLabelSpanRight>2%</InputLabelSpanRight>
              </OneLineInput>
            </div>
          </RightTopCard>
          <RightBottomCard>
            <RightBottomCardTitle>
              Farming pools are greate way to earn higher APY by staking your $ARTH
            </RightBottomCardTitle>
            <Grid container style={{marginTop: '16px'}}>
              <Grid item lg={4}>
                <Button text={'Earn Rewards'} size={'sm'} />
              </Grid>
            </Grid>
          </RightBottomCard>
        </Grid>
      </Grid>
    )
  };

  const redeemTabContent = () => {
    return (
      <Grid container style={{marginTop: '24px'}}>
        <Grid item lg={6} style={{paddingRight: '24px'}}>
          <LeftTopCard>
            <LeftTopCardHeader>
              <TabContainer onClick={() => setType('Mint')}>
                <TabText>Mint</TabText>
              </TabContainer>
              <TabContainer>
                <ActiveTab></ActiveTab>
                <TabText>Redeem</TabText>
              </TabContainer>
            </LeftTopCardHeader>
            <LeftTopCardContainer>
              <InputContainer
                ILabelValue={'Enter Redeem Amount'}
                IBalanceValue={'Balance 500.00'}
                ILabelInfoValue={''}
                DefaultValue= {'0.00'}
                LogoSymbol={'MAHA'}
                hasDropDown={false}
                SymbolText={'ARTH'}
              />
              <PlusMinusArrow>
                <img src={arrowDown} />
              </PlusMinusArrow>
              <InputContainer
                ILabelValue={'You receive'}
                IBalanceValue={'Balance 500.00'}
                ILabelInfoValue={'How can i get it?'}
                DefaultValue= {'0.00'}
                LogoSymbol={'MAHA'}
                hasDropDown={true}
                SymbolText={'USDT'}
              />
              <PlusMinusArrow>
                <img src={plus} />
              </PlusMinusArrow>
              <InputContainer
                ILabelValue={'You receive'}
                IBalanceValue={'Balance 500.00'}
                ILabelInfoValue={''}
                DefaultValue= {'0.00'}
                LogoSymbol={'MAHA'}
                hasDropDown={false}
                SymbolText={'ARTHX'}
              />
              <div style={{marginTop: '24px'}}>
                <OneLineInput>
                  <div style={{flex: 1}}>
                    <TextWithIcon>
                      Trading Fee
                      <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                    </TextWithIcon>
                  </div>
                  <OneLineInput>
                    <BeforeChip>0.05</BeforeChip>
                    <TagChips>USDT</TagChips>
                  </OneLineInput>
                </OneLineInput>
                <OneLineInput>
                  <div style={{flex: 1}}>
                    <TextWithIcon>
                      Stability Fee
                      <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                    </TextWithIcon>
                  </div>
                  <OneLineInput>
                    <BeforeChip>0.05</BeforeChip>
                    <TagChips>MAHA</TagChips>
                  </OneLineInput>
                </OneLineInput>
                <Button text={'Redeem'} size={'lg'} onClick={() => setOpenModal(true)}/>
              </div>
            </LeftTopCardContainer>
          </LeftTopCard>
        </Grid>
        <Grid item lg={5} style={{paddingRight: '24px'}}>
          <RightTopCard>
            <div style={{marginBottom: '12px'}}>
              <OneLineInput>
                <div style={{flex: 1}}>
                  <TextForInfoTitle>ARTHX Price</TextForInfoTitle>
                </div>
                <InputLabelSpanRight>$5.4</InputLabelSpanRight>
              </OneLineInput>
            </div>
            <div style={{marginBottom: '12px'}}>
              <OneLineInput>
                <div style={{flex: 1}}>
                  <TextForInfoTitle>
                    Collateral Ratio
                    <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                  </TextForInfoTitle>
                </div>
                <InputLabelSpanRight>86%</InputLabelSpanRight>
              </OneLineInput>
            </div>
            <div style={{marginBottom: '12px'}}>
              <OneLineInput>
                <div style={{flex: 1}}>
                  <TextForInfoTitle>
                    Pool Balance
                  </TextForInfoTitle>
                </div>
                <InputLabelSpanRight>154.6M</InputLabelSpanRight>
              </OneLineInput>
            </div>
            <div style={{marginBottom: '12px'}}>
              <OneLineInput>
                <div style={{flex: 1}}>
                  <TextForInfoTitle>
                    Avaiable to Mint
                  </TextForInfoTitle>
                </div>
                <InputLabelSpanRight>$54.7M</InputLabelSpanRight>
              </OneLineInput>
            </div>
            <div style={{marginBottom: '12px'}}>
              <OneLineInput>
                <div style={{flex: 1}}>
                  <TextForInfoTitle>
                    Stability Fee
                    <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                  </TextForInfoTitle>
                </div>
                <InputLabelSpanRight>0.1%</InputLabelSpanRight>
              </OneLineInput>
            </div>
            <div style={{marginBottom: '12px'}}>
              <OneLineInput>
                <div style={{flex: 1}}>
                  <TextForInfoTitle>
                    Trading Fee
                    <InfoIcon fontSize="default" style={{ transform: 'scale(0.6)' }} />
                  </TextForInfoTitle>
                </div>
                <InputLabelSpanRight>0.1%</InputLabelSpanRight>
              </OneLineInput>
            </div>
          </RightTopCard>
          <RightBottomCard>
            <RightBottomCardTitle>
              Farming pools are greate way to earn higher APY by staking your $ARTH
            </RightBottomCardTitle>
            <Grid container style={{marginTop: '16px'}}>
              <Grid item lg={4}>
                <Button text={'Earn Rewards'} size={'sm'} />
              </Grid>
            </Grid>
          </RightBottomCard>
        </Grid>
      </Grid>
    )
  };

  const OldBalance = (
    <div style={{
      color: '#fff',
      fontSize: 14,
      backgroundColor: '#fff2', padding: 15, textAlign: 'center', borderRadius: 3, marginBottom: 15
    }}>
      <p>
        If have deposits in the old distribution contracts. Please withdraw your funds
        and deposit them into the new distribution contracts.
      </p>

      <ul>
        <li><Link style={{ color: 'aqua', textDecoration: 'underline' }} to="/distribution/v1/arth">View Old ARTH Distribution contract</Link></li>
        <li><Link style={{ color: 'aqua', textDecoration: 'underline' }} to="/distribution/v1/arthLiquidity">View Old ARTH/DAI UNI-LP Distribution contract</Link></li>
        <li><Link style={{ color: 'aqua', textDecoration: 'underline' }} to="/distribution/v1/mahaLiquidity">View Old MAHA/ETH UNI-LP Distribution contract</Link></li>
      </ul>
    </div>
  )

  return (
    <>
      <Modal
        mobile
        open={openModal}
        modalContainerStyle={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        modalTitleStyle={{
          color: 'rgba(255, 255, 255, 0.88)',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}
        modalBodyStyle={{
          background: 'linear-gradient(180deg, #48423E 0%, #373030 100%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '24px 32px',
          width: '100%',
          // height: '100%'
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
            <div style={{marginTop: 10}}/>
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
              flexDirection: 'column',
              display: 'flex',
              width: '100%',
              marginTop: '10%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
            >
              <div style={{ width: '100%', marginBottom: 10 }}>
                <Button
                  text={'Confirm Mint'}
                  // textStyles={{ color: '#F5F5F5' }}
                  size={'lg'}
                />
              </div>
              <div style={{ width: '100%', marginBottom: 10 }}>
                <Button
                  variant={'transparent'}
                  text="Cancel"
                  size={'lg'}
                // onClick={handleClose}
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
            <div style={{marginTop: 10}}/>

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
              flexDirection: 'column',
              display: 'flex',
              width: '100%',
              marginTop: '10%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
            >
              <div style={{ width: '100%', marginBottom: 10 }}>
                <Button
                  text={'Confirm Redeem'}
                  // textStyles={{ color: '#F5F5F5' }}
                  size={'lg'}
                />
              </div>
              <div style={{ width: '100%', marginBottom: 10 }}>
                <Button
                  variant={'transparent'}
                  text="Cancel"
                  size={'lg'}
                // onClick={handleClose}
                />
              </div>

            </div>
          </>
        }
      </Modal>
      <Container size="lg">
        {type === 'Mint' && mintTabContent()}
        {type === 'Redeem' && redeemTabContent()}
      </Container>
    </>
  );
};


const LeftTopCard = styled.div`
  background: linear-gradient(180deg, #48423E 0%, #373030 100%);
  border-radius: 12px;
`

const RightTopCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(21px);
  border-radius: 12px;
  padding: 24px;
`

const RightBottomCard = styled.div`
  margin-top: 24px;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(21px);
  border-radius: 12px;
  padding: 24px;
`

const RightBottomCardTitle = styled.div`
  padding: 0px;
  margin: 0px;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.88);

`

const LeftTopCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 24px;
  padding-left: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`
const LeftTopCardContainer = styled.div`
  padding: 24px 24px;

`
const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 12px;
  width: 100px;
  height: 80px;
  z-index: 1;
  cursor: pointer;
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

const PlusMinusArrow = styled.div`
  width: 100%;
  height: 32px;
  border-radius: 1.33px;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  font-size: 20px;
`

const OneLineInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
`

const TextWithIcon = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  color: rgba(255, 255, 255, 0.88);
`

const TextForInfoTitle = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: #FFFFFF;
  opacity: 0.64;
`

const BeforeChip = styled.span`
  ont-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.64);
  margin-right: 5px;
`

const TagChips = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 2px 8px;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.64);
`

const InputLabelSpanRight = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.88);
  margin-right: 5px;
`



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
