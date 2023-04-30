// UserDashboard.tsx
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import { Container } from '@mui/material';
import UserCard from '../components/user/userCard';
import { getUserProfile } from '../features/user/userThanks';
import EditProfile from '../components/user/EditProfile';
import { IUser } from '../@types/usersTypes';

const UserDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  // On each render  action to get user data is dispatched
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  // get user data from store
  const userProfile = useAppSelector(state => state.userR.user);

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Define the handleEdit function
  const handleEdit = () => {
    setEditDialogOpen(true);
  };
  const handleDelete = () => {
    console.log('Edit button clicked');
    // Implement the logic for editing a user here
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditDialogSave = (updatedUser: IUser) => {
    // Save the updated user data (e.g., dispatch an update action)
    console.log('Updated user data:', updatedUser);
    setEditDialogOpen(false);
  };
  return (
    <Container maxWidth="md">
      {userProfile && (
        <>
          <UserCard
            user={userProfile}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <EditProfile
            user={userProfile}
            open={editDialogOpen}
            onClose={handleEditDialogClose}
            onSave={handleEditDialogSave}
          />
        </>
      )}
    </Container>
  );
};

export default UserDashboard;
