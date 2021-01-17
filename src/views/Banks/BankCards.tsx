import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Bank } from '../../basis-cash';
import Button from '../../components/Button';
import Card from '../../components/Card';
import CardContent from '../../components/CardContent';
import CardIcon from '../../components/CardIcon';
import useBanks from '../../hooks/useBanks';
import usePoolAPY from '../../hooks/usePoolAPY';
import TokenSymbol from '../../components/TokenSymbol';
import Notice from '../../components/Notice';
import { useWallet } from 'use-wallet';
import { IVFatAPY } from '../../vfat/core';

const APY = require('./apy.json');

const BankCards: React.FC = () => {
  const [banks] = useBanks();

  const activeBanks = banks.filter((bank) => !bank.finished);
  const inactiveBanks = banks.filter((bank) => bank.finished);

  let finishedFirstRow = false;
  const inactiveRows = inactiveBanks.reduce<Bank[][]>(
    (bankRows, bank) => {
      const newBankRows = [...bankRows];
      if (newBankRows[newBankRows.length - 1].length === (finishedFirstRow ? 2 : 3)) {
        newBankRows.push([bank]);
        finishedFirstRow = true;
      } else {
        newBankRows[newBankRows.length - 1].push(bank);
      }
      return newBankRows;
    },
    [[]],
  );

  const activeBankApys: IVFatAPY[] = []; // usePoolAPY(activeBanks.map((b) => b.contract));

  return (
    <StyledCards>
      <VFATAnn>
        🌾 Unofficial farming dashboard at{' '}
        <a href="https://vfat.tools/arth" style={{ color: '#FFf' }} target="_blank">
          vfat.tools/arth
        </a>{' '}
        🌾
      </VFATAnn>

      {inactiveRows[0].length > 0 && (
        <StyledInactiveNoticeContainer>
          <Notice color="grey">
            <b>You have banks where the mining has finished.</b>
            <br />
            Please withdraw and settle your stakes.
          </Notice>
        </StyledInactiveNoticeContainer>
      )}
      <StyledRow>
        {activeBanks.map((bank, i) => (
          <React.Fragment key={bank.name}>
            <BankCard bank={bank} apy={activeBankApys.length > i ? activeBankApys[i] : null} />
            {i < activeBanks.length - 1 && <StyledSpacer />}
          </React.Fragment>
        ))}
      </StyledRow>
      {inactiveRows[0].length > 0 && (
        <>
          <StyledInactiveBankTitle>Inactive Banks</StyledInactiveBankTitle>
          {inactiveRows.map((bankRow, i) => (
            <StyledRow key={i}>
              {bankRow.map((bank, j) => (
                <React.Fragment key={j}>
                  <BankCard bank={bank} />
                  {j < bankRow.length - 1 && <StyledSpacer />}
                </React.Fragment>
              ))}
            </StyledRow>
          ))}
        </>
      )}
    </StyledCards>
  );
};

interface BankCardProps {
  bank: Bank;
  apy?: IVFatAPY;
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
            {/* <StyledDesc>Current APY: 20%</StyledDesc>
            <StyledDesc>% of Pool Available: Unlimited</StyledDesc> */}
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
            {/* <StyledInfoSlots>
              <StyledInfoSlot>
                <SlotTitle>4%</SlotTitle>
                <SlotDescription>Seigniorage Supply</SlotDescription>
              </StyledInfoSlot>

              <StyledInfoSlot>
                <SlotTitle>4%</SlotTitle>
                <SlotDescription>Staked</SlotDescription>
              </StyledInfoSlot>

              <StyledInfoSlot>
                <SlotTitle>40%</SlotTitle>
                <SlotDescription>APY</SlotDescription>
              </StyledInfoSlot>

              <StyledInfoSlot>
                <SlotTitle>3 day</SlotTitle>
                <SlotDescription>lock-in period</SlotDescription>
              </StyledInfoSlot>
            </StyledInfoSlots> */}

            {/* <StyledDesc>Pool opens at 3pm GMT</StyledDesc> */}
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

const StyledInfoSlots = styled.div`
  display: flex;
  text-align: center;

  padding-top: 5px;
  padding-bottom: 15px;
`;

const StyledInfoSlot = styled.div`
  padding-left: 5px;
  padding-right: 5px;
`;

const SlotTitle = styled.div`
  color: #fff;
  font-family: Inter;
  font-weight: bold;
  font-size: 18px;
`;

const SlotDescription = styled.div`
  color: #fff;
  font-size: 14px;
`;

const StyledInactiveNoticeContainer = styled.div`
  width: 598px;
  margin-bottom: ${(props) => props.theme.spacing[6]}px;
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
