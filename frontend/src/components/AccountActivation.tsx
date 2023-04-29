import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
// Used to grab token from url parameter /:token
import { useParams } from 'react-router';

// MUI components imports
import { Container, Typography, Box, Button } from '@mui/material';

// Other component import
import { verifyNewUser } from '../features/auth/authThanks';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Loading from './Loading';

const AccountActivation: React.FC = () => {
  // Create variablese to use hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 1. Get token from the URL
  const { token } = useParams();

  // 2. Get states from store to handle deiifent varification cases
  const { loading, error, message } = useAppSelector(state => state.usersR);

  // 3. Send token authThank to be send next to backend as post request
  useEffect(() => {
    if (token) {
      dispatch(verifyNewUser(token));
    }
  }, [dispatch, token]);
  // 4. Redirect user incase of sucess to loding page. Using useEffect insted if conditional rendering in this case is to have more control over side effects like navigation. Since navigation is a side effect, it's a good practice to handle it inside a useEffect.
  useEffect(() => {
    if (!loading && !error && message) {
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, [loading, error, message, navigate]);
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        {/* Render loading page in case of loading status */}
        {loading ? (
          <Loading />
        ) : // In case or error
        error ? (
          <Box textAlign="center">
            <Typography variant="h4">Verification Failed</Typography>
            <Typography variant="body1">
              The email verification failed. This could be due to an expired or
              invalid token.
            </Typography>
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate('/register');
                }}
              >
                Complete registartion again
              </Button>
            </Box>
            <Box mt={2}>
              <Typography variant="body2">
                If you continue to experience issues, please{' '}
                <a href="mailto:support@example.com">contact support</a>.
              </Typography>
            </Box>
          </Box>
        ) : (
          // in all other cases
          <Typography variant="h4" align="center">
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default AccountActivation;
