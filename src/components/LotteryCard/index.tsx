import React from 'react';
import FeatureI from '../../assets/img/photo-1490077476659-095159692ab5.jpeg';
import Button from '../Button';
import styled from 'styled-components';
import warningLogo from '../../assets/svg/warningIcon.svg';

type props = {
  image?: string;
  cardtitle: string;
  changeToWin?: {
    text: string;
    perc: string;
  }
  moreInfoMsg?: string;
  buttonText: string;
  buttonClick: () => void;
};

const LotteryCard: React.FC<props> = (props) => {
  const { image, cardtitle, changeToWin = null, moreInfoMsg = "", buttonText, buttonClick } = props;

  return (
    <LotteryCardConatiner className={'custom-mahadao-box'}>
      <FeatureImage src={FeatureI} alt={'feature'} />
      <CardBody>
        <CardTitle>{cardtitle}</CardTitle>
        {changeToWin && <ChnageWin>
          <ChnageWinDesc>{changeToWin.text}</ChnageWinDesc>
          <Perc>{changeToWin.perc}</Perc>
        </ChnageWin>}
        {moreInfoMsg !== '' && <CustomBadgeAlert>
          <Logo src={warningLogo} alt='TicketBg' />
          <Text>{moreInfoMsg}</Text>
        </CustomBadgeAlert>}
      </CardBody>
      <CardAction>
        {buttonClick ?
          <Button text={buttonText} size={'sm'} onClick={() => buttonClick()} /> :
          <Button text={buttonText} size={'sm'} to={'/farming'} />}
      </CardAction>
    </LotteryCardConatiner>
  );
};

export default LotteryCard;

const LotteryCardConatiner = styled.div`
  width: 100%;
  min-height: 434px;
  padding: 0px;
  @media (max-width: 600px) {
    min-height: auto;
  }
`

const FeatureImage = styled.img`
  width: 100%;
  height: 222px;
  border-radius: 12px 12px 0px 0px;
`

const CardBody = styled.div`
  padding: 24px 24px 0 24px;
`

const CardTitle = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 16px;
`

const ChnageWin = styled.div`
  display: flex;
  justify-content: space-between;
  //margin-bottom: 60px;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 140%;
  color: rgba(255, 255, 255, 0.88);

`

const ChnageWinDesc = styled.p`
  flex: 1;
`

const Perc = styled.span`
  
`

const CardAction = styled.div`
  padding: 24px;
  width: 100%;
  position: absolute;
  bottom: 0;
  @media (max-width: 600px) {
    position: static;
  }
`

const CustomBadgeAlert = styled.div`
  border: 1px solid #FCB400;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px;
  display: flex;
  align-items: flex-start;
`

const Logo = styled.img`
  width: 13.33px;
  height: 13.33px;
  margin-top: 2px;
`

const Text = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  color: #FCB400;
  flex: 1;
  padding-left: 10px;
  margin-bottom: 0;
`

