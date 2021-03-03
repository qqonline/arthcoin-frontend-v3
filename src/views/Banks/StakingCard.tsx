import React from 'react';
import styled from 'styled-components';
import ArrowRight from '../../assets/img/ArrowRight.svg';
import Button from '../../components/Button';

import { Bank } from '../../basis-cash';
import { useWallet } from 'use-wallet';
import TokenSymbol from '../../components/TokenSymbol';

const APY = require('./apy.json');


interface AccountButtonProps {
  bank: Bank;
  // title: string;
  // logo: Array<string>;
  // subtitle?: string;
  // poolSize: string;
  // description?: string;
  // toolTipDesciption?: string;
  // buttonText: string;
  // percentage: number;
  // appyPercentage: string;
  // contract?:string;
}

interface ImageConTainerProps {
  marginLeft: number;
  zIndex: number;
}

const StakingCard: React.FC<AccountButtonProps> = ({ bank }) => {
  const apy: any = APY[bank.contract];
  const { account, connect } = useWallet();

  const logos = [bank.earnTokenName];

  if (bank.depositTokenName === 'ARTH_DAI-UNI-LPv2') logos.push('ARTH', 'DAI');
  else if (bank.depositTokenName === 'ARTH_DAI-MAHA-LPv1') logos.push('ARTH', 'DAI');
  else if (bank.depositTokenName === 'MAHA_ETH-UNI-LPv2') logos.push('MAHA', 'ETH');
  else if (bank.depositTokenName === 'ARTH_DAI-MAHA-LP') logos.push('ARTH', 'DAI');
  else logos.push(bank.depositTokenName);

  return (
    <CardContainer>
      {logos && logos.length > 0 && (
        <LogoContainer>
          {logos.slice(1).map((logo) => (
            <TokenSymbol symbol={logo} size={54} />
          ))}

          <img
            style={{ marginRight: 15, marginLeft: 15 }}
            src={ArrowRight}
            alt=""
            width="24px"
          />

          <ImageConTainer marginLeft={0} zIndex={logos.length + 1}>
            <TokenSymbol symbol={logos[0]} size={54} />
          </ImageConTainer>
        </LogoContainer>
      )}
      <PoolTitle>{bank.name}</PoolTitle>
      <span className="white font16 bold-200 margin-bottom-15" style={{ textAlign: 'center' }}>
        Pool size: {bank.poolRewards} {bank.earnTokenName}
      </span>

      <span className="white font16 bold-200 margin-bottom-15" style={{ textAlign: 'center' }}>
        Pool duration: {bank.poolDurationInDays} days
      </span>
      {/* {subtitle && <span className="white font16 bold-600 margin-bottom-15">{subtitle}</span>}
      {description && (
        <span
          className="white font16 bold-200 margin-bottom-15"
          style={{ textAlign: 'center' }}
        >
          {description}
        </span>
      )}*/}

      {bank.finished && (
        <span
          className="white font16 bold-200 margin-bottom-15"
          style={{ textAlign: 'center' }}
        >
          Pool is now closed, please withdraw your funds
        </span>
      )}
      {/* <Apy>Daily {apy.dailyAPY.toFixed(2)}%</Apy>
                      <Apy>Weekly {apy.weeklyAPY.toFixed(2)}%</Apy>
                      <Apy>Annual {apy.yearlyAPY.toFixed(2)}%</Apy> */}
      {apy && false && (
        <DiscountDivContainer>
          <DiscountDiv>
            <TitleText>Daily</TitleText>
            {`${apy.dailyAPY.toFixed(2)}%`}
          </DiscountDiv>
          <DiscountDiv>
            <TitleText>Weekly</TitleText>
            {`${apy.weeklyAPY.toFixed(2)}%`}
          </DiscountDiv>
          <DiscountDiv>
            <TitleText>Annual</TitleText>
            {`${apy.yearlyAPY.toFixed(2)}%`}
          </DiscountDiv>
        </DiscountDivContainer>
      )}

      {/* {toolTipDesciption && (
          <HtmlTooltip enterTouchDelay={0} title={<span>{toolTipDesciption}</span>}>
            <img src={InfoIcon} alt="Inof" width="16px" className="margin-left-5" />
          </HtmlTooltip>
        )} */}
      <PoolSizeDiv>
        {/* <div className="dialog-class margin-top-20">
          {bank.poolSize === Infinity ? 'No-Limit' : 'Pool Size'} <PoolTitle>{bank.poolSize}</PoolTitle>
        </div> */}
        {/* <ProgressCountdown percentage={bank.poolSize} description="Next Epoch" /> */}
      </PoolSizeDiv>
      <div style={{ width: '300px', marginBottom: '20px', marginTop: '20px' }}>
        {!!account ? (
          <Button text="Select" to={`/staking/${bank.contract}`} />
        ) : (
            <Button onClick={() => connect('injected')} text="Unlock Wallet" />
          )}
      </div>
    </CardContainer>
  );
};
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PoolSizeDiv = styled.div`
  background: #363130;
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: 300;
  font-size: 14px;
  line-height: 140%;
  text-align: center;
  color: #ffffff;
`;
const PoolTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  padding: 15px;
  color: #ffffff;
`;
const ImageConTainer = styled.div`
  border: 2px solid #363130;
  margin-left: ${(p: ImageConTainerProps) => `${p.marginLeft}px`};
  z-index: ${(p: ImageConTainerProps) => p.zIndex};
  width: 56px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: 56px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: ${(props) => props.theme.color.gradients.dark_linear};
  box-shadow: 0px 12px 24px -4px rgba(0, 0, 0, 0.12), 0px 16px 20px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
`;

const DiscountDivContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DiscountDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.16);
  border-radius: 20px;
  text-align: center;
  font-size: 12px;
  flex: 0.5;
  font-weight: 300;
  color: #ffffff;
  margin: 15px;
  padding: 10px;
`;

const TitleText = styled.div`
  font-size: 12px;
  margin-right: 5px;
  font-weight: bold;
`;
export default StakingCard;
