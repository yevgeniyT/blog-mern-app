// src/components/Navbar.tsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  role: 'admin' | 'visitor' | 'author';
  loggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ role, loggedIn }) => {
  const navigate = useNavigate();

  const goTo = (path: string) => {
    navigate(path);
  };

  const handleLoginLogout = () => {
    if (loggedIn) {
      // Implement logout functionality here
      console.log('Logged out');
    } else {
      goTo('/login');
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => goTo('/')}
        >
          {/* Add your logo/icon here */}
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Blog App
        </Typography>
        <Box>
          {role === 'admin' && (
            <Button color="inherit" onClick={() => goTo('/admin-dashboard')}>
              Admin Dashboard
            </Button>
          )}
          {role !== 'visitor' && (
            <Button color="inherit" onClick={() => goTo('/user-dashbord')}>
              Profile
            </Button>
          )}
          <Button color="inherit" onClick={() => goTo('/posts')}>
            All Posts
          </Button>
          {role === 'author' && (
            <Button color="inherit" onClick={() => goTo('/add-new-post')}>
              Create Post
            </Button>
          )}
          <Button color="inherit" onClick={handleLoginLogout}>
            {loggedIn ? 'Logout' : 'Login'}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
