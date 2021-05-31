import React, { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Countdown from 'react-countdown';
import { useWallet } from 'use-wallet';
import { BigNumber } from '@ethersproject/bignumber';
import CountUp from 'react-countup';

import config from '../../../config';
import TokenSymbol from '../../../components/TokenSymbol';
import Button from '../../../components/Button';
import { StakingContract } from '../../../basis-cash';
import useCore from '../../../hooks/useCore';
import useTokenBalance from '../../../hooks/state/useTokenBalance';
import { getDisplayBalance } from '../../../utils/formatBalance';
import uniswap from '../../../assets/svg/UniswapWhite.svg';
import useTokenDecimals from '../../../hooks/useTokenDecimals';

type IProps = {
  pool: StakingContract;
  stakedBalance: BigNumber;
  claimableBalance: BigNumber;
  rates: {
    maha: BigNumber;
    arthx: BigNumber;
  };
  onDepositClick: () => void;
  onWithdrawClick: () => void;
  onClaimClick: () => void;
};

export default (props: IProps) => {
  const core = useCore();
  const { account, connect } = useWallet();

  const depositTokenContract = core.tokens[props.pool.depositToken];
  const tokenBalance = useTokenBalance(depositTokenContract);
  const tokenDecimals = useTokenDecimals(props.pool.depositToken);

  const tokens = props.pool.depositTokenSymbols.map((p) => core.tokens[p]);
  const tokenAddresses = tokens.map((t) => (t.symbol === 'WETH' ? 'ETH' : t.address));
  const uniswapLink = `https://app.uniswap.org/#/add/v2/${tokenAddresses.join('/')}`;
  const etherscan = `https://rinkeby.etherscan.io/address/${tokenAddresses[0]}`;
  const isWalletConnected = !!account;

  const ratePerMillisecond = 0.0001;
  const pow = BigNumber.from(10).pow(18);

  const initEarnedARTHX = useMemo(() => {
    return Number(getDisplayBalance(
      props?.claimableBalance?.mul(props?.rates?.arthx).div(pow),
      18,
      6
    ))
  }, [props, pow]);

  const initEarnedMAHA = useMemo(() => {
    return Number(getDisplayBalance(
      props?.claimableBalance?.mul(props?.rates?.maha).div(pow),
      18,
      6
    ))
  }, [props, pow]);

  return (
    <CustomCardGrid>
      <Grid
        container
        style={{ padding: '32px 32px', position: 'relative' }}
        alignItems={'center'}
      >
        {props.pool.platform === 'uniswap' && <CardIcon src={uniswap} height={32} />}
        <Grid item lg={3} style={{ display: 'flex' }}>
          <div>
            {props.pool.depositTokenSymbols.map((token, index) => (
              <TokenSymbol
                symbol={token}
                size={44}
                style={index === 1 ? { marginLeft: '-6px' } : {}}
              />
            ))}
            {/* <TokenSymbol symbol={props?.pair[1]} size={45} style={{ marginLeft: '-12px' }} /> */}
          </div>
          <div style={{ marginLeft: '16px' }}>
            <TableMainTextStyle>
              {props.pool.depositTokenSymbols.join(' - ')}
            </TableMainTextStyle>
            {props.pool.platform === 'uniswap' ? (
              <AddLiquidityButton onClick={() => window.open(uniswapLink, '_blank')}>
                Add Liquidity
              </AddLiquidityButton>
            ) : (
              <AddLiquidityButton onClick={() => window.open(etherscan, '_blank')}>
                View Etherscan
              </AddLiquidityButton>
            )}
          </div>
        </Grid>
        <Grid item lg={3}>
          <TableMainTextStyle>{Number(getDisplayBalance(tokenBalance, tokenDecimals, 3)).toLocaleString()}</TableMainTextStyle>
        </Grid>
        <Grid item lg={2}>
          <TableMainTextStyle>{/* {props?.apy} */}</TableMainTextStyle>
        </Grid>
        <Grid item lg={2}>
          <TableMainTextStyle>MAHA + ARTHX</TableMainTextStyle>
          {/* <TableMainTextStyle>
            <Countdown
              date={props?.poolEndDate || Date.now() + 550000000}
              renderer={({ days, hours, minutes, seconds, completed }) => {
                return (
                  <span>{days}d : {hours}h : {minutes}m : {seconds}s left </span>
                )
              }}
            />
          </TableMainTextStyle>
          <DayText>
            {props?.poolDur}
          </DayText> */}
        </Grid>
        <Grid item lg={2}>
          {!isWalletConnected ? (
            <Button text={'Connect Wallet'} size={'lg'} onClick={() =>
              connect('injected').then(() => {
                localStorage.removeItem('disconnectWallet')
              })} />
          ) : (
            <Button
              disabled={tokenBalance.lte(0)}
              text="Deposit"
              size={'sm'}
              onClick={props.onDepositClick}
            />
          )}
        </Grid>
      </Grid>
      {props.stakedBalance.gt(0) && (
        <DepositInfoContainer>
          <div style={{ display: 'flex' }}>
            Your Locked state:
            <TableMainTextStyle style={{ marginLeft: '10px' }}>
              {Number(getDisplayBalance(props.stakedBalance, tokenDecimals, 3)).toLocaleString()}
            </TableMainTextStyle>
            {
              !(Number(initEarnedARTHX) || Number(initEarnedMAHA))
                ? (
                  <WithdrawClaimButton onClick={props.onWithdrawClick}>Withdraw</WithdrawClaimButton>
                )
                : (
                  <></>
                )
            } 
          </div>
          <div style={{ display: 'flex' }}>
            {
              !!(Number(initEarnedARTHX) || Number(initEarnedMAHA)) 
                ? (
                  <>
                    Earned:
                    <TableMainTextStyle style = {{ marginLeft: '10px' }}>
                      <CountUp
                      end={initEarnedARTHX}
                      delay={0.01}
                      decimals={3}
                      redraw={false}
                      duration={initEarnedARTHX / ratePerMillisecond}
                      preserveValue={true}
                      formattingFn={(val: number) => val.toLocaleString('en-US', {maximumFractionDigits: 6})}
                      onUpdate={() => {}}
                      />
                      {' '}
                      ARTHX
                      {' + '}
                      <CountUp
                        end={initEarnedMAHA}
                        delay={0.01}
                        redraw={false}
                        decimals={3}
                        duration={initEarnedMAHA / ratePerMillisecond}
                        preserveValue={true}
                        formattingFn={(val: number) => val.toLocaleString('en-US', { maximumFractionDigits: 6 })}
                        onUpdate={() => {}}
                      />
                      {' '}
                      MAHA
                    </TableMainTextStyle>
                    <WithdrawClaimButton onClick={props.onClaimClick}>
                      Claim Rewards
                    </WithdrawClaimButton>
                  </>
                ) 
                : (
                  <>
                    Earned: {
                    initEarnedARTHX.toLocaleString('en-US', { maximumFractionDigits: 4 })
                    } ARTHX + {
                      initEarnedMAHA.toLocaleString('en-US', { maximumFractionDigits: 4 })
                    } MAHA
                  </>
                )
            }
          </div>
        </DepositInfoContainer>
      )}
    </CustomCardGrid>
  );
};

const CustomCardGrid = styled.div`
  background: linear-gradient(180deg, #48423e 0%, #373030 100%);
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-sizing: border-box;
  border-radius: 12px;
  margin: 8px 0px;
  position: relative;
`;

const TableMainTextStyle = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  opacity: 0.88;
  margin: 0;
`;

const AddLiquidityButton = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 140%;
  color: #ff7f57;
  margin: 0;
  cursor: pointer;
`;

const DayText = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 140%;
  color: rgba(255, 255, 255, 0.64);
  opacity: 0.88;
  margin: 0;
`;

const DepositInfoContainer = styled.div`
  background: #423b38;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  box-sizing: border-box;
  border-radius: 0 0 12px 12px;
  padding: 20px 32px;
  display: flex;
  justify-content: space-between;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 140%;
  color: rgba(255, 255, 255, 0.64);
  opacity: 0.88;
`;

const WithdrawClaimButton = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #ff7f57;
  margin: 0 0 0 10px;
  cursor: pointer;
`;

const CardIcon = styled.img`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 0px;
  z-index: 10;
`;
