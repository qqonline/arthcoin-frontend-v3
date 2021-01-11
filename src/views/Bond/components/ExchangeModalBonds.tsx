import React, { useCallback, useMemo, useState } from 'react';
import Button from '../../../components/Button';
import Modal, { ModalProps } from '../../../components/Modal';
import ModalActions from '../../../components/ModalActions';
import ModalTitle from '../../../components/ModalTitle';
import TokenInput from '../../../components/TokenInput';
import { getDisplayBalance, getFullDisplayBalance } from '../../../utils/formatBalance';
import { BigNumber } from 'ethers';
import MahaFeeCheck from './MahaFeeCheck';
import useBasisCash from '../../../hooks/useBasisCash';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useTokenBalance from '../../../hooks/useTokenBalance';
import styled from 'styled-components';

interface ExchangeModalProps extends ModalProps {
  max: BigNumber;
  onConfirm: (amount: string) => void;
  title: string;
  description: string;
}

const ExchangeModal: React.FC<ExchangeModalProps> = ({ max, title, onConfirm, onDismiss }) => {
  const [val, setVal] = useState('');
  const [mahaVal, setMahaVal] = useState('');

  const fullBalance = useMemo(() => getFullDisplayBalance(max), [max]);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => setVal(e.currentTarget.value),
    [setVal],
  );

  const {
    MAHA,
    contracts: { Treasury },
  } = useBasisCash();
  const [mahaApproveStatus, mahaApprove] = useApprove(MAHA, Treasury.address);

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal]);

  const action = 'Redeem';
  const tokenName = 'ARTHB';

  const mahaBalance = useTokenBalance(MAHA);

  const isMahaApproved = mahaApproveStatus === ApprovalState.APPROVED;
  const description =
    'You are going to redeem 20 ARTH by paying 20 ARTHB and a stability fee of 0.2 MAHA';

  return (
    <Modal>
      <ModalTitle text={'Redeem your ARTH Bonds'} />
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <MahaFeeCheck
        value={val}
        approve={mahaApprove}
        isMahaApproved={isMahaApproved}
        max={getDisplayBalance(mahaBalance)}
      />
      {/* <StyledLabel>{description}</StyledLabel> */}
      <ModalActions>
        <Button text="Cancel" variant="secondary" onClick={onDismiss} />
        <Button
          text={!isMahaApproved ? 'MAHA Not Approved' : action}
          disabled={!isMahaApproved || Number(val) <= 0}
          onClick={() => onConfirm(val)}
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

export default ExchangeModal;
