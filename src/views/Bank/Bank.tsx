import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';

import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import useBank from '../../hooks/useBank';
import useRedeem from '../../hooks/useRedeem';
import { Bank as BankEntity } from '../../basis-cash';
import StakingIcon from '../Banks/staking.png';

const Bank: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));

  const { bankId } = useParams();
  const bank = useBank(bankId);

  // const { onRedeem } = useRedeem(bank);
  console.log('inside bank yo');
  return bank ? (
    <>
      <PageHeader
        icon={<img alt="staking" src={StakingIcon} />}
        subtitle={`Deposit ${bank?.depositTokenName} and earn ${bank?.earnTokenName}`}
        title={bank?.name}
      />
      <StyledBank>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest bank={bank} />
          </StyledCardWrapper>
          <Divider />
          <StyledCardWrapper>
            <Stake bank={bank} />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        {bank.depositTokenName.includes('LP') && <LPTokenHelpText bank={bank} />}
        <Spacer size="lg" />
        <div>
          {/* <Button onClick={onRedeem} text="Settle & Withdraw" /> */}
        </div>
        <Spacer size="lg" />
      </StyledBank>
    </>
  ) : (
    <BankNotFound />
  );
};

const LPTokenHelpText: React.FC<{ bank: BankEntity }> = ({ bank }) => {
  let pairName: string;
  let uniswapUrl: string;
  if (bank.depositTokenName.includes('ARTH')) {
    pairName = 'ARTH-DAI pair';
    uniswapUrl =
      'https://app.uniswap.org/#/add/0x3449FC1Cd036255BA1EB19d65fF4BA2b8903A69a/0x6B175474E89094C44Da98b954EedeAC495271d0F';
  } else {
    pairName = 'MAHA-DAI pair';
    uniswapUrl =
      'https://app.uniswap.org/#/add/0xa7ED29B253D8B4E3109ce07c80fc570f81B63696/0x6B175474E89094C44Da98b954EedeAC495271d0F';
  }
  return (
    <StyledLink href={uniswapUrl} target="_blank">
      {`🦄  Provide liquidity to ${pairName} on Uniswap  🦄`}
    </StyledLink>
  );
};

const BankNotFound = () => {
  return (
    <Center>
      <PageHeader title="Not Found" subtitle="You've hit a bank just robbed by unicorns." />
    </Center>
  );
};

const StyledBank = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  max-width: 800px;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Divider = styled.div`
  background: #000;
  opacity: 0.2;
  height: 1px;
`;
const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;

  background: linear-gradient(180deg, #48423e 0%, #373030 100%);
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Bank;
