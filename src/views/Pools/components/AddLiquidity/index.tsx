import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import TokenSymbol from '../../../../components/TokenSymbol';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import plus from '../../../../assets/svg/plus.svg';
import InfoIcon from '@material-ui/icons/Info';
import CustomInputContainer from '../../../../components/CustomInputContainer';
import arrowDown from '../../../../assets/svg/arrowDown.svg';
import Button from '../../../../components/Button';
import TransparentInfoDiv from '../../../Stablize/components/InfoDiv';
import { Divider } from '@material-ui/core';
import CustomModal from '../../../../components/CustomModal';
import Grid from '@material-ui/core/Grid';

type props = {

};

const AddLiquidity: React.FC<props> = (props) => {
  const { } = props;
  const defaultDropdownValues = ['MAHA', 'ARTH', 'USDT', 'USDC', 'ETH', 'WBTC'];

  const [balance, setBalance] = useState<number>(500.00);

  const [firstCoin, setFirstCoin] = useState<string>('ARTH');
  const [secondCoin, setSecondCoin] = useState<string>('ETH');

  const [firstCoinAmount, setFirstCoinAmount] = useState<number>(0.00);
  const [secondCoinAmount, setSecondCoinAmount] = useState<number>(0.00);

  const [firstCoinDropDown, setFirstCoinDropDown] = useState<string[]>([]);
  const [secondCoinDropDown, setSecondCoinDropDown] = useState<string[]>([]);

  const [confirmModal, setConfirmModal] = useState<boolean>(false);

  useEffect(() => {
    var arr: string[];
    arr = defaultDropdownValues.filter(e => e !== firstCoin);
    setFirstCoinDropDown(arr);
  }, [firstCoin])

  useEffect(() => {
    var arr: string[];
    arr = defaultDropdownValues.filter(e => e !== secondCoin);
    setSecondCoinDropDown(arr);
  }, [secondCoin])

  return (
    <div>
      <CustomModal
        closeButton
        handleClose={() => setConfirmModal(false)}
        open={confirmModal}
        modalTitleStyle={{}}
        modalContainerStyle={{}}
        modalBodyStyle={{}}
        title={`Confirm Supply`}>
          <>
            <TransparentInfoDiv
              labelData={`${firstCoin} Deposit`}
              rightLabelUnit={firstCoin}
              rightLabelValue={firstCoinAmount.toString()}
            />
            <TransparentInfoDiv
              labelData={`${secondCoin} Deposit`}
              rightLabelUnit={secondCoin}
              rightLabelValue={secondCoinAmount.toString()}
            />
            <TransparentInfoDiv
              labelData={`Your share of pool`}
              rightLabelValue={'0.06%'}
            />
            <Divider style={{ background: 'rgba(255, 255, 255, 0.08)', margin: '15px 0px' }} />
            <TransparentInfoDiv
              labelData={`You receiving pool token`}
              rightLabelUnit={`${firstCoin}/${secondCoin}`}
              rightLabelValue={'1000.00'}
            />
            <Grid container spacing={2} style={{marginTop: '32px'}}>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <Button
                  variant={'transparent'}
                  text="Cancel"
                  size={'lg'}
                  onClick={() => setConfirmModal(false)}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <Button
                  text={'Confirm Supply'}
                  size={'lg'}
                  onClick={() => {
                    setConfirmModal(false)
                  }}
                />
              </Grid>
            </Grid>
          </>
      </CustomModal>
      <CustomCard>
        <CustomCardHeader>
          <EachElement> <ArrowBackIos fontSize="default" color={'inherit'} htmlColor={'#ffffff'}/> </EachElement>
          <EachElement> <CardTitle> Add Liquidity </CardTitle></EachElement>
        </CustomCardHeader>
        <CustomCardContainer>
          <CustomInputContainer
            ILabelValue={'Enter Amount'}
            IBalanceValue={`Balance ${balance}`}
            // ILabelInfoValue={'How can i get it?'}
            DefaultValue={firstCoinAmount.toString()}
            LogoSymbol={firstCoin}
            hasDropDown={true}
            dropDownValues={firstCoinDropDown}
            ondropDownValueChange={(data) => {
              if (data !== secondCoin){
                setFirstCoin(data);
              }
            }}
            SymbolText={firstCoin}
            inputMode={'decimal'}
            setText={(val: string) => setFirstCoinAmount(Number(val.replace(/[^0-9]/g, '')))}
            tagText={'MAX'}
          />
          <PlusMinusArrow>
            <img src={arrowDown} />
          </PlusMinusArrow>
          <CustomInputContainer
            ILabelValue={'Enter Amount'}
            IBalanceValue={`Balance ${balance}`}
            // ILabelInfoValue={'How can i get it?'}
            DefaultValue={secondCoinAmount.toString()}
            LogoSymbol={secondCoin}
            hasDropDown={true}
            dropDownValues={secondCoinDropDown}
            ondropDownValueChange={(data) => {
              if (firstCoin !== data){
                setSecondCoin(data);
              }
            }}
            SymbolText={secondCoin}
            inputMode={'decimal'}
            setText={(val: string) => setSecondCoinAmount(Number(val.replace(/[^0-9]/g, '')))}
            tagText={'MAX'}
          />
          <TcContainer>
            <OneLine style={{marginTop: "10px"}}>
              <div style={{ flex: 1 }}>
                <TextWithIcon>
                  Price
                </TextWithIcon>
              </div>
              <OneLine>
                <BeforeChip>0.05</BeforeChip>
                <TagChips style={{marginRight: '5px'}}>{firstCoin}</TagChips>
                <BeforeChip>per</BeforeChip>
                <TagChips>{secondCoin}</TagChips>
              </OneLine>
            </OneLine>
            <OneLine style={{marginTop: "10px"}}>
              <div style={{ flex: 1 }}>
                <TextWithIcon>
                  Share of Pool
                </TextWithIcon>
              </div>
              <OneLine>
                <BeforeChip>0.5%</BeforeChip>
              </OneLine>
            </OneLine>
          </TcContainer>
          <Button text={'Sell'} size={'lg'} onClick={() => {setConfirmModal(true)}} />
        </CustomCardContainer>
      </CustomCard>
    </div>
  )
}

export default AddLiquidity

const CustomCard = styled.div`
  background: linear-gradient(180deg, #48423E 0%, #373030 100%);
  border-radius: 12px;
  margin-top: 12px;
`

const CustomCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: 24px 32px;
  align-items: center;
  align-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  @media (max-width: 600px) {
    padding: 12px 16px;
  }
`

const EachElement = styled.div`
  flex: 0.3333;
`
const CustomCardContainer = styled.div`
  padding: 24px 32px;
  @media (max-width: 600px) {
    padding: 12px 16px;
  }
`
const CardTitle = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: rgba(255, 255, 255);
  margin: 0px;
`
const PlusMinusArrow = styled.div`
  width: 100%;
  height: 32px;
  border-radius: 1.33px;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  font-size: 20px;
`
const TcContainer = styled.div`
  margin-top: 18px;
  margin-bottom: 18px;
`

const OneLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
`


const TextWithIcon = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  color: rgba(255, 255, 255, 0.88);
`

const BeforeChip = styled.span`
  ont-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.64);
  margin-right: 5px;
`

const TagChips = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 2px 8px;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.64);
`

