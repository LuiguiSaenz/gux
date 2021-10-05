import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import styles from './styles';
import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { toggleItemMenu, setProjectForMap } from '../../redux/actions/layoutActions';

const MenuLink = props => <RouterLink to="/home" {...props} />;

class MainListItems extends React.Component {
  changeStateOpen = (nameItem, open) => {
    this.props.toggleItemMenu({ nameItem, open });
  };

  render() {
    return (
      <div>
        <Typography component="h4">MENU</Typography>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    itemsMenu: state.layout.itemsMenu,
  };
};

const mapDispatchToProps = { toggleItemMenu, setProjectForMap };

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(MainListItems);
