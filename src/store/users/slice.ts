import { createSlice } from '@reduxjs/toolkit';

import { IUsersState } from './types';
import { fetchInitialData } from './effects';
import { userActions } from './actions';

const initialState: IUsersState = {
  users: {
    data: null,
    error: null,
    loading: false
  },
  editingUserData: null,
  activeModal: null
};

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { ...userActions },
  extraReducers: builder => {
    builder
      .addCase(fetchInitialData.pending, state => {
        state.users.loading = true;
      })
      .addCase(fetchInitialData.fulfilled, (state, action) => {
        state.users.loading = false;
        state.users.data = action.payload;
      })
      .addCase(fetchInitialData.rejected, (state, action) => {
        state.users.loading = false;
        state.users.error = action.payload;
      });
  },
});

export const {
  createUser,
  deleteUser,
  editUser,
  setEditingUserData,
  setActiveModal
} = usersSlice.actions;

export default usersSlice;
