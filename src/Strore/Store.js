import { phoneReducer } from './Phones/PhonesSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    phone: phoneReducer,
  },
});
