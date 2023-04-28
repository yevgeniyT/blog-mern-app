import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
// Used to grab token from url parameter /:token
import { useParams } from 'react-router';

// MUI components imports
import { Container, Typography, Box } from '@mui/material';

// Other component import
import { verifyNewUser } from '../features/auth/authThanks';

const AccountActivation: React.FC = () => {
  const dispatch = useAppDispatch();
  // 1. Get token from the URL
  const { token } = useParams();

  // 2. Set state for activation status and set loading by default
  //   const [activationStatus, setActivationStatus] = useState<
  //     'loading' | 'success' | 'error'
  //   >('loading');

  // 3. Set state for activation massage and set empty meaasge by default
  //   const [errorMessage, setErrorMessage] = useState<string>('');

  // 4. Send token authThank to be send next to backend as post request
  useEffect(() => {
    if (token) {
      dispatch(verifyNewUser(token));
    }
  }, [dispatch]);

  return (
    <Box>
      <p>ActivationComponent</p>
    </Box>
  );
};

export default AccountActivation;
