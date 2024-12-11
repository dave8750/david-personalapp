"use client";

import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Container, Typography, Button, Link as MuiLink } from "@mui/material";
import NextLink from "next/link"; // Import Next.js Link

export default function SignInView() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // Horizontally center the container
        alignItems: "center", // Vertically center the container
        minHeight: "100vh", // Ensure the full height of the viewport is used
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          bgcolor: "background.paper", // Background color from theme
          boxShadow: 1,
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
            mb: 2,
            borderRadius: 2, // Custom border-radius for Google button
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
            mb: 3,
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

        {/* "Nemáte ešte účet? Registrovať sa" message */}
        <Typography variant="body1" sx={{ mt: 3, color: "text.secondary" }}>
          Nemáte ešte účet?{" "}
          <MuiLink
            component={NextLink}
            href="/auth/registracia"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              '&:hover': { color: 'primary.dark' },
            }}
          >
            Registrovať sa
          </MuiLink>
        </Typography>
      </Container>
    </div>
  );
}
