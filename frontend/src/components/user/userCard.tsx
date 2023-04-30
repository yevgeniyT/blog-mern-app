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
} from '@mui/material';

import { IUser } from '../../@types/usersTypes';

interface UserCardProps {
  user: IUser;
  onEdit: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  const { firstName, lastName, role, avatarImage } = user;

  return (
    <Card>
      <CardHeader
        avatar={<Avatar alt={`${firstName} ${lastName}`} src={avatarImage} />}
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
      <CardActions>
        <Button size="small" onClick={onEdit}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
