import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
} from '@mui/material';

import { loginUser } from '../features/auth/authThanks';
import Loading from '../components/Loading';

const LoginPage: React.FC = () => {
  // Use hook to conditionaly navigate user to needed page
  const navigate = useNavigate();
  // Use hook to dispatch data to thunk
  const dispatch = useAppDispatch();
  // get data from state to handle conditional rendering based on lodaing status
  const { loading, error, message } = useAppSelector(state => state.usersR);
  // 1. Set state to store email and password from input fields
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  // 2. Send data to thunk for post request to backend to login router
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(loginUser(credentials));

    // 3. Handle login logic here
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  // 4. Redirect user in case of sucess to userDashbord page. Using useEffect insted if conditional rendering in this case is to have more control over side effects like navigation. Since navigation is a side effect, it's a good practice to handle it inside a useEffect.
  useEffect(() => {
    if (!loading && !error && message) {
      setTimeout(() => {
        navigate('/user-dashbord');
      }, 1500);
    }
  }, [loading, error, message, navigate]);

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
            value={credentials.email}
            onChange={handleChange}
          />
        </Box>
        <Box mb={3}>
          <TextField
            required
            fullWidth
            name="password"
            type="password"
            label="Password"
            value={credentials.password}
            onChange={handleChange}
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
