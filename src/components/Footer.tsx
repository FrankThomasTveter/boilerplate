import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
      marginTop: theme.spacing(8),
      bottom: 0,
      padding: `${theme.spacing(6)}px 0`,
      color: '#FFF'
    },
  }),
);

const Footer: React.FC = () => {
  const styles = useStyles();

  return (

    <footer className={styles.root}>
      <Grid container className={"global-root"}>
        <Grid item xs={12} sm={6}>
          <Typography color={"inherit"}>
            Meteorologisk institutt
            </Typography>
          <Typography color={"inherit"}>
            Henrik Mohns Plass 1
            </Typography>
          <Typography color={"inherit"}>
            0313 Oslo
            </Typography>
          <Typography color={"inherit"}>
            Telefon 22 96 30 00
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
