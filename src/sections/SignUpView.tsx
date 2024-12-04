"use client";

import { Button, Container, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub"; 

const SignUpView = () => {
  const handleSignInWithGoogle = () => {
    signIn("google");
  };

  const handleSignInWithGitHub = () => {
    signIn("github");
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
        p: 3,
        bgcolor: "background.paper",
        boxShadow: 1, // boxShadow is set directly for simplicity
        borderRadius: 2, // Use the default border radius from the theme
      }}
    >
      {/* Logo / Title */}
      <Typography variant="h5" sx={{ mb: 3, color: "text.primary" }}>
        Registrácia
      </Typography>

      {/* Sign-in link */}
      <Typography variant="body1" sx={{ mb: 6, color: "text.secondary" }}>
        Už máte účet? <a href="/auth/prihlasenie">Prihláste sa</a>
      </Typography>

      {/* Google Sign Up */}
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={handleSignInWithGoogle} 
        sx={{
          mb: 2,
          borderRadius: 2, // Use default border radius
          color: "primary.main", // Use primary color from theme
          borderColor: "primary.main",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "#fff", // Text color on hover
          },
        }}
      >
        Registrovať sa účtom Google
      </Button>

      {/* GitHub Sign Up */}
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GitHubIcon />}
        onClick={handleSignInWithGitHub} 
        sx={{
          mb: 3,
          borderRadius: 2, // Use default border radius
          color: "secondary.main", // Use secondary color from theme
          borderColor: "secondary.main",
          "&:hover": {
            backgroundColor: "secondary.main",
            color: "#fff", // Text color on hover
          },
        }}
      >
        Registrovať sa účtom GitHub
      </Button>
    </Container>
  );
};

export default SignUpView;
