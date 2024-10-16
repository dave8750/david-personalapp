"use client"; // Ensures client-side rendering for interactivity

import { signIn } from "next-auth/react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function NonAuthHomeView() {
  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography variant="h4">Welcome to ZoškaSnap</Typography>
      <Typography variant="body1">
        You are currently not logged in. Please sign in or register to explore the full features.
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
