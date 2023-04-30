//The ForgotPasswordPage component is responsible for rendering a form that allows users to enter their email address and request a password reset link. It uses the forgotPassword async thunk from the authThanks feature to send the email to the server, and conditionally renders a loading indicator, error message, or success message based on the request's status. The component also disables the "Send Reset Link" button after a successful request to prevent users from sending multiple requests.

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';

import { forgotPassword } from '../features/auth/authThanks';
import Loading from '../components/Loading';

const ForgotPasswordPage: React.FC = () => {
  //  Hooks to dispatch actions and access state from the Redux store
  const dispatch = useAppDispatch();
  // get data from state to handle conditional rendering based on lodaing status
  const { loading, error, message } = useAppSelector(state => state.authR);

  // Local state for the email input field and requestSent status
  const [email, setEmail] = useState('');
  // Add a new state variable to track if the reset link was sent
  const [requestSent, setRequestSent] = useState(false);

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(forgotPassword(email));
  };
  // useEffect to update the requestSent state when the request is successful
  useEffect(() => {
    if (!loading && !error && message) {
      setRequestSent(true);
    }
  }, [loading, error, message]);

  return (
    <Container maxWidth="sm">
      {/* Show a loading indicator when the request is being processed */}
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
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mt={2}>
            <TextField
              required
              fullWidth
              name="email"
              type="email"
              label="Email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </Box>
          <Box mt={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              // Disable btn when loading and when link is sent once
              disabled={loading || requestSent}
            >
              Send Reset Link
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
