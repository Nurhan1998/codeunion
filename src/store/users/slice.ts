import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EStorageKeys, setStorageData } from '../../shared';

import { EModalNames, IBaseUser, IUsersState, TNullable } from './types';
import { fetchInitialData } from './effects';

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
  reducers: {
    createUser: (state: IUsersState, action:PayloadAction<IBaseUser> ) => {
      if(!state.users.data) return;

      state.users.data.push(action.payload);
      setStorageData(EStorageKeys.USERS_DATA, JSON.stringify(state.users.data));
    },
    deleteUser: (state: IUsersState, action: PayloadAction<string>) => {
      if(!state.users.data) return;

      state.users.data = state.users.data.filter(item => item.email !== action.payload);
      setStorageData(EStorageKeys.USERS_DATA, JSON.stringify(state.users.data));
    },
    editUser: (state, action: PayloadAction<IBaseUser>) => {
      if(!state.users.data) return;

      state.users.data = state.users.data.map(elem => {
        const isCurrentUser = elem.email === action.payload.email;
        return isCurrentUser ? action.payload : elem;
      });
    },
    setEditingUserData: (state: IUsersState, action: PayloadAction<TNullable<IBaseUser>>) => {
      state.editingUserData = action.payload;
    },
    setActiveModal: (state: IUsersState, action: PayloadAction<TNullable<EModalNames>>) => {
      state.activeModal = action.payload;
    },
  },
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
