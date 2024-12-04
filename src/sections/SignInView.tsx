// src/sections/SignInView.tsx

"use client";

import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Container, Typography, Button } from "@mui/material";

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
      {/* Title */}
      <Typography variant="h5" sx={{ mb: 3, color: "text.primary" }}>
        Prihlásiť sa
      </Typography>

      {/* Google Sign In Button */}
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={() => signIn("google")}
        sx={{
          mb: 1,
          borderRadius: 2, // Custom border-radius for Google button (you can remove this if you prefer theme styling)
          color: "primary.main", // Color from the theme (primary color)
          borderColor: "primary.main", // Set border color to primary color
          '&:hover': {
            backgroundColor: "primary.main", // Background color on hover
            color: "#fff", // Text color on hover
          },
        }}
      >
        Prihlásiť sa účtom Google
      </Button>

      {/* GitHub Sign In Button */}
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GitHubIcon />}
        onClick={() => signIn("github")}
        sx={{
          mb: 1,
          borderRadius: 2, // Custom border-radius for GitHub button
          color: "secondary.main", // Color from the theme (secondary color)
          borderColor: "secondary.main", // Set border color to secondary color
          '&:hover': {
            backgroundColor: "secondary.main", // Background color on hover
            color: "#fff", // Text color on hover
          },
        }}
      >
        Prihlásiť sa účtom GitHub
      </Button>
    </Container>
  );
}
