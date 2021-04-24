import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import Grid from '@material-ui/core/Grid';

type props = {};

const StakeBox: React.FC<props> = (props) => {
  return (
    <CustomInfoCard className={'custom-mahadao-box'}>
      <CustomInfoCardDetails>
        <Grid container>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <TextWithIcon>
              Farming pools are greate way to earn higher APY by staking your $ARTH
            </TextWithIcon>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <ButtonConatiner>
              <Button text={'Earn Rewards'} size={'sm'} to={'/farming'} />
            </ButtonConatiner>
          </Grid>
        </Grid>
      </CustomInfoCardDetails>
    </CustomInfoCard>
  );
};

export default StakeBox;

const ButtonConatiner = styled.div`
  @media (max-width: 600px) {
    margin-top: 24px;
  }
`;

const CustomInfoCard = styled.div`
  margin-top: 16px;
`;

const CustomInfoCardHeader = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: #ffffff;
  margin-bottom: 24px;
`;

const CustomInfoCardDetails = styled.div`
  margin: 10px 0;
`;

const OneLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
`;

const TextWithIcon = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: rgba(255, 255, 255, 0.88);
  opacity: 0.64;
  vertical-align: center;
`;
const BeforeChip = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
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

const ToolTipFont = styled.p`
  padding: 0px;
  margin: 0px;
`;
