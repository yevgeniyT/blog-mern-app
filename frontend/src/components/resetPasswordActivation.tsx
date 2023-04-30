import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
// Used to grab token from url parameter /:token
import { useParams } from 'react-router';

// MUI components imports
import { Container, Typography, Box, Button } from '@mui/material';

// Other component import
import { resetPasswordVarification } from '../features/auth/authThanks';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Loading from './Loading';

const ResetPasswordActivation: React.FC = () => {
  // Create variablese to use hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // Create state to get email from backend response, store it and send using useNAvigate hook to ResetPasswordPage
  const [email, setEmail] = useState('');

  // 2. Get token from the URL
  const { token } = useParams();

  // 3. Get states from store to handle deiifent varification cases
  const { loading, error, message } = useAppSelector(state => state.authR);

  // 3. Send token authThank to be send next to backend as post request. And get email from response while request to verification reset password router in backend, as it returns imail needed to be paased with passowrd in reset request to identify user in DB
  useEffect(() => {
    if (token) {
      dispatch(resetPasswordVarification(token as string)).then(response => {
        setEmail(response.payload.email);
      });
    }
  }, [dispatch, token]);
  // 4. Redirect user incase of sucess to loding page. Using useEffect insted if conditional rendering in this case is to have more control over side effects like navigation. Since navigation is a side effect, it's a good practice to handle it inside a useEffect.
  useEffect(() => {
    if (!loading && !error) {
      setTimeout(() => {
        navigate(
          '/reset-password',
          //The navigate function accepts a second argument, which is an object containing navigation options. One of the properties in this object is state, which can be used to pass data between components during navigation.
          {
            state: { email: email },
          },
        );
      }, 1500);
    }
  }, [loading, error, message, navigate, email]);
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        {/* Render loading page in case of loading status */}
        {loading ? (
          <Loading />
        ) : // In case or error
        error ? (
          <Box textAlign="center">
            <Typography variant="h4">Reset password Failed</Typography>
            <Typography variant="body1">
              Reset password Failed. This could be due to an expired or invalid
              token.
            </Typography>
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate('/forgot-password');
                }}
              >
                Try again
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

export default ResetPasswordActivation;
