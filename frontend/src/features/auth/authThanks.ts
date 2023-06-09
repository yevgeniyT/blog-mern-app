import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { UserCredentials } from '../../@types/usersTypes';

// add type to handle error from backend respomse.data.massage as initialy it was undefined
interface ErrorResponseData {
  message: string;
}
interface ResetPasswordData {
  email: string;
  password: string;
}

interface ResetPasswordResponse {
  message: string;
}

const BASE_URL = 'http://localhost:8080/api/v1/users';

// 1. Post request to register user to backend
const registerNewUser = createAsyncThunk(
  'auth/registerNewUser',
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

// 2. Post request to send token back to the backend to verify user
const verifyNewUser = createAsyncThunk(
  'auth/verifyNewUser',
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

// 3. Post reqiest to backend login user
const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: UserCredentials) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials, {
        withCredentials: true,
      });
      console.log(response.data.message);

      return response.data;
    } catch (error) {
      // use type of error from axios to type error massege from backend
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorData = axiosError.response.data as ErrorResponseData;
        //When an error is thrown in the async thunk, Redux Toolkit automatically triggers the rejected case in the slice. The error object thrown in the thunk is passed to the rejected case through the action.error object.
        console.log(errorData.message);

        throw new Error(errorData.message);
      }
      throw new Error('Failed to login');
    }
  },
);
// 4. Post reqiest to send email to reset password
const forgotPassword = createAsyncThunk(
  'auth/forgotpassword',
  async (email: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/forgot-password`, {
        email,
      });
      console.log(response.data.message);
      return response.data;
    } catch (error) {
      // use type of error from axios to type error massege from backend
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorData = axiosError.response.data as ErrorResponseData;
        //When an error is thrown in the async thunk, Redux Toolkit automatically triggers the rejected case in the slice. The error object thrown in the thunk is passed to the rejected case through the action.error object.
        console.log(errorData.message);

        throw new Error(errorData.message);
      }
      throw new Error('Error on reseting password');
    }
  },
);

// 5 Post reqiest to verify email to reset password
const resetPasswordVarification = createAsyncThunk(
  'auth/resetPasswordVarification',
  async (token: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/verify-password`, {
        token,
      });
      console.log(response.data.message);
      return response.data;
    } catch (error) {
      // use type of error from axios to type error massege from backend
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorData = axiosError.response.data as ErrorResponseData;
        //When an error is thrown in the async thunk, Redux Toolkit automatically triggers the rejected case in the slice. The error object thrown in the thunk is passed to the rejected case through the action.error object.
        console.log(errorData);

        throw new Error(errorData.message);
      }
      throw new Error('Error on reseting password');
    }
  },
);
// 6 Post reqiest to reset password
const setNewPassword = createAsyncThunk<
  ResetPasswordResponse,
  ResetPasswordData
>('auth/setNewPassword', async resetPasswordData => {
  try {
    console.log(resetPasswordData);

    const response = await axios.put(
      `${BASE_URL}/set-newpassword`,
      resetPasswordData,
    );
    console.log(response.data.message);
    return response.data;
  } catch (error) {
    // use type of error from axios to type error massege from backend
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const errorData = axiosError.response.data as ErrorResponseData;
      //When an error is thrown in the async thunk, Redux Toolkit automatically triggers the rejected case in the slice. The error object thrown in the thunk is passed to the rejected case through the action.error object.
      console.log(errorData.message);

      throw new Error(errorData.message);
    }
    throw new Error('Error on reseting password');
  }
});
export {
  registerNewUser,
  verifyNewUser,
  loginUser,
  forgotPassword,
  resetPasswordVarification,
  setNewPassword,
};
