import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    authR: authReducer,
    userR: userReducer,
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
