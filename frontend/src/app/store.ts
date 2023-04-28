import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import usersReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    usersR: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
