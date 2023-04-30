// EditProfile.tsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { IUser } from '../../@types/usersTypes';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

interface EditProfileProps {
  user: IUser;
  open: boolean;
  onClose: () => void;
  onSave: (updatedUser: IUser) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  user,
  open,
  onClose,
  onSave,
}) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(user.avatar);

  const handleSave = () => {
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      avatar,
    };

    onSave(updatedUser);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              color="primary"
              aria-label="upload avatar"
              component="label"
            >
              <PhotoCameraIcon />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </IconButton>
            <span>Change Avatar</span>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfile;
