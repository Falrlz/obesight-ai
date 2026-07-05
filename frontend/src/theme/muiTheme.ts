import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#0D9488', // Teal 600 (brand-teal)
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4F46E5', // Indigo 600 (brand-indigo)
    },
    background: {
      default: '#F5F5F7', // Apple Gray
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: [
      'Hanken Grotesk',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '9999px', // Pill-shaped buttons
          fontWeight: 600,
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
        },
      },
    },
  },
});

export default muiTheme;
