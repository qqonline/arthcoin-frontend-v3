import React from 'react';
import { getDisplayBalance } from '../../../utils/formatBalance';
import Button from '../../../components/Button';
import CustomToolTip from '../../../components/CustomTooltip';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import useARTHXOraclePrice from '../../../hooks/state/useARTHXOraclePrice';
import useCollateralPoolBalance from '../../../hooks/state/pools/useCollateralPoolBalance';
import useMintCollateralRatio from '../../../hooks/state/useMintCollateralRatio';
import useRedeemCollateralRatio from '../../../hooks/state/useRedeemCollateralRatio';
import useCollateralPoolPrice from '../../../hooks/state/pools/useCollateralPoolPrice';

interface IProps {
  selectedCollateralCoin: string;
}

export default ({ selectedCollateralCoin }: IProps) => {
  const mintCR = useMintCollateralRatio();
  const redeemCR = useRedeemCollateralRatio();
  const poolBalance = useCollateralPoolBalance(selectedCollateralCoin);

  const collatearlPrice = useCollateralPoolPrice(selectedCollateralCoin);

  // console.log(poolBalance.toString());

  const arthxPrice = useARTHXOraclePrice();

  return (
    <>
      <RightTopCard className={'custom-mahadao-box'}>
        <div style={{ marginBottom: '12px' }}>
          <OneLineInput>
            <div style={{ flex: 1 }}>
              <TextForInfoTitle>ARTHX GMU Price</TextForInfoTitle>
            </div>
            <InputLabelSpanRight>${getDisplayBalance(arthxPrice, 6)}</InputLabelSpanRight>
          </OneLineInput>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <OneLineInput>
            <div style={{ flex: 1 }}>
              <TextForInfoTitle>Collateral GMU Price</TextForInfoTitle>
            </div>
            <InputLabelSpanRight>${getDisplayBalance(collatearlPrice, 18)}</InputLabelSpanRight>
          </OneLineInput>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <OneLineInput>
            <div style={{ flex: 1 }}>
              <TextForInfoTitle>
                Mint Collateral Ratio
                <CustomToolTip />
              </TextForInfoTitle>
            </div>
            <InputLabelSpanRight>{getDisplayBalance(mintCR, 4, 2)}%</InputLabelSpanRight>
          </OneLineInput>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <OneLineInput>
            <div style={{ flex: 1 }}>
              <TextForInfoTitle>
                Redeem Collateral Ratio
                <CustomToolTip />
              </TextForInfoTitle>
            </div>
            <InputLabelSpanRight>{getDisplayBalance(redeemCR, 4, 2)}%</InputLabelSpanRight>
          </OneLineInput>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <OneLineInput>
            <div style={{ flex: 1 }}>
              <TextForInfoTitle>Pool Balance</TextForInfoTitle>
            </div>
            <InputLabelSpanRight>{getDisplayBalance(poolBalance, 6)}</InputLabelSpanRight>
          </OneLineInput>
        </div>
        {/* <div style={{ marginBottom: '12px' }}>
              <OneLineInput>
                <div style={{ flex: 1 }}>
                  <TextForInfoTitle>Available to Mint</TextForInfoTitle>
                </div>
                <InputLabelSpanRight>$54.7M</InputLabelSpanRight>
              </OneLineInput>
            </div> */}
        <div style={{ marginBottom: '12px' }}>
          <OneLineInput>
            <div style={{ flex: 1 }}>
              <TextForInfoTitle>
                Stability Fee
                <CustomToolTip />
              </TextForInfoTitle>
            </div>
            <InputLabelSpanRight>1%</InputLabelSpanRight>
          </OneLineInput>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <OneLineInput>
            <div style={{ flex: 1 }}>
              <TextForInfoTitle>
                Trading Fee
                <CustomToolTip />
              </TextForInfoTitle>
            </div>
            <InputLabelSpanRight>0.1%</InputLabelSpanRight>
          </OneLineInput>
        </div>
      </RightTopCard>
      <RightBottomCard className={'custom-mahadao-box'}>
        <RightBottomCardTitle>
          Farming pools are great way to earn higher APY by staking your $ARTH
        </RightBottomCardTitle>
        <Grid container style={{ marginTop: '16px' }}>
          <Grid item lg={4}>
            <Button text={'Earn Rewards'} size={'sm'} to={'farming'} />
          </Grid>
        </Grid>
      </RightBottomCard>
    </>
  );
};

const RightTopCard = styled.div`
  @media (max-width: 600px) {
    margin-top: 8px;
  }
`;

const OneLineInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  margin: 5px 0 10px 0;
`;

const TextForInfoTitle = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: #ffffff;
  opacity: 0.64;
`;

const InputLabelSpanRight = styled.span`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.88);
  margin-right: 5px;
`;

const RightBottomCard = styled.div`
  margin-top: 16px;
  @media (max-width: 600px) {
    margin-top: 24px;
  }
`;

const RightBottomCardTitle = styled.div`
  padding: 0;
  margin: 0;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.88);
`;
