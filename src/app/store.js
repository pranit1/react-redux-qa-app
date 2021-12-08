import { configureStore } from '@reduxjs/toolkit';
import qaSlice from '../features/qa/qaSlice';

export const store = configureStore({
  reducer: {
    qa: qaSlice,
  },
});