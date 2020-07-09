import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF5C00',
      light: '#f3734c',
    },
    secondary: {
      main: '#424242',
      light: '#FFFFFF',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Roboto', 'sans-serif',
    ].join(','),
    primary: '#2f2f2f',
    secondary: '#FF5C00',
    disabled: '#626567',
    black: '#242120',
  }
});

export default theme;
