import React from 'react';
import { Button, MuiThemeProvider } from '@material-ui/core';
import {
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import createTheme from './utils/createTheme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    pageContent: {
      paddingBottom: theme.spacing(4),
      [theme.breakpoints.up('md')]: {
        paddingBottom: theme.spacing(8),
      },
    },
  }),
);

const App: React.FC = () => {
  const styles = useStyles();

  return (
    <MuiThemeProvider theme={createTheme()}>
      <div className={styles.content}>
        <Button>Test</Button>
      </div>
    </MuiThemeProvider>
  );
};

export default App;

