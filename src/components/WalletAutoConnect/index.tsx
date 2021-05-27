import React, { useEffect } from 'react';
import { useWallet, UseWalletProvider } from 'use-wallet';

export const WalletAutoConnect = async () => {
    let { account, reset, connect } = useWallet();
    let shouldBeDisconnected = localStorage.getItem('disconnectWallet')
    useEffect(() => {
        if (!shouldBeDisconnected && !!!account) {
            connect('injected')
        }
    }
        , [])
    return true
}