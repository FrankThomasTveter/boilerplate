import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import logo from '../images/met_logo.png';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Menu from './Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      paddingBottom: '2%',
    },
    grow: {
      flexGrow: 1,
    },
    logo: {
      padding: '1%',
      width: 150,
      [theme.breakpoints.up('sm')]: {
        width: 200
      },
    },
    paddingBottom: {
      paddingBottom: theme.spacing(1),
    }
  }),
);

const Header: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <AppBar position={"static"} className={styles.paddingBottom}>
        <Toolbar>
          <img className={styles.logo} src={logo} alt="met logo" />
          <div className={styles.grow} />
          <IconButton color="inherit" aria-label="Open drawer">
            <SearchIcon />
          </IconButton>
          <Menu />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
