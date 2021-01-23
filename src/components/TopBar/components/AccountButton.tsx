import React from 'react';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import Button from '../../Button/TransperantButton';
import ButtonColored from '../../Button/';
import AccountModal from './AccountModal';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
interface AccountButtonProps {}

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
          <ButtonColored onClick={() => toggleModal(true)} size="sm" text="Connected">
            <AccountBalanceWalletOutlinedIcon className="margin-right-10 font20" />
          </ButtonColored>
        )}
      </StyledAccountButton>
    </>
  );
};

const StyledAccountButton = styled.div``;

export default AccountButton;
