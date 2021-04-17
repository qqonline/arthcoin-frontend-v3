import React from 'react';
import CustomModal from '../CustomModal';
import styled from 'styled-components';
import Tick from '../../assets/svg/Tick.svg';
import Button from '../Button';

export interface InputProps {

}

const CustomSuccessModal: React.FC<InputProps> = (props) => {
  const { } = props;
  return (
    <CustomModal
      closeButton
      handleClose={() => {}}
      open={true}
      modalTitleStyle={{}}
      modalContainerStyle={{}}
      modalBodyStyle={{}}>
      <MainContainer>
        <TickContainer>
          <img src={Tick} height={100} />
        </TickContainer>
        <ContentConatiner>
          <ContentTitle>
            Redeeming ARTH successful!
          </ContentTitle>
          <ContentSubtitle>
            View transaction
          </ContentSubtitle>
        </ContentConatiner>
        <Button text={'Close'} size={'lg'} variant={'transparent'}/>
      </MainContainer>

    </CustomModal>
  );
}

export default CustomSuccessModal;

const MainContainer = styled.div`
  padding: 32px;
`
const TickContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 14px;
  margin-bottom: 24px;
`

const ContentConatiner = styled.div`
  text-align: center;
  margin-bottom: 32px;
`
const ContentTitle = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: rgba(255, 255, 255);
  margin: 0;
  margin-bottom: 10px;
`

const ContentSubtitle = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 140%;
  text-align: center;
  color: #F7653B;
  margin: 0;
`



