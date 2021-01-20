import React from 'react';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { withStyles, Theme } from '@material-ui/core/styles';
import Button from '../../../components/Button';
import CardContent from '../../../components/CardContent';
import useBasisCash from '../../../hooks/useBasisCash';
import Label from '../../../components/Label';
import TokenSymbol from '../../../components/TokenSymbol';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import AddIcon from '@material-ui/icons/Add';
import useModal from '../../../hooks/useModal';
import ExchangeModal from './ExchangeModal';
import ERC20 from '../../../basis-cash/ERC20';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useCatchError from '../../../hooks/useCatchError';
import Spacer from '../../../components/Spacer';

interface ExchangeCardProps {
  action: string;
  fromToken: ERC20;
  fromTokenName: string;
  toToken: ERC20;
  toTokenName: string;
  addOnTokeName?: string;
  addOnToken?: string;
  priceDesc: string;
  onExchange: (amount: string) => void;
  disabled?: boolean;
  disabledDescription?: string;
}
const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#2A2827',
    color: 'white',
    fontWeight: 300,
    fontSize: '13px',
    borderRadius: '6px',
    padding: '20px',
  },
}))(Tooltip);
const ExchangeCard: React.FC<ExchangeCardProps> = ({
  action,
  fromToken,
  fromTokenName,
  addOnTokeName,
  addOnToken,
  toToken,
  toTokenName,
  priceDesc,
  onExchange,
  disabled = false,
  disabledDescription,
}) => {
  const catchError = useCatchError();
  const {
    contracts: { Treasury },
    ARTH,
    DAI,
  } = useBasisCash();
  const [diaApproveStatus, approveDai] = useApprove(DAI, Treasury.address);
  const [arthApproveStatus, approveArth] = useApprove(ARTH, Treasury.address);

  const balance = useTokenBalance(fromToken);

  const [onPresent, onDismiss] = useModal(
    <ExchangeModal
      title={action}
      description={priceDesc}
      max={balance}
      onConfirm={(value) => {
        onExchange(value);
        onDismiss();
      }}
      action={action}
      tokenName={fromTokenName}
    />,
  );

  const isARTHApproved = arthApproveStatus === ApprovalState.APPROVED;
  const isDAIApproved = diaApproveStatus === ApprovalState.APPROVED;

  return (
    <Card>
      <div className="dialog-class">
        <StyledCardTitle>Earn ARTH Bond</StyledCardTitle>
        <HtmlTooltip
          title={
            <span>
              When ARTH is below it’s target price; you can buy ARTH bonds with DAI by
              influencing the price on Uniswap. Bond tokens are bought at a discount are
              redeemed for a profit.
            </span>
          }
        >
          <InfoOutlinedIcon className="margin-left-10 white" />
        </HtmlTooltip>
      </div>
      <div className="border-bottom width-100 margin-bottom-20" />
      <CardContent>
        <StyledCardContentInner>
          {false && (
            <StyledCardDesc>
              When ARTH is below it's target price; you can buy ARTH Bonds with Dai by
              influencing the price on Uniswap. Bond tokens are bought at a discount and are
              redeemed for a profit.
            </StyledCardDesc>
          )}
          <StyledExchanger>
            <StyledToken>
              <StyledCardIcon>
                <TokenSymbol symbol={fromToken.symbol} size={54} />
              </StyledCardIcon>
              <Label text={fromTokenName} variant="normal" />
            </StyledToken>
            <StyledExchangeArrow>
              <ArrowRightAltIcon className="font26" />
            </StyledExchangeArrow>
            <StyledToken>
              <StyledCardIcon>
                <TokenSymbol symbol={toToken.symbol} size={54} />
              </StyledCardIcon>
              <Label text={toTokenName} variant="normal" />
            </StyledToken>
            <StyledExchangeArrow>
              <AddIcon className="font26" />
            </StyledExchangeArrow>
            <StyledToken>
              <StyledCardIcon>
                <TokenSymbol symbol={addOnToken} size={54} />
              </StyledCardIcon>
              <Label text={addOnTokeName} variant="normal" />
            </StyledToken>
          </StyledExchanger>
          <StyledDesc>{priceDesc}</StyledDesc>
          {false && (
            <StyledCardActions>
              {!isDAIApproved || !isARTHApproved ? (
                <>
                  <Button
                    disabled={
                      diaApproveStatus === ApprovalState.PENDING ||
                      diaApproveStatus === ApprovalState.UNKNOWN
                    }
                    onClick={() => catchError(approveDai(), `Unable to approve DAI`)}
                    text={`Approve DAI`}
                  />

                  <Spacer size="md" />

                  <Button
                    disabled={
                      isARTHApproved ||
                      arthApproveStatus === ApprovalState.PENDING ||
                      arthApproveStatus === ApprovalState.UNKNOWN
                    }
                    onClick={() => catchError(approveArth(), `Unable to approve ARTH`)}
                    text={
                      arthApproveStatus === ApprovalState.PENDING
                        ? 'Approving'
                        : arthApproveStatus === ApprovalState.APPROVED
                        ? 'ARTH Approved'
                        : 'Approve ARTH'
                    }
                  />
                </>
              ) : (
                <Button
                  text={disabledDescription || action}
                  onClick={onPresent}
                  disabled={disabled}
                />
              )}
            </StyledCardActions>
          )}
          <StyledCardActions>
            <Button text="Earn" onClick={onPresent} />
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};

const StyledCardTitle = styled.div`
  align-items: center;
  color: ${(props) => props.theme.color.grey[300]};
  display: flex;
  font-size: 18px;
  padding-top: 20px;
  font-weight: 600;
  height: 64px;
  justify-content: center;
  margin-top: ${(props) => -props.theme.spacing[3]}px;
`;

const StyledCardDesc = styled.div`
  margin-bottom: 26px;
  text-align: center;
  color: #fff9;
`;

const StyledCardIcon = styled.div`
  background-color: ${(props) => props.theme.color.grey[900]};
  width: 72px;
  height: 72px;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledExchanger = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[5]}px;
`;

const StyledExchangeArrow = styled.div`
  font-size: 20px;
  color: ${(props) => props.theme.color.grey[300]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  padding-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledToken = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[3]}px;
  width: 100%;
`;

const StyledDesc = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;
const Card = styled.div`
  background: linear-gradient(180deg, #1f1a1a 0%, #251c1d 100%);
  border-radius: 12px;
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.25);
  display: flex;
  flex: 1;
  flex-direction: column;
`;
export default ExchangeCard;
