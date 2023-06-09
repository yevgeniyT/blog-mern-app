import { createSlice } from '@reduxjs/toolkit';

import { getUserProfile } from './userThanks';
import { IUser } from '../../@types/usersTypes';

const initialState = {
  user: null as IUser | null,
  loading: false,
  error: false,
  message: '',
};

export const userProfile = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUserProfile.pending, state => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.User;

        state.loading = false;
        state.error = false;
        state.message = action.payload.message;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message =
          action.error.message || 'Unable to reset password. Please try again.';
        state.user = null;
        console.log(state.message);
      });
  },
});

export default userProfile.reducer;
