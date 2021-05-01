import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import CustomInputContainer from '../../../components/CustomInputContainer';
import Button from '../../../components/Button';
import CustomModal from '../../../components/CustomModal';

interface IProps {
  onCancel: () => void;
  onClaim?: () => void;
  isMobile: boolean;
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
      title={`Stake Your Tokens`}
    >
      <div
        style={{
          background: 'linear-gradient(180deg, #48423E 0%, #373030 100%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '24px 32px',
        }}
      >
        <CustomInputContainer
          ILabelValue={'How much MAHA  would you like to claim?'}
          IBalanceValue={''} //just pass the balance here
          showBalance={false}
          ILabelInfoValue={''}
          DefaultValue={'0.00'}
          LogoSymbol={'MAHA'}
          hasDropDown={false}
          SymbolText={'MAHA'}
          setText={(val) => {}}
          inputMode={'decimal'}
          tagText={'MAX'}
          dontShowBackgroundContainer={true}
          multiIcons={false}
        />
        <OneLine>
          <div style={{ flex: 1 }}></div>
          <OneLine>
            <BeforeChip>Earned Amount: 1000</BeforeChip>
            <TagChips>MAHA</TagChips>
          </OneLine>
        </OneLine>
        <Grid
          container
          spacing={2}
          direction={props.isMobile ? 'column-reverse' : 'row'}
          style={{ marginTop: '32px' }}
        >
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Button
              variant={'transparent'}
              text="Cancel"
              size={'lg'}
              onClick={() => {
                props.onCancel();
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Button text={'Clain'} size={'lg'} onClick={props.onClaim} />
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
