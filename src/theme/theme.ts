// src/theme.ts
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

// 

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
  },
});


// Define the dark theme palette
// const darkPalette = {
//   primary: {
//     main: '#90caf9', // light blue
//   },
//   secondary: {
//     main: '#9b30b0', // purple (dark purple for dark mode)
//   },
//   background: {
//     default: '#121212', // dark background
//     paper: '#1c1c1c', // darker paper background
//   },
//   text: {
//     primary: '#e0e0e0', // light white text
//     secondary: '#a0a0a0', // gray text
//   },
// };

// Create the dark theme
// export const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//     ...darkPalette, // Apply updated dark palette
//   },
//   typography: {
//     h5: {
//       fontWeight: 600,
//       fontSize: '1.5rem',
//     },
//     body1: {
//       fontSize: '1rem',
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: '8px', // Thinner button border radius
//           padding: '8px 14px', // Thinner button padding
//         },
//       },
//     },
//   },
// });
