import { createSlice } from '@reduxjs/toolkit';
import {
  addPhoneOperation,
  deletePhoneOperation,
  getallPhonesOperation,
  updatePhoneModelOperation,
} from './Operations';
import initialState from './initialState';

export const phonesSlice = createSlice({
  name: 'Phones',
  initialState,
  //   reducers: {
  //     filterContactAction: (state, action) => ({
  //       ...state,
  //       filter: action.payload,
  //     }),
  //   },
  extraReducers: builder => {
    builder
      .addCase(getallPhonesOperation.pending, state => {
        state.isLoading = true;
      })
      .addCase(getallPhonesOperation.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.phones = payload;
      })
      .addCase(getallPhonesOperation.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(addPhoneOperation.pending, state => {
        state.isLoading = true;
      })
      .addCase(addPhoneOperation.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.phones = [...state.phones, payload];
      })
      .addCase(addPhoneOperation.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(deletePhoneOperation.pending, state => {
        state.isLoading = true;
      })
      .addCase(deletePhoneOperation.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.phones = state.phones.filter(el => el.id !== payload.id);
      })
      .addCase(deletePhoneOperation.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(updatePhoneModelOperation.pending, state => {
        state.isLoading = true;
      })
      .addCase(updatePhoneModelOperation.fulfilled, (state, { payload }) => {
        const findIndex = state.phones.findIndex(el => el.id === payload.id);
        state.isLoading = false;
        state.error = null;
        state.phones[findIndex] = payload;
      })
      .addCase(updatePhoneModelOperation.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const phoneReducer = phonesSlice.reducer;
// export const { addContactAction, deleteContactAction, filterContactAction } =
//   contactSlice.actions;
