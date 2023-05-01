import { createSlice } from '@reduxjs/toolkit';

import { IBlogPost } from '../../@types/blogPostTypes';
import { addNewBlogPost, getAllBlogPosts } from './blogPostsThunks';

const initialState = {
  blogPosts: [] as IBlogPost[],
  loading: false,
  error: false,
  message: '',
};

export const blogPostsSlice = createSlice({
  name: 'blogPosts',
  initialState,
  reducers: {
    // Used to cleare message states to emtpy while navigating between pages
  },
  extraReducers: builder => {
    // 1. Add new blog post
    builder
      .addCase(addNewBlogPost.pending, state => {
        state.loading = true;
      })
      .addCase(addNewBlogPost.fulfilled, (state, action) => {
        const newBlogPosts = action.payload;
        state.blogPosts = newBlogPosts;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(addNewBlogPost.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        // Update the message with the error message from the action reciwed from thunk from catch block by throw new Error
        state.message =
          action.error.message ||
          // use alias to handle undefined type
          'Unable to create user account. Please try again.';
      });
    // 2. Get all blog posts
    builder
      .addCase(getAllBlogPosts.pending, state => {
        state.loading = true;
      })
      .addCase(getAllBlogPosts.fulfilled, (state, action) => {
        const blogPost = action.payload.data;

        state.blogPosts = blogPost;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(getAllBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        // Update the message with the error message from the action reciwed from thunk from catch block by throw new Error
        state.message =
          action.error.message ||
          // use alias to handle undefined type
          'Unable to create user account. Please try again.';
      });
  },
});
export default blogPostsSlice.reducer;
