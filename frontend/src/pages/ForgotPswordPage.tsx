// ForgotPasswordPage.tsx
import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle sending the password reset email here
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
