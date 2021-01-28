import React, { useCallback, useMemo, useState } from 'react';
import Button from '../../../../components/Button';
import Modal from '../../../../components/NewModal/index';
import ButtonTransperant from '../../../../components/Button/TransperantButton';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import TokenInput from '../../../../components/TokenInput';
import { getDisplayBalance, getFullDisplayBalance } from '../../../../utils/formatBalance';
import { BigNumber } from 'ethers';
import MahaFeeCheck from '../MahaFeeCheck';
import useBasisCash from '../../../../hooks/useBasisCash';
import useApprove, { ApprovalState } from '../../../../hooks/useApprove';
import styled from 'styled-components';
import useTokenBalance from '../../../../hooks/useTokenBalance';
import useARTHMahaPrice from '../../../../hooks/useARTHMahaPrice';
import { Switch } from '@material-ui/core';

interface ExchangeModalProps {
  max: BigNumber;
  onConfirm: (amount: string, redeemForDai: boolean) => void;
  title: string;
  onCancel?: Function;
  description: string;
}

const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 35,
      height: 19,
      padding: 0,
      margin: 15,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(15px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: '#F7653B',
          borderColor: '#F7653B',
        },
      },
    },
    thumb: {
      width: 15,
      height: 15,
      boxShadow: 'none',
      color: 'white',
    },
    track: {
      borderRadius: 18 / 2,
      opacity: 1,
      backgroundColor: '#363130',
    },
    checked: {},
  }),
)(Switch);

const ExchangeModal: React.FC<ExchangeModalProps> = ({ max, title, onConfirm, onCancel }) => {
  const [val, setVal] = useState('');
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
  const [sellForDai, toggleCheckbox] = useState(false);

  const mahaToBurn = useMemo(() => arthMahaPrice.mul(BigNumber.from(Math.floor(Number(val) || 0))).div(100), [
    arthMahaPrice,
    val,
  ]);

  const handleCeckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleCheckbox(event.target.checked);
  };

  const isMahaApproved = mahaApproveStatus === ApprovalState.APPROVED;
  const isMahaApproving = mahaApproveStatus === ApprovalState.PENDING;

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

      <div
        className="font16 bold-600 row-centered"
        style={{
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}
      >
        <span style={{ opacity: sellForDai ? 0.5 : 1 }}>Sell ARTHB for ARTH</span>
        <AntSwitch checked={sellForDai} onChange={handleCeckbox} name="checkedC" />
        <span style={{ opacity: !sellForDai ? 0.5 : 1 }}>Sell ARTHB for DAI</span>
      </div>

      <div
        className="font14 row-centered"
        style={{
          color: '#fff',
        }}
      >
        {!sellForDai
          ? 'Redeeming ARTHB for ARTH allows you to further compound your ARTH for inflationary rewards from the Bond page when the protocol expands'
          : "Redeeming ARTHB for DAI allows you to close your position but won't give you the chance to earn ARTH rewards when the protocol expands."}
      </div>

      <ActionButton>
        <ResponsiveButtonWidth>
          <ButtonTransperant text="Cancel" variant="secondary" onClick={() => handleClose()} />
        </ResponsiveButtonWidth>
        <ResponsiveButtonWidth>
          <Button
            text={
              isMahaApproving ? 'Approving MAHA' : !isMahaApproved ? 'Approve Maha' : action
            }
            disabled={Number(val) <= 0 || isMahaApproving}
            onClick={() => (!isMahaApproved ? mahaApprove() : onConfirm(val, sellForDai))}
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
