import { createTheme } from '@mui/material/styles';

// Define the light theme palette
const lightPalette = {
  primary: {
    main: '#1976d2',
  },
  secondary: {
    main: '#6a0dad',
  },
  text: {
    primary: '#000000',
    secondary: '#555555',
  },
};

// Create the light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    ...lightPalette, // Apply updated light palette
  },
  typography: {
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Thinner button border radius
          padding: '8px 14px', // Thinner button padding
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none', // Remove underline by default
          fontStyle: 'italic', // Make text italic
          fontWeight: 'bold', // Make links bold (heavy)
          '&:hover': {
            textDecoration: 'underline', // Underline the text on hover
          },
        },
      },
    },
  },
});

// Define the dark theme palette with improved visibility
const darkPalette = {
  primary: {
    main: '#90caf9', // Light blue for primary elements
  },
  secondary: {
    main: '#00bcd4', // Fixed: removed extra spaces
  },
  background: {
    default: '#181818', // Slightly lighter dark background
    paper: '#242424', // Darker paper for elements like cards
  },
  text: {
    primary: '#ffffff', // White text for better visibility
    secondary: '#b0b0b0', // Softer secondary text, still readable
  },
};

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    ...darkPalette, // Apply updated dark palette
  },
  typography: {
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Thinner button border radius
          padding: '8px 14px', // Thinner button padding
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none', // Remove underline by default
          fontStyle: 'italic', // Make text italic
          fontWeight: 'bold', // Make links bold (heavy)
          '&:hover': {
            textDecoration: 'underline', // Underline the text on hover
          },
        },
      },
    },
  },
});
