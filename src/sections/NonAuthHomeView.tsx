// src/app/(home)/NonAuthHomeView.tsx

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function NonAuthHomeView() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Vitajte na SnapZoška!
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
              backgroundColor: "#3f51b5",
              transform: "scale(1.05)",
              transition: "all 0.3s ease",
            },
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
              borderColor: "#3f51b5",
              color: "#3f51b5",
              transform: "scale(1.05)",
              transition: "all 0.3s ease",
            },
          }}
        >
          Registrovať sa
        </Button>
      </Box>
    </Box>
  );
}
