// UserDashboard.tsx
import React from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';

const UserDashboard: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center">
          User Dashboard
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Account Details</Typography>
              <Typography variant="body1">Name: John Doe</Typography>
              <Typography variant="body1">
                Email: johndoe@example.com
              </Typography>
              {/* Add more user account details here */}
            </CardContent>
          </Card>
          {/* Add more cards or components to extend the dashboard functionality */}
        </Box>
      </Box>
    </Container>
  );
};

export default UserDashboard;
