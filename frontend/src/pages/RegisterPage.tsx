// Main dependencies import
import React, { useState, useCallback } from 'react';
import { useAppDispatch } from '../app/hooks';
import { useDropzone } from 'react-dropzone';

// MUI components imports
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { addNewUser } from '../features/auth/authThanks';

const RegistrationPage: React.FC = () => {
  const dispatch = useAppDispatch();
  // 1. Set nedded states
  // 1.1 Set state to get and store users data from input
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  // 1.2 Set state to get and strore avatar image
  const [avatar, setAvatar] = useState<File | null>(null);

  // 1.2 Set state to store readAsDataURL
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // 2. Actions handelers
  // 2.1 Handle actions on submit form data
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const newUserFormData = new FormData();
      newUserFormData.append('firstName', newUser.firstName);
      newUserFormData.append('lastName', newUser.lastName);
      newUserFormData.append('email', newUser.email);
      newUserFormData.append('password', newUser.password);
      if (avatar) {
        newUserFormData.append('avatarImage', avatar);
      }

      dispatch(addNewUser(newUserFormData));
    } catch (error) {
      //To avoid TypeScript error in catch block and to access the message property of the error, first check if the error is an instance of Error.
      if (error instanceof Error) {
        console.log('Error while creating form-data - ', error.message);
      } else {
        console.log('An unknown error occurred while creating form-data.');
      }
    }
  };
  // 2.2 Handle data from input fileds
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };
  // 2.3 Handle image upload
  // 2.3.1 Create .....
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setAvatar(acceptedFiles[0]);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPreviewUrl(reader.result);
        }
      };
      reader.readAsDataURL(acceptedFiles[0]);
    }
  }, []);
  // 2.3.2
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center">
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              style={{ height: '100%' }}
            >
              <div
                {...getRootProps()}
                style={{
                  border: '2px dashed #ccc',
                  borderRadius: '50%',
                  marginTop: '24px',
                  marginBottom: '24px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  minHeight: '150px',
                  width: '150px',
                  background: isDragActive ? '#ebebeb' : '',
                }}
              >
                <input {...getInputProps()} />
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{
                      borderRadius: '50%',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : isDragActive ? (
                  <p>Drop the image here ...</p>
                ) : (
                  <p>
                    Drag and drop your avatar image here, or click to select an
                    image
                  </p>
                )}
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="firstName"
                label="First Name"
                value={newUser.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="lastName"
                label="Last Name"
                value={newUser.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="email"
                type="email"
                label="Email"
                value={newUser.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                type="password"
                label="Password"
                value={newUser.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default RegistrationPage;
