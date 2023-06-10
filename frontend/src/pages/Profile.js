import React from 'react';
import { Typography, CssBaseline, Container, Paper, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth0 } from '@auth0/auth0-react';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user)
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  
  return (
    isAuthenticated &&
      <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container component="main" >
        <Paper spacing={1} variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h5" align="center">
            Profile
          </Typography>
          <React.Fragment>
            <Box component="img" alt="Avatar" src={user.picture} />
            <Typography component="h2" variant="h5">{user.nickname}</Typography>
            <Typography>{user.email}</Typography>
          </React.Fragment>
          
        </Paper>
      </Container>
    </ThemeProvider>
  );
}