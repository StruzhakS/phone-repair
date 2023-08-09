import { combineReducers } from '@reduxjs/toolkit';

import { phoneReducer } from './Phones/PhonesSlice';

export const reducer = combineReducers({
  phone: phoneReducer,
});
