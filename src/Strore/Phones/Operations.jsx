import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addPhoneApi,
  deletePhoneApi,
  getPhonesApi,
  updateModelApi,
} from 'PhonesApi';

export const getallPhonesOperation = createAsyncThunk(
  'Phones/getAll',
  async (_, thunkAPI) => {
    try {
      const data = await getPhonesApi();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addPhoneOperation = createAsyncThunk(
  'Phones/addphone',
  async (phone, thunkAPI) => {
    try {
      const { data } = await addPhoneApi(phone);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deletePhoneOperation = createAsyncThunk(
  'Phones/deletephone',
  async (id, thunkAPI) => {
    try {
      return await deletePhoneApi(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updatePhoneModelOperation = createAsyncThunk(
  'Phones/updatePhone',
  async (changedField, thunkAPI) => {
    try {
      const data = await updateModelApi(changedField);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
