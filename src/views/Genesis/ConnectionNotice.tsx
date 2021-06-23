import { useWallet } from 'use-wallet';
import styled from 'styled-components';
import Countdown from 'react-countdown';
import Grid from '@material-ui/core/Grid';
import {
  Checkbox,
  CheckboxProps,
  createStyles,
  Divider,
  LinearProgress,
  makeStyles,
  Slider,
  Theme,
  withStyles,
} from '@material-ui/core';
import { parseUnits } from 'ethers/lib/utils';
import Loader from 'react-spinners/BeatLoader';
import { useMediaQuery } from 'react-responsive';
import { BigNumber } from '@ethersproject/bignumber';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import React, { useEffect, useMemo, useState } from 'react';
import makeUrls, { TCalendarEvent } from 'add-event-to-calendar';

import calendar from '../../assets/svg/calendar.svg';
import arrowDown from '../../assets/svg/arrowDown.svg';
import TicketGreen from '../../assets/svg/TicketGreen.svg';

import Button from '../../components/Button';
import Container from '../../components/Container';
import TransparentInfoDiv from './components/InfoDiv';
import CustomModal from '../../components/CustomModal';
import { CustomSnack } from '../../components/SnackBar';
import prettyNumber from '../../components/PrettyNumber';
import UnderstandMore from './components/UnderstandMore';
import CustomToolTip from '../../components/CustomTooltip';
import SlippageContainer from '../../components/SlippageContainer';
import CustomSuccessModal from '../../components/CustomSuccesModal';
import { WalletAutoConnect } from '../../components/WalletAutoConnect';
import CustomInputContainer from '../../components/CustomInputContainer';
import { ValidateNumber } from '../../components/CustomInputContainer/RegexValidation';

import useCore from '../../hooks/useCore';
import useTokenDecimals from '../../hooks/useTokenDecimals';
import { getDisplayBalance, getDisplayBalanceToken } from '../../utils/formatBalance';
import useTokenBalance from '../../hooks/state/useTokenBalance';
import useApprove, { ApprovalState } from '../../hooks/callbacks/useApprove';
import useARTHXOraclePrice from '../../hooks/state/controller/useARTHXPrice';
import useGlobalCollateralValue from '../../hooks/state/useGlobalCollateralValue';
import useARTHCirculatingSupply from '../../hooks/state/useARTHCirculatingSupply';
import useCollateralPoolPrice from '../../hooks/state/pools/useCollateralPoolPrice';
import usePerformRecollateralize from '../../hooks/callbacks/performRecollateralize';
import usePercentageCompleted from '../../hooks/state/controller/usePercentageCompleted';
import useRedeemAlgorithmicARTH from '../../hooks/callbacks/pools/useRedeemAlgorithmicARTH';
import useRecollateralizationDiscount from '../../hooks/state/controller/useRecollateralizationDiscount';
import useConfig from '../../hooks/useConfig';
import DepositModal from './components/DepositModal';
import { Mixpanel } from '../../analytics/Mixpanel';

withStyles({
  root: {
    color: 'rgba(255, 255, 255, 0.32)',
    '&$checked': {
      color: '#FF7F57',
    },
  },
  checked: {
    color: 'white',
  },
})((props: CheckboxProps) => <Checkbox {...props} />);

makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    margin: {
      height: theme.spacing(3),
    },
  }),
);

withStyles({
  root: {
    height: 15,
    width: '95%',
  },
  thumb: {
    height: 10,
    width: 10,
    border: '2px solid currentColor',
    color: '#FFA981',
    marginTop: -3.5,
    marginLeft: -3,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-100% - 5px)',
  },
  marked: {
    color: 'red',
  },
  markLabel: {},
  track: {
    height: 3,
    borderRadius: 3,
    color: '#FFA981',
  },
  rail: {
    height: 3,
    borderRadius: 3,
    color: '#D74D26',
  },
  markLabelActive: {
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: '12px',
    lineHeight: '130%',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.88)',
  },
  mark: {
    color: 'transparent',
  },
})(Slider);

const ConnectionNotice = () => {
  const addMaticToMetamask = () => {
    // @ts-ignore
    if (window.ethereum) {
      // @ts-ignore
      window.ethereum
        .request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x89',
              chainName: 'Matic Network',
              rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
              iconUrls: [
                'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png',
              ],
              blockExplorerUrls: ['https://polygonscan.com/'],
              nativeCurrency: {
                name: 'Matic Token',
                symbol: 'MATIC',
                decimals: 18,
              },
            },
          ], // you must have access to the specified account
        })
        .then((result: any) => {
          window.location.reload();
        })
        .catch((error: any) => {
          if (error.code === 4001) {
            // EIP-1193 userRejectedRequest error
            console.log('We can encrypt anything without the key.');
          } else {
            console.error(error);
          }
        });
    }
  };

  return (
    <ConnectionNote>
      To participate in the Genesis, you must either be connected to the Ethereum network or to
      the Matic/Polygon network.
      <br />
      <br />
      <AddPolygon onClick={addMaticToMetamask}>
        Click here to add Polygon to your Metamask
      </AddPolygon>
      <br />
      Once you are in the right network, you can connect your wallet and enter into the site.
      <br />
      <br />
    </ConnectionNote>
  );
};

const ConnectionNote = styled.div`
  width: 60%;
  text-align: center;
  color: #fff;
  margin: 24px auto 0 auto;
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: rgba(255, 255, 255, 0.88);
`;

const AddPolygon = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: #ff7f57;
  cursor: pointer;
`;

export default ConnectionNotice;
