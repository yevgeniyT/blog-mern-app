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

  const userProfile = useAppSelector(state => state.userR.user);

  // Define the handleEdit function
  const handleEdit = () => {
    console.log('Edit button clicked');
    // Implement the logic for editing a user here
  };
  const handleDelete = () => {
    console.log('Edit button clicked');
    // Implement the logic for editing a user here
  };
  return (
    <Container maxWidth="md">
      {userProfile && (
        <UserCard
          user={userProfile}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Container>
  );
};

export default UserDashboard;
