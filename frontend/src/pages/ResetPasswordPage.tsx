//The ResetPasswordPage component allows users to reset their password. It uses the useLocation hook to access the email address passed from the previous page, checks if the provided passwords match, and dispatches the setNewPassword action from the authThanks feature. If the password reset is successful, the user is redirected to the login page. The component uses Material-UI components for the UI and displays loading, error, and success messages as necessary.
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
// The useLocation hook returns an object representing the current location (i.e., the current route and its associated information). Needed to get data psed by useNavigaion hook
import { useLocation } from 'react-router';

// MUI components imports
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Alert,
} from '@mui/material';

// Other component import
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setNewPassword } from '../features/auth/authThanks';
import Loading from '../components/Loading';
import { resetError } from '../features/auth/authSlice';

const ResetPasswordPage: React.FC = () => {
  // Initialize hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //Use the useLocation hook to get the current location.The location object has a state property, which contains the data passed during navigation.
  const location = useLocation();

  // 1. Set component state
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 2. Assign value to the variable from the location object, which has the state property received by using navigate from ResetPasswordActivation. Inside this property, we have a key "email" and its value. Use "?" to handle TypeScript's undefined case (If the state object is undefined, emailFromState will have an empty string as its value).
  const emailFromState = location.state?.email || '';

  // 3. Get loading, error, and message states from Redux store
  const { loading, error, message } = useAppSelector(state => state.authR);

  // 4. Store data in an object: new password and email received from the backend, to be sent as data needed to reset the password in the backend

  // 5. Prepare data to be sent to the backend
  const resetPasswordData = {
    email: emailFromState,
    password: password,
  };

  // 6. Send data to the authThunk to be sent next to the backend as a post request
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    //  Check first if passwords match. If not, save the message to the state to be shown to the user and stop the execution.
    if (password !== passwordConfirm) {
      setErrorMessage('Passwords do not match');
      return;
    }
    // If passwords match each other, dispatch the new password and email to the thunk
    dispatch(setNewPassword(resetPasswordData));
  };
  // 6. Redirect the user in case of success to the login page. Using useEffect instead of conditional rendering in this case is to have more control over side effects like navigation. Since navigation is a side effect, it's a good practice to handle it inside a useEffect.
  useEffect(() => {
    if (!loading && !error && message) {
      // Reset the error and message in state before navigating
      dispatch(resetError());
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, [loading, error, message, navigate, dispatch]);

  // Input actions handelers
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordConfirm(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      {/* Show a loading page when the request is being processed */}
      {loading && <Loading />}

      {/* Show an error message if there's an error */}
      {error && (
        <Box sx={{ mb: 2 }}>
          <Alert severity="error">{message}</Alert>
        </Box>
      )}

      {/* Show a success message if there's no error and a message is present */}
      {!error && message && (
        <Box sx={{ mb: 2 }}>
          <Alert severity="success">{message}</Alert>
        </Box>
      )}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center">
          Reset Password
        </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <Box sx={{ mt: 4 }}>
            <TextField
              required
              fullWidth
              name="password"
              type="password"
              label="New Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Box>
          <Box sx={{ mt: 4 }}>
            <TextField
              required
              fullWidth
              name="passwordConfirm"
              type="password"
              label="Confirm New Password"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
            />
          </Box>
          <Box sx={{ mt: 4 }}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Reset Password
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
