import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

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
  }),
);

const Menu: React.FC = () => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [currentElem, setCurrentElem] = useState(0);
  const [anchor, setAnchor] = useState<Element | null>(null);
  const [items, setItems] = useState([
    { name: "Sol", id: 1 },
    { name: "Regn", id: 2 },
    { name: "Om oss", id: 3 }
  ]);

  const handleClick = (event: React.MouseEvent, id: number) => {
    setAnchor(event.currentTarget);
    setCurrentElem(id);
    switch (id) {
      case 1:
        window.open("/", "_self");
        break;
      case 2:
        window.open("/", "_self");
        break;
      case 3:
        window.open("/contact", "_self");
        break;
      default:
        window.open("/", "_self");
        break;
    }
  };

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    setOpen(!open);
  };

  const handleToggle = () => {
    setOpen(!open);
  };


  const dropDownList = items.map(item => {
    return (
      <MenuItem key={item.id} onClick={(e) => handleClick(e, item.id)}>{item.name}</MenuItem>
    )
  });

  return (
    <div>
      <IconButton >
        <MenuIcon />
      </IconButton>
      <Popper open={open} anchorEl={anchor} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {dropDownList}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default Menu;
