import { Button, Box } from "@mui/material";
import { useRouter } from "next/navigation"; // Updated import
import { useTheme } from '@mui/material/styles'; // Use theme hook
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Optional: Add an icon

const BackButton = () => {
  const router = useRouter();
  const theme = useTheme(); // Access the current theme

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 3 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />} // Optional: Add an icon for back
        onClick={handleGoBack}
        sx={{
          mb: 2,
          borderRadius: 2,
          color: theme.palette.primary.main, // Use primary color from theme
          borderColor: theme.palette.primary.main, // Border color matches primary color
          "&:hover": {
            backgroundColor: theme.palette.primary.main, // Background changes on hover
            color: "#fff", // Text color changes to white on hover
          },
        }}
      >
        Späť
      </Button>
    </Box>
  );
};

export default BackButton;
