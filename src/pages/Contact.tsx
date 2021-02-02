import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import metImage from '../images/hovedbygg.jpg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    paperImage: {
      textAlign: 'center',
      padding: theme.spacing(2),
    },
    metImage: {
      maxWidth: '100%',
    }
  }),
);

const Contact: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={"global-root"}>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={styles.paperImage}>
            <img alt={"met"} className={styles.metImage} src={metImage}></img>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={styles.paper}>
            <Typography variant="subtitle1" gutterBottom>
              Adresse
            </Typography>
            <Typography>
              Meteorologisk institutt (MET)
            </Typography>
            <Typography>
              Henrik Mohns plass 1
            </Typography>
            <Typography>
              0313 Oslo
            </Typography>
            <Typography>
              Telefon +47 22 96 30 00
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Contact;
