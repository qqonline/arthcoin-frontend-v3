import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import CustomInputContainer from '../../../components/CustomInputContainer';
import Button from '../../../components/Button';
import CustomModal from '../../../components/CustomModal';


interface IProps {
  onCancel: () => void
  onDeposit?: () => void
  isMobile: boolean
}

export default (props: IProps) => {
  return (
    <CustomModal
      closeButton
      handleClose={props.onCancel}
      open={true}
      modalTitleStyle={{}}
      modalContainerStyle={{}}
      modalBodyStyle={{}}
      title={`Deposit ARTH-MAHA LP`}
    >
      <div>
        <CustomInputContainer
          ILabelValue={'How much ARTH-MAHA LP would you like to supply?'}
          IBalanceValue={''}
          ILabelInfoValue={''}
          DefaultValue={'0.00'}
          LogoSymbol={'ARTH'}
          hasDropDown={false}
          SymbolText={'ARTH-MAHA'}
          setText={(val) => { }}
          inputMode={'decimal'}
          tagText={'MAX'}
          dontShowBackgroundContainer={true}
          multiIcons={true}
          symbol1={'ARTH'}
          symbol2={'MAHA'}
        />
        <OneLine>
          <div style={{ flex: 1 }}></div>
          <OneLine>
            <BeforeChip>Balance: 1000.00</BeforeChip>
            <TagChips>ARTH / ETH</TagChips>
          </OneLine>
        </OneLine>
        <Grid container spacing={2} direction={props.isMobile ? 'column-reverse' : 'row'} style={{ marginTop: '32px' }}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Button
              variant={'transparent'}
              text="Cancel"
              size={'lg'}
              onClick={props.onCancel}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Button
              text={'Deposit'}
              size={'lg'}
              onClick={props.onDeposit}
            />
          </Grid>
        </Grid>
      </div>
    </CustomModal>
  );
};


const OneLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  margin: 5px 0;
`;

const BeforeChip = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.64);
  margin-right: 5px;
`;

const TagChips = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  padding: 2px 8px;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.64);
`;
