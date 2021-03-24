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

const Boardrooms: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));
  const basisCash = useBasisCash();

  const [collateralValue, setCollateralValue] = useState<number>(98.12)
  const [algorithmicValue, setAlgorithmicValue] = useState<number>(2.34)
  const [finalValue, setFinalValue] = useState<number>(100)
  const [type, setType] = useState<'Mint' | 'Redeem'>('Redeem')
  if (!basisCash) return <div />;

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
        open={true}
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
      <PageHeader
        icon={<img alt="distribution" src={DistributionIcon} width="200px" />}
        title="ARTH/MAHA Distribution"
        subtitle="Deposit tokens and earn rewards when the protocol supply expands/contracts. You will earn ARTH rewards when the protocol expands and MAHA rewards when the protocol contracts"
      />
      <Container size="lg">
        {/* <div className="border-bottom width-100 margin-bottom-20" /> */}
        <Grid container spacing={5} justify="center" alignItems="stretch">
          <Grid container item xs={12} md={4} lg={4} xl={4}>
            <Boardroom
              vault={Vaults.arthDaiLiquidity}
            // toolTipTitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            />
          </Grid>
          <Grid container item xs={12} md={4} lg={4} xl={4}>
            <Boardroom
              vault={Vaults.arth}
            // toolTipTitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            />
          </Grid>

          <Grid container item xs={12} md={4} lg={4} xl={4}>
            <Boardroom vault={Vaults.maha} />
          </Grid>
        </Grid>

        {OldBalance}
      </Container>
    </>
  );
};


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
