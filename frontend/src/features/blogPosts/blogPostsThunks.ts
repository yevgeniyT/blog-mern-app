import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// add type to handle error from backend respomse.data.massage as initialy it was undefined
interface ErrorResponseData {
  message: string;
}

const BASE_URL = 'http://localhost:8080/api/v1/blogs/posts';

// 1. Post request to register user to backend
const addNewBlogPost = createAsyncThunk(
  'auth/registerNewUser',
  async (newBlogPost: FormData) => {
    // log form data this way
    // for (const [key, value] of newUser) {
    //   console.log(key, value);
    // }

    try {
      const response = await axios.post(`${BASE_URL}/addblogpost`, newBlogPost);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // use type of error from axios to type error massege from backend
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorData = axiosError.response.data as ErrorResponseData;
        //When an error is thrown in the async thunk, Redux Toolkit automatically triggers the rejected case in the slice. The error object thrown in the thunk is passed to the rejected case through the action.error object.
        throw new Error(errorData.message);
      }
      throw new Error('Failed to create new user');
    }
  },
);

// 1. Get request to backend to get all posts
const getAllBlogPosts = createAsyncThunk('auth/getAllBlogPosts', async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    // use type of error from axios to type error massege from backend
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const errorData = axiosError.response.data as ErrorResponseData;
      //When an error is thrown in the async thunk, Redux Toolkit automatically triggers the rejected case in the slice. The error object thrown in the thunk is passed to the rejected case through the action.error object.
      throw new Error(errorData.message);
    }
    throw new Error('Failed to create new user');
  }
});

export { addNewBlogPost, getAllBlogPosts };
