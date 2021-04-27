import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { UseWalletProvider } from 'use-wallet';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BasisCashProvider from './contexts/BasisCashProvider';
import ModalsProvider from './contexts/Modals';
import Farming from './views/Farming';
import Home from './views/Home';
import Stats from './views/Stats';
import Page from './components/Page';

import TopBar from './components/TopBar';

import store from './state';
import theme from './theme';
import Updaters from './state/Updaters';
import Popups from './components/Popups';
import config from './config';
import useBasisCash from './hooks/useBasisCash';

import './index.css';
import './App.css';
import Mint from './views/Mint';
import Stablize from './views/Stablize';
import Trade from './views/Trade';
import Pools from './views/Pools';
import { SnackbarProvider } from 'notistack';
import Genesis from './views/Genesis';

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
  // init animate on scroll
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Providers>
      <Router>
        <TopBar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/stats">
            <Stats />{' '}
          </Route>
          <Route path="/farming">
            <Page>
              <Farming />
            </Page>
          </Route>
          <Route path="/stabilize">
            <Page>
              <Stablize />
            </Page>
          </Route>
          <Route path="/mint">
            <Page>
              <Mint />
            </Page>
          </Route>
          <Route path="/trade">
            <Page>
              <Trade />
            </Page>
          </Route>
          <Route path="/pools">
            <Page>
              <Pools />
            </Page>
          </Route>
          <Route path="/genesis">
            <Page>
              <Genesis />
            </Page>
          </Route>
          {/* <Redirect to="/staking" /> */}
        </Switch>
      </Router>
    </Providers>
  );
};

const AppContent: React.FC = ({ children }) => {
  const basisCash = useBasisCash();

  // if (!!!account) return <UnlockWallet />;
  if (!basisCash) return <div>Loading</div>;

  return (
    <ModalsProvider>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        maxSnack={2}
        autoHideDuration={2500}
      >
        <>
          <Popups />
          {children}
        </>
      </SnackbarProvider>
    </ModalsProvider>
  );
};

export default App;
