import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';
import { createLogger } from 'redux-logger'

import transactions from './transactions/reducer';
import application from './application/reducer';
import token from './token/reducer';
import slippage from './slippage/reducer';

const PERSISTED_KEYS: string[] = ['transactions', 'token', 'slippage'];

const store = configureStore({
  reducer: {
    application,
    transactions,
    token,
    slippage
  },
  middleware: [
    ...getDefaultMiddleware({ serializableCheck: false, thunk: false }),
    save({ states: PERSISTED_KEYS }),
    createLogger()
  ],
  preloadedState: load({ states: PERSISTED_KEYS }),
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
