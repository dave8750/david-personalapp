"use client"; // Ensures this is a Client Component

import { signIn } from "next-auth/react";
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function LoginPage() {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login to ZoškaSnap
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => signIn('google', { callbackUrl: '/' })}
        sx={{ mt: 3 }}
      >
        Login with Google
      </Button>
    </Box>
  );
}
