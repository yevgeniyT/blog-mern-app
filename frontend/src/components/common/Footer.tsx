import { NavLink } from 'react-router-dom';

import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Toolbar
            sx={{
              width: '100%',
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontSize: {
                  xs: '0.8rem',
                  sm: '0.8rem',
                  md: '1.0rem',
                  lg: '1.2rem',
                  xl: '1.4rem',
                },
              }}
            >
              © {2023} Developed by Yevgeniy Tolkachev
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  display: { xs: 'flex', md: 'flex' },
                  justifyContent: { xs: 'center', sm: 'flex-end' },
                  flexDirection: 'row',
                  gap: 1.5,
                }}
              >
                <NavLink to="/">
                  <IconButton>
                    <HomeIcon />
                  </IconButton>
                </NavLink>
                <a
                  href="https://github.com/yevgeniyT"
                  target={'_blank'}
                  rel="noopener noreferrer"
                >
                  <IconButton>
                    <GitHubIcon />
                  </IconButton>
                </a>
                <a
                  href="https://www.linkedin.com/in/yevgeniy-tolkachov/"
                  target={'_blank'}
                  rel="noopener noreferrer"
                >
                  <IconButton>
                    <LinkedInIcon />
                  </IconButton>
                </a>
              </Box>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
    </Box>
  );
};

export default Footer;
