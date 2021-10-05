import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  InputBase,
} from '@material-ui/core';

import LinearLoading from '../LinearLoading';
import { logout } from '../../redux/actions/authActions';
import styles from './styles';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Search from '@material-ui/icons/Search';

const Layout = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { classes, title, loading, auth } = props;

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function handleMenu(event) {
    setOpenLogout(true);
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenu() {
    setOpenLogout(false);
    setAnchorEl(null);
  }

  function logout() {
    props.logout();
  }

  if (auth.token === null) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={classNames(classes.appBar, open && classes.appBarShift)}
      >
        <LinearLoading loading={loading} />

        <Toolbar disableGutters={!open} className={classes.toolbar}>
          {/* <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classNames(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton> */}
          <Grid container className={classes.divRight}>
            <Grid item className={classes.divTitle}>
              <Typography component="h1" variant="h6" color="inherit" noWrap>
                Search
              </Typography>
              <div className="input-search">
                <IconButton className="icon" aria-label="menu">
                  <Search />
                </IconButton>
                <InputBase placeholder="Search" className="input" />
              </div>
            </Grid>
            <Grid item>
              <Grid
                container
                justify="center"
                alignItems="center"
                onClick={handleMenu}
                className={classes.username}
              >
                <span>Hola {auth.fullName}</span>
                <KeyboardArrowDown />
              </Grid>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openLogout}
                onClose={handleCloseMenu}
              >
                {/* <MenuItem onClick={handleCloseMenu}>{auth.fullName}</MenuItem> */}
                <MenuItem onClick={logout}>Log Out</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/* <Drawer
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !open && classes.drawerPaperClose
          ),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems />
        </List>
      </Drawer> */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {props.children(open)}
      </main>
    </div>
  );
};

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  title: PropTypes.string,
};

Layout.defaultProps = {
  loading: false,
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    loading: state.global.loading,
  };
};

const mapDispatchToProps = { logout };

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Layout);
