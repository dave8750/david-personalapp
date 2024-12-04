// src/sections/SignInView.tsx

"use client";

import {
  Button,
  Container,
  Typography,
} from "@mui/material";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub"; // Import GitHub icon

export default function SignInView() {
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
        p: 3,
        bgcolor: "background.paper", // Background color from theme
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      {/* Logo / Title */}
      <Typography variant="h5" sx={{ mb: 3, color: "text.primary" }}> {/* Using primary text color */}
        Prihlásenie
      </Typography>

      {/* Google Sign In */}
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={() => signIn("google")}
        sx={{
          mb: 1,
          borderRadius: 2, // Custom border-radius for Google button
          color: "primary.main", // Using primary color from theme
          borderColor: "primary.main", // Set border color to primary
          '&:hover': {
            backgroundColor: "primary.main",
            color: "#fff", // Change text color when hovering
          },
        }}
      >
        Prihlásiť sa účtom Google
      </Button>

      {/* GitHub Sign In */}
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GitHubIcon />}
        onClick={() => signIn("github")}
        sx={{
          mb: 1,
          borderRadius: 2, // Custom border-radius for GitHub button
          color: "secondary.main", // Using secondary color from theme
          borderColor: "secondary.main", // Set border color to secondary
          '&:hover': {
            backgroundColor: "secondary.main",
            color: "#fff", // Change text color when hovering
          },
        }}
      >
        Prihlásiť sa účtom GitHub
      </Button>
    </Container>
  );
}
