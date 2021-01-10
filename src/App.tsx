import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useWallet, UseWalletProvider } from 'use-wallet';
import styled from 'styled-components';

import BanksProvider from './contexts/Banks';
import BasisCashProvider from './contexts/BasisCashProvider';
import ModalsProvider from './contexts/Modals';

import Banks from './views/Banks';
import Home from './views/Home';
import Bond from './views/Bond';
import Stats from './views/Stats';

import store from './state';
import theme from './theme';
import Updaters from './state/Updaters';
import Distributions from './views/Distributions';
import Popups from './components/Popups';
import config from './config';
import Button from './components/Button';
import useBasisCash from './hooks/useBasisCash';

const UnlockWallet = () => {
  const { connect } = useWallet();
  return (
    <Center>
      <p>
        To use the ARTH platform, please connect your Metamask Account with the Ropsten network
      </p>
      <Button onClick={() => connect('injected')} text="Unlock Wallet" />
    </Center>
  );
};

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider chainId={config.chainId} connectors={{ injected: {} }}>
        <Provider store={store}>
          <Updaters />
          <BasisCashProvider>
            <AppContent>{children}</AppContent>
          </BasisCashProvider>
        </Provider>
      </UseWalletProvider>
    </ThemeProvider>
  );
};
const App: React.FC = () => {
  return (
    <Providers>
      <Router>
        <Switch>
          {/* <Route path="/" exact>
            <Home />
          </Route> */}
          <Route path="/stats">
            <Stats />
          </Route>
          <Route path="/staking">
            <Banks />
          </Route>
          <Route path="/bonds">
            <Bond />
          </Route>
          <Route path="/distribution">
            <Distributions />
          </Route>
          <Redirect to="/stats" />
        </Switch>
      </Router>
    </Providers>
  );
};

const AppContent: React.FC = ({ children }) => {
  const { account } = useWallet();
  const basisCash = useBasisCash();

  if (!!!account) return <UnlockWallet />;
  if (!basisCash) return <div>Loading</div>;

  return (
    <ModalsProvider>
      <BanksProvider>
        <>
          <Popups />
          {children}
        </>
      </BanksProvider>
    </ModalsProvider>
  );
};

export default App;

const Center = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  max-width: 300px;
  color: #fff9;
  text-align: center;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
