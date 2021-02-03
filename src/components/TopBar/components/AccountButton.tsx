import React from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import Button from '../../Button/TransperantButton';
import ButtonColored from '../../Button/';
import AccountModal from './AccountModal';
import walletIcon from '../../../assets/img/walletIcon.svg';
interface AccountButtonProps {}

const truncateMiddle = function (fullStr: string, strLen: number, separator: string) {
  if (fullStr.length <= strLen) return fullStr;

  separator = separator || '...';

  var sepLen = separator.length,
      charsToShow = strLen - sepLen,
      frontChars = Math.ceil(charsToShow/2),
      backChars = Math.floor(charsToShow/2);

  return fullStr.substr(0, frontChars) +
         separator +
         fullStr.substr(fullStr.length - backChars);
};

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const [showModal, toggleModal] = React.useState(false);

  const { account, connect } = useWallet();

  return (
    <>
      {showModal && <AccountModal onCancel={() => toggleModal(false)} />}
      <StyledAccountButton>
        {!account ? (
          <Button onClick={() => connect('injected')} size="sm" text="Connect" />
        ) : (
          <ButtonColored onClick={() => toggleModal(true)} size="sm" text="0xf7...a6d3">
            <img src={walletIcon} alt="" className="margin-right-10" width="24px" />
          </ButtonColored>
        )}
      </StyledAccountButton>
    </>
  );
};

const StyledAccountButton = styled.div``;

export default AccountButton;
