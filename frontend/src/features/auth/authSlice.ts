import { createSlice } from '@reduxjs/toolkit';

import { addNewUser } from './authThanks';

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
    //Create new User
    builder
      .addCase(addNewUser.pending, state => {
        state.loading = true;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        const newUser = action.payload;
        state.users = [...state.users, newUser];
        state.loading = false;
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        // Update the message with the error message from the action reciwed from thunk from catch block by throw new Error
        state.message =
          action.error.message ||
          // use alias to handle undefined type
          'Unable to create user account. Please try again.';
      });

    // Get all posts
    // builder
    //   .addCase(getAllPosts.pending, state => {
    //     state.loading = true;
    //     state.message = 'Data is pending ....';
    //   })
    //   .addCase(getAllPosts.fulfilled, (state, action) => {
    //     state.posts = action.payload;
    //     state.loading = false;
    //     state.error = false;
    //   })
    //   .addCase(getAllPosts.rejected, state => {
    //     state.error = true;
    //     state.loading = false;
    //     state.message = 'Data fetching failed';
    //     state.posts = [];
    //   });
    // Delete post
    // builder
    //   .addCase(deletePost.pending, state => {
    //     state.loading = true;
    //     state.error = false;
    //   })
    //   .addCase(deletePost.fulfilled, (state, action) => {
    //     const id = action.payload;
    //     state.loading = false;
    //     state.error = false;
    //     state.posts = state.posts.filter(post => post.id !== id);
    //   })
    //   .addCase(deletePost.rejected, state => {
    //     state.loading = false;
    //     state.error = true;
    //     state.message = 'Delete post failed';
    //   });
  },
});

export default userSlice.reducer;
