import React, { useCallback, useMemo, useState } from 'react';
import Button from '../../../components/Button';
import Modal, { ModalProps } from '../../../components/Modal';
import ModalActions from '../../../components/ModalActions';
import ModalTitle from '../../../components/ModalTitle';
import TokenInput from '../../../components/TokenInput';
import { getFullDisplayBalance } from '../../../utils/formatBalance';
import { BigNumber } from 'ethers';
import styled from 'styled-components';

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
  title,
  description,
  onConfirm,
  onDismiss,
  action,
  tokenName,
}) => {
  const [val, setVal] = useState('');
  const fullBalance = useMemo(() => getFullDisplayBalance(max), [max]);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => setVal(e.currentTarget.value),
    [setVal],
  );

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal]);

  return (
    <Modal>
      <ModalTitle text={'Purchase ARTH Bonds'} />
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={'tokenName'}
      />
      <StyledLabel>
        You are purchasing 30,000 ARTHB which can be redeemed for approximately 32,000 DAI
         when ARTH is back to it's target price..</StyledLabel>
        <StyledLabel>Please note that when you are redeeming your ARTH Bonds, there is 1% stability fee that needs to be paid in $MAHA.</StyledLabel>
      <ModalActions>
        <Button text="Cancel" variant="secondary" onClick={onDismiss} />
        <Button text={action} onClick={() => onConfirm(val)} />
      </ModalActions>
    </Modal>
  );
};

const StyledLabel = styled.div`
  color: #fff9;
  padding: 15px 15px 0;
  text-align: center;
`;


export default ExchangeModal;
