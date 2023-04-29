import { createSlice } from '@reduxjs/toolkit';

import { loginUser, registerNewUser, verifyNewUser } from './authThanks';

import { IUser } from '../../@types/usersTypes';

const initialState = {
  users: [] as IUser[],
  loading: false,
  error: false,
  message: '',
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    //Register new User
    builder
      .addCase(registerNewUser.pending, state => {
        state.loading = true;
      })
      .addCase(registerNewUser.fulfilled, (state, action) => {
        const newUser = action.payload;
        state.users = [...state.users, newUser];
        state.loading = false;
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        // Update the message with the error message from the action reciwed from thunk from catch block by throw new Error
        state.message =
          action.error.message ||
          // use alias to handle undefined type
          'Unable to create user account. Please try again.';
      });
    // Verify new User
    builder
      .addCase(verifyNewUser.pending, state => {
        state.loading = true;
      })
      .addCase(verifyNewUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.message = action.payload.message;
      })
      .addCase(verifyNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message =
          action.error.message ||
          'Unable to activate user account. Please try again.';
      });
    // login user
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message =
          action.error.message || 'Unable to login. Please try again.';
      });
  },
});

export default userSlice.reducer;
