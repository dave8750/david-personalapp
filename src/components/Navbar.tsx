import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

// Mock session for demonstration purposes
const useMockSession = () => {
  // Replace this with your actual session logic later
  const isLoggedIn = false; // Change to true to simulate a logged-in user
  return { data: isLoggedIn ? { user: { name: 'User' } } : null };
};

const Navbar: React.FC = () => {
  const { data: session } = useMockSession();

  const handleSignIn = () => {
    console.log("Sign In");
    // Implement your sign-in logic here
  };

  const handleSignOut = () => {
    console.log("Sign Out");
    // Implement your sign-out logic here
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            MyApp
          </Link>
        </Typography>

        <Box>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
          <Button color="inherit" component={Link} href="/profile">
            Profile
          </Button>
          {session ? (
            <Button color="inherit" onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <Button color="inherit" onClick={handleSignIn}>
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
