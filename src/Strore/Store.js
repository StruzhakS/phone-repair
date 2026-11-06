import { configureStore } from '@reduxjs/toolkit';
import phoneReducer from './Phones/PhonesSlice';

export const store = configureStore({
  reducer: {
    phone: phoneReducer,
  },
});
