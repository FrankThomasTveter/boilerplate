import React, { useState } from 'react';
import { MuiThemeProvider, SimplePaletteColorOptions } from '@material-ui/core';
import {
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { paletteMap, paletteAsString } from './utils/metMuiThemes';
import { BrowserRouter, Route } from 'react-router-dom';
import createTheme from './utils/createTheme';
import Home from './pages/Home';
import Chart from './Chart/Chart';
import Header from './components/Header';
import Footer from './components/Footer';
import backGroundWaves from "./images/waves.png";

const useStyles = makeStyles((theme: Theme) =>createStyles(
    {
	'@global': {
	    '.global-root': {
		width: '100%',
		maxWidth: '1440px',
		margin: '0px auto',
	    },
	},
	root: {
	    display:'flex',
	    flexFlow:'column',
	    height: '100vh',
	    border:0,
	    padding:0,
	    backgroundImage: `url(${backGroundWaves})`,
	},
    }));

const App: React.FC = () => {
  const classes = useStyles();
  // teal_palette,
  // black_palette,
  // green_palette,
  // yellow_palette,
  // purple_palette,
  // brown_palette,
  // red_palette
  const [palette, setPalette] = useState<SimplePaletteColorOptions |
  	undefined>(paletteMap.get('teal_palette'));

  const handlePaletteChanged = (newPalette: string) => {
    setPalette(paletteMap.get(newPalette));
  }
    return (
	    <div className={classes.root}>
	     <MuiThemeProvider theme={createTheme(palette, paletteMap.get('black_palette'))}>
               <Header/>
      	       <Chart classes={classes}/>
               <Footer/>
  	     </MuiThemeProvider>
	    </div>
    );
};


//        <Chart   classes={classes}/>
//          <Home    currentPalette={paletteAsString(palette)} onPaletteChanged={handlePaletteChanged} />


export default App;

