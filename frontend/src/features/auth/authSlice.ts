import { createSlice } from '@reduxjs/toolkit';

import {
  forgotPassword,
  loginUser,
  registerNewUser,
  resetPasswordVarification,
  setNewPassword,
  verifyNewUser,
} from './authThanks';

import { IUser } from '../../@types/usersTypes';

const initialState = {
  users: [] as IUser[],
  loading: false,
  error: false,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Used to cleare message states to emtpy while navigating between pages
    resetError: state => {
      state.error = false;
      state.message = '';
    },
  },
  extraReducers: builder => {
    // 1. Register new User
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
    // 2. Verify new User
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
    // 3. login user
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.message = '';
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

    // 4. Reset ppassword
    // 3. login user
    builder
      .addCase(forgotPassword.pending, state => {
        state.loading = true;
        state.message = '';
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message =
          action.error.message || 'Unable to login. Please try again.';
      });

    // 5. Reset passowrd varification
    builder
      .addCase(resetPasswordVarification.pending, state => {
        state.loading = true;
      })
      .addCase(resetPasswordVarification.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        // state.message = action.payload.message;
      })
      .addCase(resetPasswordVarification.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message =
          action.error.message || 'Unable to reset password. Please try again.';
      });

    // 6. Reset passowrd varification
    builder
      .addCase(setNewPassword.pending, state => {
        state.loading = true;
      })
      .addCase(setNewPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.message = action.payload.message;
      })
      .addCase(setNewPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message =
          action.error.message || 'Unable to reset password. Please try again.';
      });
  },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
