import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import {
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { black_palette, teal_palette } from './utils/metMuiThemes'
import { BrowserRouter, Route } from 'react-router-dom';
import createTheme from './utils/createTheme';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import backGroundWaves from "./images/waves.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      '.global-root': {
        width: '100%',
        maxWidth: '1440px',
        margin: '0px auto',
      },
    },
    root: {
      height: '100%',
      backgroundImage: `url(${backGroundWaves})`,
    },
  })
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={createTheme(black_palette, teal_palette)}>
      <BrowserRouter>
        <div className={classes.root}>
          <Route exact={true} path='/' render={() => (
            <>
              <Header />
              <Home />
              <Footer />
            </>
          )} />
          <Route exact={true} path='/contact' render={() => (
            <>
              <Header />
              <Contact />
              <Footer />
            </>
          )} />
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;

