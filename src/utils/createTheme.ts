import { createMuiTheme } from '@material-ui/core';

const palette = {
  primary: {
    light: '#B9DABB',
    main: '#1D6936',
    dark: '#112e0c',
  },
  background: {
    default: '#FFF',
  },
  warning: {
    main: '#FFEA9C',
  },
  error: {
    main: '#f12929',
  },
};

export default function createTheme() {
  const theme = createMuiTheme({
    palette,
    appLayout: {
      maxWidth: 1280,
    },
  });

  return theme;
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    appLayout: {
      maxWidth: React.CSSProperties['maxWidth'];
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    appLayout?: {
      maxWidth?: React.CSSProperties['maxWidth'];
    };
  }
}
