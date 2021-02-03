import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import {
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import examplePng from '../images/example.png';
import { pageSpacing } from '../utils/metMuiThemes';

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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt arcu dolor,
              quis efficitur erat fringilla in. Nam condimentum auctor suscipit.
              Maecenas vehicula orci sed mi tempus, sed euismod nibh tincidunt. Fusce rhoncus sed
              turpis id porttitor. Quisque venenatis arcu quis magna posuere dapibus.
              Aliquam a justo sagittis ipsum convallis ultrices. Integer laoreet mi nulla, a pharetra
              dui auctor ut. Integer aliquam, tortor et pretium convallis, ligula nisi dictum velit,
              semper lobortis purus ligula et elit. Nam et lectus diam. Quisque at pretium nunc, et
              rutrum risus.
            </Typography>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={classes.paper}>
            <Typography>
              In leo metus, vehicula sed aliquam nec, interdum nec tortor. Suspendisse aliquam
              venenatis malesuada.
              Quisque fermentum, nisi sit amet laoreet ornare, dui ligula aliquam lacus, non ultricies
              purus ipsum eu massa.
              Aliquam tristique nunc eget rutrum rhoncus. Etiam quam augue, vulputate tempor fringilla
              quis, mattis quis ligula.
              Etiam convallis, nulla quis euismod volutpat, tellus felis porttitor lorem, sit amet
              facilisis ligula dui ac leo. Praesent maximus nulla erat,
              vitae gravida ligula pellentesque quis. Sed sem turpis, scelerisque id sagittis sit
              amet, viverra eget sem. Praesent eu mauris vitae ante suscipit tempus ac ut erat.
              In euismod rhoncus feugiat.
              In leo metus, vehicula sed aliquam nec, interdum nec tortor. Suspendisse aliquam
              venenatis malesuada.
            </Typography>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={classes.paper}>
            <Typography>
              Nam ac scelerisque massa, venenatis auctor enim. Proin consectetur sodales elit, a
              elementum velit interdum vel.
              Quisque laoreet mauris sit amet dui tempor consectetur. Proin facilisis dolor at massa
              posuere, et varius felis sollicitudin.
              Duis porta leo id ante gravida, eget porttitor risus dignissim. Integer at maximus sem.
              Suspendisse potenti.
            </Typography>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={classes.paper}>
            <Typography>
              Praesent id varius purus. Quisque eget mauris est. Ut at eros lacus. Nulla sodales
              pretium ante eget tempor. Ut auctor quis orci in tempus.
              Fusce semper condimentum porta. Nam efficitur ligula erat, vitae malesuada diam
              tristique sed.
            </Typography>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={classes.paper}>
            <Typography>
              Donec bibendum nibh dignissim nibh auctor, ac ultricies dolor facilisis. Donec a eros
              dapibus, scelerisque purus ac, volutpat nunc. Aliquam erat volutpat. In sagittis,
              quam ac malesuada bibendum, mauris nibh cursus tellus, vitae maximus ligula justo quis
              turpis.
            </Typography>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={classes.paper}>
            <Typography>
              Praesent id varius purus. Quisque eget mauris est. Ut at eros lacus. Nulla sodales
              pretium ante eget tempor. Ut auctor quis orci in tempus.
              Fusce semper condimentum porta. Nam efficitur ligula erat, vitae malesuada diam
              tristique sed.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;

