import React from 'react';
import styled from 'styled-components';

import { useWallet } from 'use-wallet';

import useModal from '../../../hooks/useModal';

import Button from '../../Button/TransperantButton';
import ButtonColored from '../../Button/';
import AccountModal from './AccountModal';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const [onPresentAccountModal] = useModal(<AccountModal />)
  
  const { account, connect } = useWallet()

  return (
    <StyledAccountButton>
      {!account ? (
        <Button
          onClick={() => connect('injected')}
          size="sm"
          text="Connect"
        />
      ) : (
        <ButtonColored
          onClick={onPresentAccountModal}
          size="sm"
          text="0xf7...a6d3"
        >
          <AccountBalanceWalletOutlinedIcon className="margin-right-10 font20"/>
        </ButtonColored>
      )}
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div``

export default AccountButton