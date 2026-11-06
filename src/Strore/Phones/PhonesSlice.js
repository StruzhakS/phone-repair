import { createSlice } from '@reduxjs/toolkit';
import {
  getallPhonesOperation,
  addPhoneOperation,
  deletePhoneOperation,
  updatePhoneOperation,
  updatePhoneStatusOperation,
} from './Operations';

const initialState = {
  phones: [],
  filter: 'all',
  filterById: '',
  loading: false,
  error: null,
};

const phoneSlice = createSlice({
  name: 'phone',
  initialState,
  reducers: {
    filterPhones(state, action) {
      state.filter = action.payload;
    },
    filterPhonesById(state, action) {
      state.filterById = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getallPhonesOperation.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getallPhonesOperation.fulfilled, (state, action) => {
        state.loading = false;
        state.phones = action.payload;
      })
      .addCase(getallPhonesOperation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addPhoneOperation.fulfilled, (state, action) => {
        state.phones.push(action.payload);
      })
      .addCase(deletePhoneOperation.fulfilled, (state, action) => {
        state.phones = state.phones.filter(phone => phone.id !== action.payload);
      })
      .addCase(updatePhoneOperation.fulfilled, (state, action) => {
        const index = state.phones.findIndex(phone => phone.id === action.payload.id);
        if (index !== -1) {
          state.phones[index] = action.payload;
        }
      })
      .addCase(updatePhoneStatusOperation.fulfilled, (state, action) => {
        const phone = state.phones.find(p => p.id === action.payload.id);
        if (phone) {
          phone.isSold = action.payload.isSold;
          phone.soldAt = action.payload.soldAt;
        }
      }),
});

export const { filterPhones, filterPhonesById } = phoneSlice.actions;
export default phoneSlice.reducer;
