import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import {BigNumber} from '@ethersproject/bignumber';

import { WinModal } from './components/WinModal';
import Container from '../../components/Container';
import { LoseModal } from './components/LoseModal';
import LotteryCard from '../../components/LotteryCard';
import TicketBgLogo from '../../assets/svg/bgLogo.svg';
import { CriteriaModal } from './components/CriteriaModal';
import TicketLogoImg from '../../assets/svg/ShortTicket.svg';
import questionMark from '../../assets/svg/questionMark.svg';
import { WalletAutoConnect } from '../../components/WalletAutoConnect';

import useCore from '../../hooks/useCore';
import usePrizes from '../../hooks/state/usePrizes';
import usePrizeResult from '../../hooks/state/usePrizeResult';
import useTokenCounter from '../../hooks/state/useTokenCounter';
import useLotteryBalance from '../../hooks/state/useLotteryBalance';


const Lottery = () => {
  const [winModal, setWin] = useState(false);
  const [loseModal, setLose] = useState(false);
  const [criteriaModal, setCriteriaModal] = useState(false);

  WalletAutoConnect();

  const core = useCore();
  const lotteryBalance = useLotteryBalance(core.myAccount);
  const tokenCounter = useTokenCounter();
  const prizes = usePrizes();

  console.log('Counter', prizes);

  const yourPercentOfWinning = useMemo(() => {
    if (tokenCounter.lte(0)) return BigNumber.from(0);
    return lotteryBalance.mul(100).div(tokenCounter);
  }, [lotteryBalance, tokenCounter])

  return (
    <div>
      <HeadingContainer>
        <Container size="lg">
          <MainSection>
            <LeftMainSection>
              <Heading>
                MAHA PRIZES
                <img src={questionMark} alt='Question mark' height={24} onClick={() => {
                  setCriteriaModal(true)
                }} />
              </Heading>
              <SubHeading>Win exciting prizes by lottery tickets</SubHeading>
            </LeftMainSection>
            <RightMainSection>
              <Ticket>
                <BgImage src={TicketBgLogo} alt="TicketBg" />
                <TicketHead>Your Lottery Tickets</TicketHead>
                <TicketDataSection>
                  <TicketLogo src={TicketLogoImg} alt="Ticket" />
                  <TicketData>{Number(lotteryBalance.toString()).toLocaleString()}</TicketData>
                </TicketDataSection>
                <TicketBuyTitle>More Lottery Tickets. Higher chances</TicketBuyTitle>
                <TicketBuyAction to={'/genesis'}>Get More Tickets</TicketBuyAction>
              </Ticket>
            </RightMainSection>
          </MainSection>
        </Container>
      </HeadingContainer>
      <Container size={'lg'}>
        <CardConatiner>
          <Grid container spacing={2}>
            {
              prizes.map((prize, i) => (
                prize.winner !== '0x0000000000000000000000000000000000000000'
                  ? (
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <LotteryCard
                        key={prize?.nftAddress || prize?.tokenId?.toString() || i}
                        image={prize?.image || ''}
                        cardtitle={prize?.description?.toUpperCase() || 'MAHADAO NFT PRIZE'}
                        changeToWin={{
                          text: 'Your change to win',
                          perc: '0%'
                        }}
                        moreInfoMsg={
                          'This prize has been won.'
                        }
                      />
                    </Grid>
                  )
                  : (
                    Number(prize.criteria.toString()) <= Number(lotteryBalance.toString())
                      ? (
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                          <LotteryCard
                            key={prize?.nftAddress || prize?.tokenId?.toString() || i}
                            image={prize?.image || ''}
                            cardtitle={prize?.description?.toUpperCase() || 'MAHADAO NFT PRIZE'}
                            changeToWin={{
                              text: 'Your Chance to win',
                              perc: Number(yourPercentOfWinning.toString()).toLocaleString() + '%'
                            }}
                            buttonText={'Increase Your Chance to Win'}
                          />
                        </Grid>
                      )
                      : (
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                          <LotteryCard
                            image={prize?.image || ''}
                            key={prize?.nftAddress || prize?.tokenId?.toString() || i}
                            cardtitle={prize?.description?.toUpperCase() || 'MAHADAO NFT PRIZE'}
                            moreInfoMsg={
                              `Requires ${Number(prize.criteria.toString()) - Number(lotteryBalance.toString())
                              } ticket to participate in winning this prize! `
                            }
                            buttonText={'Get More Tickets'}
                          />
                        </Grid>
                      )
                  )
                )
              )
            }
          </Grid>
        </CardConatiner>
      </Container>
    </div>
  );
};

export default Lottery;

const HeadingContainer = styled.div`
  background: radial-gradient(145.27% 168.64% at 130.87% -118.64%, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),
  linear-gradient(252.98deg, #E44D75 10.74%, #EB822C 87.31%);
  width: 100vw;
  height: 238px;
  margin-top: 1px;
  @media (max-width: 600px) {
    height: auto;
  }
`

const MainSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`

const LeftMainSection = styled.div`
  flex: 1;
  @media (max-width: 600px) {
    margin-bottom: 40px;
  }
`

const RightMainSection = styled.div`
  @media (max-width: 600px) {
    width: 100%;
  }
  
`

const Heading = styled.div`
  font-family: Syne;
  font-style: normal;
  font-weight: bold;
  font-size: 42px;
  line-height: 44px;
  color: #FFFFFF;
  opacity: 0.88;
`

const SubHeading = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 140%;
  color: #FFFFFF;
  opacity: 0.88;
`

const Ticket = styled.div`
  background: linear-gradient(180deg, #2D2D2D 0%, #1C1C1C 100%);
  border-radius: 12px;
  width: 392px;
  height: 158px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const BgImage = styled.img`
  height: 68px;
  width: 88px;
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translate(0,-50%);
`

const TicketHead = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 130%;
  color: #FFFFFF;
  margin-bottom: 2px;
`

const TicketDataSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 24px;
`

const TicketLogo = styled.img`
  height: 32px;
  width: 32px;
`

const TicketData = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: #FFFFFF;
  margin-left: 12px;
`

const TicketBuyTitle = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 130%;
  color: rgba(255, 255, 255, 0.64);
  margin-bottom: 4px;
`

const TicketBuyAction = styled(Link)`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 130%;
  color: #FF7F57;
  cursor: pointer;
  &:hover {
    color: #FF7F57;
  }
`;

const CardConatiner = styled.div`
  margin-top: 40px;
`;
