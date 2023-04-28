import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
} from '@mui/material';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 6 }}>
        <Typography variant="h4" align="center">
          Log In
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
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
        <Box mb={3}>
          <TextField
            required
            fullWidth
            name="password"
            type="password"
            label="Password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </Box>
        <Box mb={2}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Log In
          </Button>
        </Box>
        <Box mb={1} display="flex" justifyContent="space-between">
          <Link
            href="#"
            onClick={() => navigate('/forgot-password')}
            variant="body2"
          >
            Forgot Password?
          </Link>
          <Link href="#" onClick={() => navigate('/register')} variant="body2">
            Sign Up
          </Link>
        </Box>
      </form>
    </Container>
  );
};

export default LoginPage;
