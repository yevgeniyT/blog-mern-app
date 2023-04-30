// UserDashboard.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import { Container } from '@mui/material';
import UserCard from '../components/user/userCard';
import { getUserProfile } from '../features/user/userThanks';

const UserDashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const userProgile = useAppSelector(state => state.userR.user);

  return <Container maxWidth="md">user profile</Container>;
};

export default UserDashboard;
