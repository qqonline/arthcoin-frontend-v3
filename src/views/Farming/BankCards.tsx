import React from 'react';
import styled from 'styled-components';

import { Bank } from '../../basis-cash';
import Button from '../../components/Button';
import Card from '../../components/Card';
import CardContent from '../../components/CardContent';
import CardIcon from '../../components/CardIcon';
import useBanks from '../../hooks/useBanks';
import TokenSymbol from '../../components/TokenSymbol';
import { useWallet } from 'use-wallet';

const APY = require('./apy.json');

const BankCards: React.FC = () => {
  const [banks] = useBanks();

  const activeBanks = banks.filter((bank) => !bank.finished);
  const inactiveBanks = banks.filter((bank) => bank.finished);

  return (
    <StyledCards>
      <VFATAnn>
        <span role="img" aria-label="farming">
          🌾
        </span>{' '}
        Unofficial farming dashboard at{' '}
        <a
          href="https://vfat.tools/arth"
          style={{ color: '#FFf' }}
          rel="noopener noreferrer"
          target="_blank"
        >
          vfat.tools/arth
        </a>{' '}
        <span role="img" aria-label="farming">
          🌾
        </span>
      </VFATAnn>

      {/* {inactiveRows[0].length > 0 && (
        <StyledInactiveNoticeContainer>
          <Notice color="grey">
            <b>You have banks where the mining has finished.</b>
            <br />
            Please withdraw and settle your stakes.
          </Notice>
        </StyledInactiveNoticeContainer>
      )} */}

      <StyledRow>
        {activeBanks.map((bank, i) => (
          <React.Fragment key={bank.name}>
            <BankCard bank={bank} />
            {i < activeBanks.length - 1 && <StyledSpacer />}
          </React.Fragment>
        ))}
      </StyledRow>

      <StyledInactiveBankTitle>Closed Pools</StyledInactiveBankTitle>

      <StyledRow>
        {inactiveBanks.map((bank, j) => (
          <React.Fragment key={j}>
            <BankCard bank={bank} />
            {j < inactiveBanks.length - 1 && <StyledSpacer />}
          </React.Fragment>
        ))}
      </StyledRow>
    </StyledCards>
  );
};

interface BankCardProps {
  bank: Bank;
}

const BankCard: React.FC<BankCardProps> = ({ bank }) => {
  const { account, connect } = useWallet();

  const apy: any = APY[bank.contract];

  return (
    <StyledCardWrapper>
      <Card>
        <CardContent>
          <StyledContent>
            <StyledTitle>{bank.name}</StyledTitle>
            <br />
            {bank.finished ? (
              <>
                <StyledDesc>Pool is now closed. Please Withdraw your funds</StyledDesc>
                <br />
                <CardIcon>
                  <TokenSymbol symbol={bank.depositTokenName} size={54} />
                </CardIcon>
              </>
            ) : (
              <>
                <StyledDesc>
                  Reward Amount: {bank.poolRewards} {bank.earnTokenName}
                </StyledDesc>
                <StyledDesc>Pool Duration: {bank.poolDurationInDays} days</StyledDesc>
                <StyledDesc>
                  Pool size:{' '}
                  {bank.poolSize === Infinity
                    ? 'No Limit'
                    : `${bank.poolSize} ${bank.depositTokenName}`}
                </StyledDesc>
                <br />
                <CardIcon>
                  <TokenSymbol symbol={bank.depositTokenName} size={54} />
                </CardIcon>
                {apy && (
                  <>
                    <ApyTitle>APYs</ApyTitle>
                    <ApyBlocks>
                      <Apy>Daily {apy.dailyAPY.toFixed(2)}%</Apy>
                      <Apy>Weekly {apy.weeklyAPY.toFixed(2)}%</Apy>
                      <Apy>Annual {apy.yearlyAPY.toFixed(2)}%</Apy>
                    </ApyBlocks>
                    <ApyNote>Please note that APYs update every hour</ApyNote>
                  </>
                )}
              </>
            )}

            <br />

            {!!account ? (
              <Button text="Select" to={`/staking/${bank.contract}`} />
            ) : (
              <Button onClick={() => connect('injected')} text="Unlock Wallet" />
            )}
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  );
};

const StyledCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Apy = styled.div`
  background: #fff3;
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  margin: 10px;
  text-align: center;
`;

const ApyTitle = styled.div`
  color: #fff9;
  margin-top: 10px;
  font-size: 16px;
`;

const ApyNote = styled.div`
  color: #fff9;
`;

const ApyBlocks = styled.div`
  margin: 5px;
  display: flex;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  margin-bottom: 25px;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 2);
  position: relative;
`;

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[200]};
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`;

const StyledDesc = styled.h4`
  color: #fff9;
  font-size: 14px;
  // font-weight: 700;
  text-align: center;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`;

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledInactiveBankTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[400]};
  margin-top: ${(props) => props.theme.spacing[5]}px;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const VFATAnn = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: #fff9;
  margin-bottom: 30px;
`;

export default BankCards;
