// UserCard.tsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardHeader,
  Avatar,
  Box,
  Grid,
} from '@mui/material';

import { IUser } from '../../@types/usersTypes';

interface UserCardProps {
  user: IUser;
  onEdit: () => void;
  onDelete: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  const { firstName, lastName, role, avatar } = user;

  return (
    <Card sx={{ width: '80%', maxWidth: 800 }}>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <Avatar
              alt={`${firstName} ${lastName}`}
              src={avatar}
              sx={{
                width: 150,
                height: 150,
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <CardHeader
            title={`${firstName} ${lastName}`}
            subheader={
              <Typography
                component="span"
                sx={{
                  textDecoration: role === 'admin' ? 'underline' : 'none',
                }}
              >
                {role}
              </Typography>
            }
          />
          <CardContent>
            {/* Additional information about the user can be added here */}
          </CardContent>
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingRight: '1rem',
            }}
          >
            <Button size="small" onClick={onEdit}>
              Edit
            </Button>
            <Button size="small" onClick={onDelete} color="error">
              Delete
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserCard;
