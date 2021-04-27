import React from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import Button from '../../Button/Button';
import AccountModal from './AccountModal';
import walletIcon from '../../../assets/svg/wallet-24.svg';

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

const AccountButton: React.FC<AccountButtonProps> = () => {
  const [showModal, toggleModal] = React.useState(false);
  const { account, connect } = useWallet();

  return (
    <>
      {showModal && <AccountModal onClose={() => toggleModal(!showModal)} />}
      <StyledAccountButton>
        {!account ? (
          <Button variant='transparent' onClick={() => connect('injected')} size="sm" text="Connect" />
        ) : (
          <Button
            onClick={() => toggleModal(true)}
            size="sm"
            variant={'transparent'}
            text={truncateMiddle(account, 15, '.....')}
          >
            <img alt="wallet" src={walletIcon} className="margin-right-10" />
          </Button>
        )}
      </StyledAccountButton>
    </>
  );
};

const StyledAccountButton = styled.div``;

export default AccountButton;
