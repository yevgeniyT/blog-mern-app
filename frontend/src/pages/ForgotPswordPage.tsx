// ForgotPasswordPage.tsx
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import { Container, Box, Typography, TextField, Button } from '@mui/material';

import { forgotPassword } from '../features/auth/authThanks';

const ForgotPasswordPage: React.FC = () => {
  // Use hook to dispatch data to thunk
  const dispatch = useAppDispatch();
  // get data from state to handle conditional rendering based on lodaing status
  const { loading, error, message } = useAppSelector(state => state.usersR);
  // create state to store data from input filed
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <Container maxWidth="sm">
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
            <Button type="submit" fullWidth variant="contained" color="primary">
              Send Reset Link
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
