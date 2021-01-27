import React, { useCallback, useMemo, useState } from 'react';
import Button from '../../../../components/Button';
import Modal from '../../../../components/NewModal/index';
import ButtonTransperant from '../../../../components/Button/TransperantButton';
import ModalActions from '../../../../components/ModalActions';
import TokenInput from '../../../../components/TokenInput';
import { getDisplayBalance, getFullDisplayBalance } from '../../../../utils/formatBalance';
import { BigNumber } from 'ethers';
import MahaFeeCheck from '../MahaFeeCheck';
import useBasisCash from '../../../../hooks/useBasisCash';
import useApprove, { ApprovalState } from '../../../../hooks/useApprove';
import styled from 'styled-components';
import useTokenBalance from '../../../../hooks/useTokenBalance';
import useARTHMahaPrice from '../../../../hooks/useARTHMahaPrice';

interface ExchangeModalProps {
  max: BigNumber;
  onConfirm: (amount: string) => void;
  title: string;
  onCancel?: Function;
  description: string;
}

const ExchangeModal: React.FC<ExchangeModalProps> = ({ max, title, onConfirm, onCancel }) => {
  const [val, setVal] = useState('');
  const [mahaVal, setMahaVal] = useState('');
  const [openModal, toggleModalState] = useState(true);
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

  const arthMahaPrice = useARTHMahaPrice();
  const mahaBalance = useTokenBalance(MAHA);

  const mahaToBurn = useMemo(() => arthMahaPrice.mul(Number(val || 0)).div(100), [
    arthMahaPrice,
    val,
  ]);

  const isMahaApproved = mahaApproveStatus === ApprovalState.APPROVED;
  const description = `You are going to redeem ${val} ARTH by paying ${val} ARTHB and a stability fee of ${getDisplayBalance(
    mahaToBurn,
    18,
    3,
  )} MAHA`;
  const handleClose = () => {
    onCancel();
  };
  return (
    <Modal open title="Redeem your ARTH Bonds" handleClose={handleClose}>
      <p
        className="font16 bold-600 row-centered"
        style={{ color: 'rgba(255, 255, 255, 0.88)' }}
      >
        {description}
      </p>
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <MahaFeeCheck
        value={mahaToBurn}
        approve={mahaApprove}
        isMahaApproved={isMahaApproved}
        max={getDisplayBalance(mahaBalance)}
      />
      <ActionButton>
        <ResponsiveButtonWidth>
          <ButtonTransperant text="Cancel" variant="secondary" onClick={() => handleClose()} />
        </ResponsiveButtonWidth>
        <ResponsiveButtonWidth>
          <Button
            text={!isMahaApproved ? 'MAHA Not Approved' : action}
            disabled={!isMahaApproved || Number(val) <= 0}
            onClick={() => onConfirm(val)}
          />
        </ResponsiveButtonWidth>
      </ActionButton>
    </Modal>
  );
};

const ActionButton = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.color.grey[100]}00;
  display: flex;
  height: 96px;
  justify-content: space-between;
  margin: ${(props) => props.theme.spacing[4]}px ${(props) => -props.theme.spacing[4]}px
    ${(props) => -props.theme.spacing[4]}px;
  padding: 0 ${(props) => props.theme.spacing[4]}px;
  @media (max-width: 768px) {
    flex-direction: column;
  } ;
`;
const ResponsiveButtonWidth = styled.div`
  width: 250px;
  @media (max-width: 768px) {
    width: 100%;
  } ;
`;
export default ExchangeModal;
