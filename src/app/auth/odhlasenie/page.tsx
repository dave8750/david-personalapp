"use client"; // Ensures this is a Client Component

import { signOut } from "next-auth/react";
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function LogoutPage() {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sign out of ZoškaSnap
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => signOut({ callbackUrl: '/' })}
        sx={{ mt: 3 }}
      >
        Sign Out
      </Button>
    </Box>
  );
}
