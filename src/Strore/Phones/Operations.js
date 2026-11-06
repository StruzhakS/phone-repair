import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getPhonesApi,
  addPhoneApi,
  deletePhoneApi,
  updateModelApi,
  updateStatusPhoneApi,
} from '../../PhonesApi';

export const getallPhonesOperation = createAsyncThunk(
  'phone/getAllPhones',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getPhonesApi();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addPhoneOperation = createAsyncThunk(
  'phone/addPhone',
  async (phone, { rejectWithValue }) => {
    try {
      const { data } = await addPhoneApi(phone);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePhoneOperation = createAsyncThunk(
  'phone/deletePhone',
  async (id, { rejectWithValue }) => {
    try {
      await deletePhoneApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePhoneOperation = createAsyncThunk(
  'phone/updatePhone',
  async (changeData, { rejectWithValue }) => {
    try {
      const result = await updateModelApi(changeData);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePhoneStatusOperation = createAsyncThunk(
  'phone/updatePhoneStatus',
  async (statusData, { rejectWithValue }) => {
    try {
      const result = await updateStatusPhoneApi(statusData);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
