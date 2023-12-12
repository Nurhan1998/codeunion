import { createSelector } from '@reduxjs/toolkit';

import { IAppState } from '../index';


const selectUsersState = (state: IAppState) => state.usersSlice;


export const selectUsersDataState = createSelector(selectUsersState,state => state.users);
export const selectEditingUserData = createSelector(selectUsersState,state =>  state.editingUserData);

export const selectActiveModal = createSelector(selectUsersState,state => state.activeModal);
