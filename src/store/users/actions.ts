import { PayloadAction } from '@reduxjs/toolkit';

import { EStorageKeys, setStorageData } from '../../shared';

import { EModalNames, IBaseUser, IUsersState, TNullable } from './types';

const createUser = (state: IUsersState, action:PayloadAction<IBaseUser> ) => {
  if(!state.users.data) return;

  state.users.data.push(action.payload);
  setStorageData(EStorageKeys.USERS_DATA, JSON.stringify(action.payload));
};
const deleteUser = (state: IUsersState, action: PayloadAction<string>) => {
  if(!state.users.data) return;

  state.users.data = state.users.data.filter(item => item.email !== action.payload);
  setStorageData(EStorageKeys.USERS_DATA, JSON.stringify(action.payload));
};

const editUser = (state: IUsersState, action: PayloadAction<IBaseUser>) => {
  if(!state.users.data) return;

  state.users.data = state.users.data.map(elem => {
    const isCurrentUser = elem.email === action.payload.email;
    return isCurrentUser   ? action.payload : elem;
  });
};
const setEditingUserData = (state: IUsersState, action: PayloadAction<TNullable<IBaseUser>>) => {
  state.editingUserData = action.payload;
};
const setActiveModal = (state: IUsersState, action: PayloadAction<TNullable<EModalNames>>) => {
  state.activeModal = action.payload;
};



export const userActions = {
  createUser,
  deleteUser,
  editUser,
  setEditingUserData,
  setActiveModal
};