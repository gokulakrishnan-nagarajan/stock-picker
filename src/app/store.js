import { configureStore } from '@reduxjs/toolkit';

import symbolReducer from './reducers/symbolSlice';

export const store = configureStore({
  reducer: {
    symbol: symbolReducer,
  },
});
