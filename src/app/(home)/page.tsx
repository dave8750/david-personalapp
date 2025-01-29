// src/app/(home)/page.tsx

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export const metadata = { title: "Domov | ZoškaSnap" };

export default async function HomePage() {

  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/prispevok");
  }

  // Show the unauthenticated home view for non-authenticated users
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Vitajte na našej stránke!
        </Typography>
        <Typography variant="body1" paragraph>
          Nie ste prihlásený. Pre prístup k plným funkciám sa prihláste alebo zaregistrujte.
        </Typography>
        <Box display="flex" gap={2}>
          <Button 
            variant="contained" 
            color="primary" 
            href="auth/prihlasenie"
            sx={{
              "&:hover": {
                backgroundColor: "#3f51b5", // Darker primary color for hover
                transform: "scale(1.05)", // Slight scale up on hover
                transition: "all 0.3s ease", // Smooth transition
              }
            }}
          >
            Prihlásiť sa
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            href="auth/registracia"
            sx={{
              "&:hover": {
                borderColor: "#3f51b5", // Matching border color on hover
                color: "#3f51b5", // Text color on hover
                transform: "scale(1.05)", // Slight scale up on hover
                transition: "all 0.3s ease", // Smooth transition
              }
            }}
          >
            Registrovať sa
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
