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
        <CardWithTitle title="Bonding Pools">
          <Grid container>
            <Grid container item direction="row" justify="space-between" style={{ padding: 10 }}>
              <Grid item xs={12} lg={6}>
                <StyledTableHeaderTextLeft>PAIR</StyledTableHeaderTextLeft>
              </Grid>
              {/* <Grid item lg={2}>
                <StyledTableHeaderTextCenter>POOL</StyledTableHeaderTextCenter>
              </Grid> */}
              <Grid item lg={2}>
                <StyledTableHeaderTextRight>Seigniorage Supply</StyledTableHeaderTextRight>
              </Grid>
              {/* <Grid item lg={2}>
                <StyledTableHeaderText>APY</StyledTableHeaderText>
              </Grid> */}
              <Grid item lg={2}>
                <StyledTableHeaderTextRight>
                  Withdrawal Period
                  <InfoIcon fontSize="small" style={{ transform: 'scale(0.6)' }} />
                </StyledTableHeaderTextRight>
              </Grid>
            </Grid>

            <Grid container item direction="column" justify="space-around">
              {/* <Boardroom boardroom={"arthDai"}/>
              <Boardroom boardroom={"arth"}/>
              <Boardroom boardroom={"maha"}/> */}
              <Boardroom vault={Vaults.arthDaiLiquidity} />
              <Boardroom vault={Vaults.arthEthLiquidity} />
              <Boardroom vault={Vaults.arth} />
              <Boardroom vault={Vaults.maha} />
            </Grid>
          </Grid>
        </CardWithTitle>
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

const StyledTableHeaderTextLeft = styled.h6`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[600]};
  margin: 10px 40px;
`;

const StyledTableHeaderText = styled.h6`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[600]};
  margin: 10px 30px;
`;

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
