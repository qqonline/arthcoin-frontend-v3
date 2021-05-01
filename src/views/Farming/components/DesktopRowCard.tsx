import React from 'react';
import styled from 'styled-components';
import TokenSymbol from '../../../components/TokenSymbol';
import Grid from '@material-ui/core/Grid';
import Button from '../../../components/Button';
import Countdown from 'react-countdown';
import uniswapSVG from '../../../assets/svg/farming.svg';
import { StakingContract } from '../../../basis-cash';
import useCore from '../../../hooks/useCore';
import useTokenBalance from '../../../hooks/state/useTokenBalance';
import { getDisplayBalance } from '../../../utils/formatBalance';

type IProps = {
  pool: StakingContract;
  // pair: [string, string];
  // deposited?: boolean;
  // walletValue: string;
  // walletUnit: string;
  // apy: string;
  // poolDur: string;
  // poolEndDate: number;
  // open?: boolean;
  // lockedStake?: string;
  // earned?: string;
  onDepositClick: () => void;
  onWithdrawClick: () => void;
  onClaimClick: () => void;
};

export default (props: IProps) => {
  const core = useCore();

  const uniswapLink = `https://app.uniswap.org/#/add/${props.pool.depositTokenSymbols.join(
    '/',
  )}`;

  const etherscan = `https://rinkeby.etherscan.io/address/${props.pool.depositToken}`;

  const depositTokenContract = core.tokens[props.pool.depositToken];

  console.log(props.pool.depositToken, depositTokenContract);
  const tokenBalance = useTokenBalance(depositTokenContract);

  return (
    <CustomCardGrid>
      <Grid
        container
        style={{ padding: '32px 32px', position: 'relative' }}
        alignItems={'center'}
      >
        {props.pool.platform === 'uniswap' && (
          <CardIcon
            src={'https://upload.wikimedia.org/wikipedia/commons/8/82/Uniswap_Logo.png'}
            height={32}
          />
        )}
        <Grid item lg={3} style={{ display: 'flex' }}>
          <div>
            {props.pool.depositTokenSymbols.map((token) => (
              <TokenSymbol symbol={token} size={45} />
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
          <TableMainTextStyle>{getDisplayBalance(tokenBalance)}</TableMainTextStyle>
        </Grid>
        <Grid item lg={1}>
          <TableMainTextStyle>{/* {props?.apy} */}</TableMainTextStyle>
        </Grid>
        <Grid item lg={3}>
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
          <Button text="Deposit" size={'sm'} onClick={props.onDepositClick} />
        </Grid>
      </Grid>
      {/* {props.deposited && <DepositInfoContainer>
        <div style={{ display: 'flex' }}>
          Your Locked state:
          <TableMainTextStyle style={{ marginLeft: '10px' }}>
            {props?.lockedStake}
          </TableMainTextStyle>
          <WithdrawClaimButton onClick={() => props.onButtonClick('Withdraw')}>
            Withdraw
          </WithdrawClaimButton>
        </div>
        <div style={{ display: 'flex' }}>
          Earned:
          <TableMainTextStyle style={{ marginLeft: '10px' }}>
            {props?.earned || '0.0 MAHA'}
          </TableMainTextStyle>
          <WithdrawClaimButton onClick={() => props.onButtonClick('Claim')}>
            Claim MAHA
          </WithdrawClaimButton>
        </div>
      </DepositInfoContainer>} */}
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
