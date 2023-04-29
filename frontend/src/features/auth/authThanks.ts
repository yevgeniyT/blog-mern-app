import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// add type to handle error from backend respomse.data.massage as initialy it was undefined
interface ErrorResponseData {
  message: string;
}

const BASE_URL = 'http://localhost:8080/api/v1/users';

const registerNewUser = createAsyncThunk(
  'users/registerNewUser',
  async (newUser: FormData) => {
    // log form data this way
    // for (const [key, value] of newUser) {
    //   console.log(key, value);
    // }

    try {
      const response = await axios.post(`${BASE_URL}/register`, newUser);
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
// post request to send token back to the backend to verify user
const verifyNewUser = createAsyncThunk(
  'users/verifyNewUser',
  // 1. get token from acountActivation component
  async (token: string) => {
    try {
      // 2. post request to the router verify-email from backend (see in userRouters)
      const response = await axios.post(`${BASE_URL}/verify-email`, { token });
      console.log(response.data);

      return response.data;
    } catch (error) {
      throw new Error('Failed to create new user');
    }
  },
);
export { registerNewUser, verifyNewUser };
