import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import {
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import examplePng from '../images/example.png';
import { pageSpacing } from '../utils/metMuiThemes';
import { getNonesenseText } from '../utils/randomText';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      ...pageSpacing(theme),
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    paperImage: {
      textAlign: 'center',
      padding: theme.spacing(2),
    },
    homePageImg: {
      maxWidth: '100%',
    },
  }),
);

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paperImage}>
            <img alt={"homepage"} className={classes.homePageImg} src={examplePng}></img>
          </Paper>
        </Grid>
        <Grid item md={12} lg={6}>
          <Paper className={classes.paper}>
            <Typography>
              {getNonesenseText(1)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={classes.paper}>
            <Typography>
              {getNonesenseText(2)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={classes.paper}>
            <Typography>
              {getNonesenseText(3)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={classes.paper}>
            <Typography>
              {getNonesenseText(4)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={classes.paper}>
            <Typography>
              {getNonesenseText(5)}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;

