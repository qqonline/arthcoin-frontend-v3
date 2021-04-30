import React from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import Button from '../../Button/Button';
import ButtonColored from '../../Button/';
import AccountModal from './AccountModal';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import walletIcon from '../../../assets/svg/wallet-24.svg';
import CustomModal from '../../CustomModal';
import Loader from 'react-spinners/PulseLoader';

interface AccountButtonProps { }

const truncateMiddle = function (fullStr: string, strLen: number, separator: string) {
  if (fullStr.length <= strLen) return fullStr;

  separator = separator || '...';

  var sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2);

  return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
};

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const [showModal, toggleModal] = React.useState(false);
  const [connectModal, showConnectModal] = React.useState(false);
  let dummyWallet = {
    accountNumber: '123123123123123123',
    mahaTokens: 50,
    mahaDollars: 500,
    arthTokens: 50,
    arthDollars: 500,
    arthxTokens: 50,
    arthxDollars: 500,
  }

  const { account, connect } = useWallet();

  return (
    <>
      <CustomModal
        open={connectModal}
        closeButton
        handleClose={() => showConnectModal(false)}
        modalTitleStyle={{}}
        modalContainerStyle={{}}
        modalBodyStyle={{}}
        title={`Connecting Wallet`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', marginBlock: '32px', justifyContent: 'center', alignItems: 'center' }}>
          <Loader color={'#ffffff'} loading={true} size={10} margin={2} />
          <ModalSpan>Please check your MetaMask extension to continue logging in.</ModalSpan>
        </div>
      </CustomModal>
      {showModal && <AccountModal walletData={dummyWallet} onClose={() => toggleModal(!showModal)} />}
      <StyledAccountButton>
        {!account ? (
          <Button
            variant='transparent'
            onClick={() => {
              showConnectModal(true)
              connect('injected')
            }}
            size="sm"
            text="Connect"
          />
        ) : (
          <Button
            onClick={() => toggleModal(true)}
            size="sm"
            variant={'transparent'}
            text={truncateMiddle('21ehisnioiosuhohAHhuHSLIs', 15, '.....')}
          >
            <img src={walletIcon} className="margin-right-10" />
          </Button>
        )}
      </StyledAccountButton>
    </>
  );
};

const StyledAccountButton = styled.div``;
const ModalSpan = styled.span`
font-family: Inter;
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
text-align: center;
color: rgba(255, 255, 255, 0.88);
margin: 15px 0px 0px 0px;
`;
export default AccountButton;
