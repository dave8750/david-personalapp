"use client"; // Ensures client-side rendering for interactivity

import { Session } from "next-auth";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface Props {
  session: Session;
}

export default function AuthHomeView({ session }: Props) {
  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography variant="h4">Welcome back, {session.user?.name}!</Typography>
      <Typography variant="body1">
        This is the home page for registered users.
      </Typography>
    </Box>
  );
}
