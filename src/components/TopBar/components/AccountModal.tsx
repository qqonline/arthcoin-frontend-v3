import React, { useMemo } from 'react';
import styled from 'styled-components';
import useTokenBalance from '../../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../../utils/formatBalance';
import Modal from '../../NewModal/index';
import Label from '../../Label';
import useBasisCash from '../../../hooks/useBasisCash';
import TokenSymbol from '../../TokenSymbol';

interface props {
  onCancel?: Function;
}
const AccountModal: React.FC<props> = ({ onCancel }) => {
  const basisCash = useBasisCash();

  const bacBalance = useTokenBalance(basisCash.ARTH);
  const displayBacBalance = useMemo(() => getDisplayBalance(bacBalance), [bacBalance]);

  const basBalance = useTokenBalance(basisCash.MAHA);
  const displayBasBalance = useMemo(() => getDisplayBalance(basBalance), [basBalance]);

  const babBalance = useTokenBalance(basisCash.ARTHB);
  const displayBabBalance = useMemo(() => getDisplayBalance(babBalance), [babBalance]);
  const handleClose = () => {
    onCancel();
  };
  return (
    <Modal title="My Wallet" open handleClose={handleClose}>
      <div
      // className="dialog-class display-flex-column margin-left-right-20 margin-bottom-20 border-bottom"
      // style={{ minWidth: '300px' }}
      >
        {/* <div className="dialog-class-1 width-100">
          <span className="white font18">Connected with Metamask</span>
          {false && (
            <div style={{ maxWidth: '200px' }}>
              <TextButton>Change</TextButton>
            </div>
          )}
        </div> */}
        {/* <WalletDetils>
          <img src={metaMaskIcon} alt="Metamask" width="30px" />
          <CopyToClipboard text="0xf7dDfwefbefbefbfkaD62">
            <div className="dialog-class margin-left-20">
              <span className="white font18 margin-right-5">{`${walletAddress.substring(
                0,
                4,
              )}...${walletAddress.substring(walletAddress.length - 4)}`}</span>
              <img src={copyIcon} className="pointer" width="24px" />
            </div>
          </CopyToClipboard>
        </WalletDetils> */}
      </div>
      <Balances>
        <StyledBalanceWrapper>
          <TokenSymbol symbol="MAHA" />
          <Label text="MAHA" color="rgba(255, 255, 255, 0.64)" />
          <StyledBalance>
            <StyledValue>{displayBasBalance}</StyledValue>
            {/* <Label text="0.01 MAHA" color="rgba(255, 255, 255, 0.64)" /> */}
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="ARTH" />
          <Label text="ARTH" color="rgba(255, 255, 255, 0.64)" />
          <StyledBalance>
            <StyledValue>{displayBacBalance}</StyledValue>
            {/* <Label text="0.01 MAHA" color="rgba(255, 255, 255, 0.64)" /> */}
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="ARTHB" />
          <Label text="ARTHB" color="rgba(255, 255, 255, 0.64)" />
          <StyledBalance>
            <StyledValue>{displayBabBalance}</StyledValue>
            {/* <Label text="0.01 MAHA" color="rgba(255, 255, 255, 0.64)" /> */}
          </StyledBalance>
        </StyledBalanceWrapper>
      </Balances>
    </Modal>
  );
};

const StyledValue = styled.div`
  color: ${(props) => props.theme.color.grey[300]};
  font-size: 25px;
  margin-top: 10px;
  margin-bottom: 5px;
  font-weight: 700;
`;

const StyledBalance = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
`;

const Balances = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledBalanceWrapper = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  margin: 10px ${(props) => props.theme.spacing[3]}px;
`;
// const WalletDetils = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
//   width: 100%;
//   margin: 20px 0px;
// `;
export default AccountModal;
