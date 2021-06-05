import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import Button from '../../../components/Button';
import CustomToolTip from '../../../components/CustomTooltip';

import prettyNumber from '../../../components/PrettyNumber';
import { getDisplayBalance } from '../../../utils/formatBalance';
import usePoolRedeemFees from '../../../hooks/state/pools/usePoolRedeemFees';
import useStabilityFee from '../../../hooks/state/controller/useStabilityFee';
import useAvailableToMint from '../../../hooks/state/pools/useAvailableToMint';
import usePoolMintingFees from '../../../hooks/state/pools/usePoolMintingFees';
import useARTHXOraclePrice from '../../../hooks/state/controller/useARTHXPrice';
import useCollateralPoolPrice from '../../../hooks/state/pools/useCollateralPoolPrice';
import useCollateralPoolBalance from '../../../hooks/state/pools/useCollateralPoolBalance';
import useGlobalCollateralRatio from '../../../hooks/state/controller/useGlobalCollateralRatio';

interface IProps {
  selectedCollateralCoin: string;
}

export default ({ selectedCollateralCoin }: IProps) => {
  const cr = useGlobalCollateralRatio();
  const arthxPrice = useARTHXOraclePrice();
  const poolBalance = useCollateralPoolBalance(selectedCollateralCoin);
  const mintingFee = usePoolMintingFees(selectedCollateralCoin);
  const redeemingFee = usePoolRedeemFees(selectedCollateralCoin);
  const stabilityFee = useStabilityFee();
  const collatearlPrice = useCollateralPoolPrice(selectedCollateralCoin);
  const availableToMint = useAvailableToMint(selectedCollateralCoin);

  return (
    <>
      <RightTopCard className={'custom-mahadao-box'}>
        <div style={{ marginBottom: '12px' }}>
          <OneLineInput>
            <div style={{ flex: 1 }}>
              <TextForInfoTitle>ARTHX GMU Price</TextForInfoTitle>
            </div>
            <InputLabelSpanRight>
              ${
                Number(getDisplayBalance(arthxPrice, 6, 6))
                  .toLocaleString('en-US', { maximumFractionDigits: 6 })
              }
            </InputLabelSpanRight>
          </OneLineInput>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <OneLineInput>
            <div style={{ flex: 1 }}>
              <TextForInfoTitle>Collateral GMU Price</TextForInfoTitle>
            </div>
            <InputLabelSpanRight>
              ${
                Number(getDisplayBalance(collatearlPrice, 6, 6))
                  .toLocaleString('en-US', { maximumFractionDigits: 6 })
              }
            </InputLabelSpanRight>
          </OneLineInput>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <OneLineInput>
            <div style={{ flex: 1 }}>
              <TextForInfoTitle>
                Collateral Ratio
                <CustomToolTip toolTipText={'loreum ipsum'} />
              </TextForInfoTitle>
            </div>
            <InputLabelSpanRight>
              {
                Number(getDisplayBalance(cr, 4, 4))
                  .toLocaleString('en-US', { maximumFractionDigits: 4 })
              }%
            </InputLabelSpanRight>
          </OneLineInput>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <OneLineInput>
            <div style={{ flex: 1 }}>
              <TextForInfoTitle>
                Pool Balance
              </TextForInfoTitle>
            </div>
            <OneLineInput>
              <InputLabelSpanRight>
                {prettyNumber(getDisplayBalance(poolBalance, 18))}
              </InputLabelSpanRight>
              <BeforeChip className="custom-mahadao-chip">{selectedCollateralCoin}</BeforeChip>
            </OneLineInput>
          </OneLineInput>
        </div>
        <div style={{ marginBottom: '12px' }}>
              <OneLineInput>
                <div style={{ flex: 1 }}>
                  <TextForInfoTitle>Available to Mint</TextForInfoTitle>
                </div>
                <InputLabelSpanRight>{prettyNumber(getDisplayBalance(availableToMint, 18, 3))}</InputLabelSpanRight>
              </OneLineInput>
            </div>
        <div style={{ marginBottom: '12px' }}>
          <OneLineInput>
            <div style={{ flex: 1 }}>
              <TextForInfoTitle>
                Stability Fee
                <CustomToolTip toolTipText={'loreum ipsum'} />
              </TextForInfoTitle>
            </div>
            <InputLabelSpanRight>
              {
                Number(stabilityFee.toString())
                  .toLocaleString('en-US', { maximumFractionDigits: 2})
                // Number(getDisplayBalance(stabilityFee, 2, 2))
                //   .toLocaleString('en-US', { maximumFractionDigits: 2})
              }%
            </InputLabelSpanRight>
          </OneLineInput>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <OneLineInput>
            <div style={{ flex: 1 }}>
              <TextForInfoTitle>
                Minting Fee
                <CustomToolTip toolTipText={'loreum ipsum'} />
              </TextForInfoTitle>
            </div>
            <InputLabelSpanRight>
              {
                Number(getDisplayBalance(mintingFee, 4, 4))
                  .toLocaleString('en-US', {maximumFractionDigits: 4})
              }%
            </InputLabelSpanRight>
          </OneLineInput>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <OneLineInput>
            <div style={{ flex: 1 }}>
              <TextForInfoTitle>
                Redeeming Fee
                <CustomToolTip toolTipText={'loreum ipsum'} />
              </TextForInfoTitle>
            </div>
            <InputLabelSpanRight>
              {
                Number(getDisplayBalance(redeemingFee, 4, 4))
                  .toLocaleString('en-US', { maximumFractionDigits: 4 })
              }%
            </InputLabelSpanRight>
          </OneLineInput>
        </div>
      </RightTopCard>
      <RightBottomCard className={'custom-mahadao-box'}>
        <RightBottomCardTitle>
          Farming pools are great way to earn high interest by staking your $ARTH
        </RightBottomCardTitle>
        <Grid container style={{ marginTop: '16px' }}>
          <Grid item lg={4}>
            <Button text={'Earn Rewards'} size={'sm'} to={'/farming'}/>
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

const BeforeChip = styled.span`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0 4px;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.64);
`

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
