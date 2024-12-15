import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './currencySlice';
// import watchlistReducer from './watchlistSlice';

const store = configureStore({
  reducer: {
    currency: currencyReducer,
    // watchlist: watchlistReducer,
  },
});

export default store;