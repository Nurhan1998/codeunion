import { createAsyncThunk } from '@reduxjs/toolkit';

import { usersList } from '../../shared/constants/api';


export const fetchInitialData = createAsyncThunk(
  'user/fetchInitialData',
  async (_,thunkAPI) => {
    try {
      // const response = await fetch(USERS_API_URL);

      return usersList;
      // if(response.ok) return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);