import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import TokenSymbol from '../../../components/TokenSymbol';
import InfoIcon from '@material-ui/icons/Info';
import farmingSVG from '../../../assets/svg/farming.svg';
import { StakingContract } from '../../../basis-cash';

interface IProps {
  pool: StakingContract;
  onDepositClick: () => void;
  onWithdrawClick: () => void;
  onClaimClick: () => void;
}

export default (props: IProps) => {
  // const [open, setOpen] = useState<boolean>(props?.deposited);
  // useEffect(() => {
  //   setOpen(props?.deposited)
  // }, [props])
  // const logos = [bank.earnTokenName];
  // if (bank.depositTokenName === 'ARTH_DAI-UNI-LPv2') logos.push('ARTH', 'DAI');
  // else if (bank.depositTokenName === 'ARTH_DAI-MAHA-LPv1') logos.push('ARTH', 'DAI');
  // else if (bank.depositTokenName === 'MAHA_ETH-UNI-LPv2') logos.push('MAHA', 'ETH');
  // else if (bank.depositTokenName === 'ARTH_DAI-MAHA-LP') logos.push('ARTH', 'DAI');
  // else logos.push(bank.depositTokenName);
  return (
    <StyledCardWrapper>
      <CardIcon>
        <div style={{ zIndex: 15, background: '#2A2827', borderRadius: 36 }}>
          <img src={farmingSVG} height={32} />
        </div>
      </CardIcon>
      <Card>
        <CardContent>
          <StyledContent>
            <div style={{ marginTop: 10 }} />
            <CardHeaderDiv>
              <div
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <div style={{ zIndex: 15, background: '#2A2827', borderRadius: 36 }}>
                  <TokenSymbol
                    symbol={props.pool.depositTokenSymbols[0]}
                    size={44}
                    style={{}}
                  />
                </div>
                <div
                  style={{
                    // zIndex: 4,
                    position: 'absolute',
                    left: 30,
                    background: '#2A2827',
                    borderRadius: 36,
                  }}
                >
                  <TokenSymbol
                    symbol={props.pool.depositTokenSymbols[1]}
                    size={44}
                    style={{}}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 40 }}>
                <StyledTitle>{props.pool.depositTokenSymbols.join('-')}</StyledTitle>
                <StyledSubTitle>Add Liquidity</StyledSubTitle>
              </div>
            </CardHeaderDiv>
            <Grid
              container
              style={{ display: 'flex', width: '100%', height: 'fit-content', marginTop: 20 }}
            >
              <Grid
                item
                xs={12}
                direction={'row'}
                justify={'space-between'}
                style={{ display: 'flex', marginTop: 5 }}
              >
                <DescriptionDiv>
                  Wallet
                  <InfoIcon style={{ marginLeft: 5 }} fontSize={'small'} />
                </DescriptionDiv>
                <div style={{ flexDirection: 'column', display: 'flex' }}>
                  <MainSpan>{/* {props?.walletValue} {props?.walletUnit} */}</MainSpan>
                  {/* <SecondSpan>{'100'}</SecondSpan> */}
                </div>
              </Grid>
              {/* <Grid
                item
                xs={12}
                direction={'row'}
                justify={'space-between'}
                style={{ display: 'flex', marginTop: 15 }}
              >
                <DescriptionDiv>
                  APY
                  <InfoIcon style={{ marginLeft: 5 }} fontSize={'small'} />
                </DescriptionDiv>
                <div style={{ flexDirection: 'column', display: 'flex' }}>
                  <MainSpan>{props?.apy}</MainSpan>
                </div>
              </Grid> */}
            </Grid>
            <ButtonContainer>
              <div style={{ marginTop: 15 }}>
                <Button size={'sm'} text={'Deposit'} onClick={props.onDepositClick} />
              </div>
            </ButtonContainer>
          </StyledContent>
        </CardContent>
        {false ? (
          <OpenableDiv>
            <InfoDiv>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  textAlign: 'center',
                  alignSelf: 'center',
                }}
              >
                <InfoDivLeftSpan>Your Locked stake:</InfoDivLeftSpan>
                {/* <InfoDivRightSpan>{props?.lockedStake}</InfoDivRightSpan> */}
              </div>
              <Withdraw onClick={props.onWithdrawClick}>Withdraw</Withdraw>
            </InfoDiv>
            <InfoDiv>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  textAlign: 'center',
                  alignSelf: 'center',
                }}
              >
                <InfoDivLeftSpan>Earned:</InfoDivLeftSpan>
                {/* <InfoDivRightSpan>{props?.earned}</InfoDivRightSpan> */}
              </div>
              <Withdraw onClick={props.onClaimClick}>Claim MAHA</Withdraw>
            </InfoDiv>
          </OpenableDiv>
        ) : (
          <></>
        )}
      </Card>
    </StyledCardWrapper>
  );
};

const DescriptionDiv = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.32);
  flex-direction: row;
`;

const MainSpan = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: right;
  color: #ffffff;
  opacity: 0.88;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  flex-direction: column;
  //   height:
`;

const OpenableDiv = styled.div`
  background: #423b38;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-sizing: border-box;
  border-radius: 0px 0px 12px 12px;
  display: flex;
  width: 100%;
  flex-direction: column;
  text-align: center;
  // align-items: center;
  justify-content: center;
  // transform: matrix(1, 0, 0, -1, 0, 0);
  padding: 20px 0px;
`;

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px 0px 0px;
  // padding:
  text-align: center;
  align-items: center;
`;

const Withdraw = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #ff7f57;
  margin: 8px 0px 0px 0px;
`;

const InfoDivLeftSpan = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 140%;
  text-align: center;
  color: rgba(255, 255, 255, 0.64);
`;

const InfoDivRightSpan = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.88);
`;

const StyledCardWrapper = styled.div`
  display: flex;
  margin-bottom: 24px;
  // max-width: 500px;
  width: 100%;
  position: relative;
`;

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  justify-content: space-between;
  // background: red
`;

const StyledInfoSlots = styled.div`
  display: flex;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
`;
const LockinDiv = styled.div`
  display: flex;
  text-align: center;
  padding-bottom: 3px;
  padding-top: 35px;
`;
const StyledInfoSlot = styled.div`
  padding-left: 5px;
  padding-right: 5px;
`;

const SlotTitle = styled.div`
  color: #fff;
  font-weight: 300;
  font-size: 16px;
`;
const PercentageTilte = styled.span`
  text-align: center;
  font-weight: 300;
  font-size: 16px;
  color: #ffffff;
`;
const BoldText = styled.span`
  font-weight: 600;
  font-size: 18px;
  margin-right: 5px;
`;
const PercentageContainer = styled.div`
  background: rgba(255, 255, 255, 0.16);
  border-radius: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px 15px;
`;

const StyledTitle = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  opacity: 0.88;
`;

const CardHeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  // background: grey;
`;

const CardIcon = styled.div`
  // display: flex;
  // flex-direction: row;
  // align-items: center;
  // background: grey;
  position: absolute;
  margin: -16px 0px 0px 0px;
  left: 45%;
`;

const DiscountDivContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  // background: yellow;
  border-radius: 8px;
  width: 100%;
  padding: 0px 5px 10px 5px;
`;

const DiscountDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  text-align: center;
  font-size: 12px;
  flex: 0.9;
  font-weight: 300;
  color: #ffffff;
  padding: 10px 15px 10px 15px;
  margin: 0px 3px 0px 3px;
  min-width: 30%;
  height: 45px;
  justify-content: center;
`;

const TitleText = styled.div`
  font-size: 12px;
  // margin-right: 5px;
  font-weight: bold;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  // line-height: 20px;
  text-align: center;
  align-items: center;
  color: #ffffff;
`;

const StyledSubTitle = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 140%;
  color: #ff7f57;
  opacity: 0.88;
`;
