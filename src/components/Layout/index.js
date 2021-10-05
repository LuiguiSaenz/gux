import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import { compose } from 'recompose';
import Link from '@material-ui/core/Link/Link';
import PropTypes from 'prop-types';
import { selectedItemMenu } from '../../redux/actions/layoutActions';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  InputBase,
  TextField,
} from '@material-ui/core';
import LinearLoading from '../LinearLoading';
import { logout } from '../../redux/actions/authActions';
import { fetchNews } from '../../redux/actions/newsActions';
import { setRouteValue } from '../../redux/actions/globalActions';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Search from '@material-ui/icons/Search';
import Notifications from '@material-ui/icons/Notifications';

const Layout = ({ ...props }) => {
  const { loading, auth, logout, selected, selectedItemMenu, routes, routeValue } = props;
  const [options, setOptions] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [calling, setCalling] = useState(null)
  const open = false;
  function changeRoute(e) {
    const value = e.target.value;
    if (value) {
      props.setRouteValue(parseInt(value));
      const newRoute = routes.find(option => option.value === parseInt(value)).link;
      props.history.push(newRoute);
    }
  }

  function filterNews(value) {
    if (calling) clearTimeout(calling)
    const timeout = setTimeout(() => {
      props.fetchNews(1, value.toLowerCase());
    }, 1000)
    setCalling(timeout)
  }

  return (
    <div className="root">
      <CssBaseline />
      <AppBar position="fixed" classes={{ root: 'menu' }}>
        <LinearLoading loading={loading} classes={{ loading: 'progressbar' }} />
        <div className="container-menu">
          <Toolbar variant="dense" className="toolbar">
            <div className="menu-left">
              <img
                alt="logo"
                src="https://www.logo.wine/a/logo/Orange_Money/Orange_Money-Logo.wine.svg"
              />
              <div className="input-search">
                <IconButton className="icon" aria-label="menu">
                  <Search />
                </IconButton>
                <InputBase
                  placeholder="Search"
                  className="input"
                  onChange={e => filterNews(e.target.value)}
                />
              </div>
            </div>
            <div className="menu-right">
              {auth.token ? (
                <div className="user">
                  <Grid
                    container
                    alignItems="center"
                    onClick={e => {
                      setAnchorEl(e.currentTarget);
                      setOptions(!options);
                    }}
                  >
                    <span>Hola {auth.fullName}</span>
                    <KeyboardArrowDown />
                  </Grid>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    open={options}
                    onClose={() => setOptions(false)}
                  >
                    <MenuItem
                      onClick={() => {
                        props.history.push(`/users/${auth.id}`);
                      }}
                    >
                      <Link
                        to={`/users/${auth.id}`}
                        component={RouterLink}
                        align="center"
                        onClick={() => {
                          setOptions(false);
                          selectedItemMenu(0);
                        }}
                      >
                        Perfil
                      </Link>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        logout();
                        props.history.push('/login');
                      }}
                    >
                      Cerrar sesión
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <div>
                  <Link href="/register" align="center" target="_blank">
                    Registrarse
                  </Link>
                  <Link href="/login" align="center">
                    Iniciar sesión
                  </Link>
                </div>
              )}
              <i className="fas fa-comment icon-comment"></i>
              <Notifications className="icon-notification" />
            </div>
          </Toolbar>
        </div>
        <Grid container className="container-menu-bottom">
          <div className="menu-bottom">
            <Link
              to="/home"
              component={RouterLink}
              align="center"
              className={selected === 1 ? 'selected' : ''}
              onClick={() => selectedItemMenu(1)}
            >
              Noticias
            </Link>
            <Link
              to="/international-standards"
              component={RouterLink}
              align="center"
              className={selected === 2 ? 'selected' : ''}
              onClick={() => selectedItemMenu(2)}
            >
              Artículos
            </Link>
            <Link
              to="/courses"
              align="center"
              component={RouterLink}
              className={selected === 3 ? 'selected' : ''}
              onClick={() => selectedItemMenu(3)}
            >
              Cursos
            </Link>
          </div>
          <div className="menu-bottom-mobile">
            <TextField
              select
              label=""
              value={routeValue}
              onChange={changeRoute}
              classes={{ root: 'select-menu' }}
            >
              {routes.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Grid>
      </AppBar>
      <div className="container-main" id="main">
        <main className="content">{props.children(open)}</main>
      </div>
    </div>
  );
};

Layout.propTypes = {
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
    selected: state.layout.selected,
    routeValue: state.global.route_value,
    routes: state.global.routes,
  };
};

const mapDispatchToProps = { logout, selectedItemMenu, setRouteValue, fetchNews };

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Layout);
