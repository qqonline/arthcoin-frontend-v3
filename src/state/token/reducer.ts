import { createReducer } from '@reduxjs/toolkit';
import { BigNumber } from 'ethers';


export interface TokenState {
  mahaToken: {
    priceUSD: BigNumber
    circulatingSupply: BigNumber
    liquidityUSD: BigNumber
    balanceOf: BigNumber
  }

  arth: {
    priceUSD: BigNumber
    circulatingSupply: BigNumber
    liquidityUSD: BigNumber
    balanceOf: BigNumber
  }

  arthDaiLP: {
    priceUSD: BigNumber
    circulatingSupply: BigNumber
    liquidityUSD: BigNumber
    balanceOf: BigNumber
  }

  arthb: {
    priceUSD: BigNumber
    circulatingSupply: BigNumber
    liquidityUSD: BigNumber
    balanceOf: BigNumber
  }
}

export const initialState: TokenState = {
  mahaToken: {
    priceUSD: BigNumber.from(0),
    circulatingSupply: BigNumber.from(0),
    liquidityUSD: BigNumber.from(0),
    balanceOf: BigNumber.from(0),
  },

  arth: {
    priceUSD: BigNumber.from(0),
    circulatingSupply: BigNumber.from(0),
    liquidityUSD: BigNumber.from(0),
    balanceOf: BigNumber.from(0),
  },

  arthDaiLP: {
    priceUSD: BigNumber.from(0),
    circulatingSupply: BigNumber.from(0),
    liquidityUSD: BigNumber.from(0),
    balanceOf: BigNumber.from(0),
  },

  arthb: {
    priceUSD: BigNumber.from(0),
    circulatingSupply: BigNumber.from(0),
    liquidityUSD: BigNumber.from(0),
    balanceOf: BigNumber.from(0),
  }
};

export default createReducer(initialState, (builder) =>
  builder
    // .addCase(Actions.updateBalanceOf, (t, { payload }) => { t.nextEpochPoint = payload })
    // .addCase(Actions.updatePeriod, (t, { payload }) => { t.period = payload })
    // .addCase(Actions.updateCurrentEpoch, (t, { payload }) => { t.currentEpoch = payload })
    // .addCase(Actions.updateState, (t, {payload}) => {
    //   t.coreState = {
    //     uniswapRouter: payload.s.uniswapRouter,
    //     uniswapLiquidityPair: payload.s.uniswapLiquidityPair,
    //     cashTargetPrice: payload.s.cashTargetPrice,
    //     cashToBondConversionLimit: payload.s.cashToBondConversionLimit,
    //     accumulatedBonds: payload.s.accumulatedBonds,
    //     accumulatedSeigniorage: payload.s.accumulatedSeigniorage,
    //     contractionRewardPerEpoch: payload.s.contractionRewardPerEpoch,
    //   }
    //   t.oracleState = payload.o;
    //   t.boardroomState = payload.b;
    // })
);
