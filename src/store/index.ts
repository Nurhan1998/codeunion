import { configureStore } from '@reduxjs/toolkit';

import usersSlice, { IUsersState } from './users';

export interface IAppState {
    usersSlice: IUsersState
}
export const store = configureStore<IAppState>({
  reducer: {
    usersSlice: usersSlice.reducer
  }
});

export type AppDispatch = typeof store.dispatch;
