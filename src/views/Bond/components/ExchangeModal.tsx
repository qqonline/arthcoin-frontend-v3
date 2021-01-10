import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Button from '../../../components/Button';
import Modal, { ModalProps } from '../../../components/Modal';
import ModalActions from '../../../components/ModalActions';
import ModalTitle from '../../../components/ModalTitle';
import TokenInput from '../../../components/TokenInput';
import { getBalance, getFullDisplayBalance } from '../../../utils/formatBalance';
import { BigNumber } from 'ethers';
import styled from 'styled-components';
import useBasisCash from '../../../hooks/useBasisCash';
import useStabilityFee from '../../../hooks/useStabilityFee';
import useBondStats from '../../../hooks/useBondStats';

interface ExchangeModalProps extends ModalProps {
  max: BigNumber;
  onConfirm: (amount: string) => void;
  title: string;
  description: string;
  action: string;
  tokenName: string;
}

const ExchangeModal: React.FC<ExchangeModalProps> = ({
  max,
  onConfirm,
  onDismiss,
  action,
  tokenName,
}) => {
  const [val, setVal] = useState(0);
  const [arthBAmount, setArthBAmount] = useState<BigNumber>(BigNumber.from(0));
  const basisCash = useBasisCash();
  const bondStat = useBondStats();
  const fullBalance = useMemo(() => getFullDisplayBalance(max), [max]);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => setVal(Math.floor(Number(e.currentTarget.value))),
    [setVal],
  );

  const handleSelectMax = useCallback(() => {
    setVal(Number(fullBalance));
  }, [fullBalance, setVal]);

  useEffect(() => {
    const job = async () => {
      const arthAmount = await basisCash.estimateAmountOutFromUniswap(Number(val), [
        basisCash.DAI,
        basisCash.ARTH,
      ]);

      // const mul = Math.floor(1 / Number(bondStat?.priceInDAI || 1) - 1);
      // const artbAmount = arthAmount.mul(mul);
      setArthBAmount(arthAmount);
    };

    job();
  }, [basisCash, bondStat, val]);

  const rorAmount = useMemo(() => {
    const input = Number(val);
    const output = Number(getFullDisplayBalance(arthBAmount));
    if (input === 0 || output === 0) return 0;
    return (output - input).toFixed(2);
  }, [arthBAmount, val]);

  const rorPercentage = useMemo(() => {
    const input = Number(val);
    const output = Number(getFullDisplayBalance(arthBAmount));
    if (input === 0 || output === 0) return 0;
    return ((100 * (output - input)) / input).toFixed(2);
  }, [arthBAmount, val]);

  const mahaStabilityFee = useStabilityFee();

  const mahaStabilityFeeAmount = useMemo(
    () => arthBAmount.mul(BigNumber.from(mahaStabilityFee)).div(100),
    [arthBAmount, mahaStabilityFee],
  );

  const finalRorAmount = useMemo(() => {
    const input = Number(val);
    const output = Number(getFullDisplayBalance(arthBAmount));
    if (input === 0 || output === 0) return 0;
    const amountAfterFees = output - (100 - mahaStabilityFee.toNumber()) / 100;
    return (amountAfterFees - input).toFixed(2);
  }, [arthBAmount, mahaStabilityFee, val]);

  const finalRorPercentage = useMemo(() => {
    const input = Number(val);
    const output = Number(getFullDisplayBalance(arthBAmount));
    if (input === 0 || output === 0) return 0;
    const amountAfterFees = output - (100 - mahaStabilityFee.toNumber()) / 100;
    return ((100 * (amountAfterFees - input)) / input).toFixed(2);
  }, [arthBAmount, mahaStabilityFee, val]);

  return (
    <Modal>
      <ModalTitle text={'Purchase ARTH Bonds'} />
      <TokenInput
        value={String(val)}
        onSelectMax={handleSelectMax}
        type="number"
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <StyledLabel>
        You are purchasing {getFullDisplayBalance(arthBAmount)} ARTHB which can be redeemed for
        approximately {getFullDisplayBalance(arthBAmount)} DAI
        <RorSpan>
          {' '}
          ({rorPercentage}% or ${rorAmount} ROR){' '}
        </RorSpan>
        when ARTH is back to it's target price.
      </StyledLabel>
      <StyledLabel>
        Please note that when you are redeeming your ARTH Bonds, there is 1% stability fee
        approximately {getFullDisplayBalance(mahaStabilityFeeAmount)} MAHA or 10$.
      </StyledLabel>

      <StyledLabel>
        <RorSpan>
          ROR after stability fees is {finalRorPercentage}% or ${finalRorAmount}
        </RorSpan>{' '}
        realisable when ARTH is trading above it's target price.
      </StyledLabel>
      <ModalActions>
        <Button text="Cancel" variant="secondary" onClick={onDismiss} />
        <Button
          disabled={arthBAmount.lte(0)}
          text={action}
          onClick={() => onConfirm(String(val))}
        />
      </ModalActions>
    </Modal>
  );
};

const StyledLabel = styled.div`
  color: #fff9;
  padding: 15px 15px 0;
  text-align: center;
`;

const RorSpan = styled.span`
  color: aqua;
  font-weight: bold;
`;

export default ExchangeModal;
