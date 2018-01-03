import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import LoginDialogButtonContainer from '../LoginDialogButtonContainer';

const styles = {
  flex: {
    flex: 1,
  },
};

const Header = ({ classes, title, user }) => {
  return (
    <AppBar position="static" color="accent">
      <Toolbar>
        <Typography type="title" color="inherit" className={classes.flex}>
          {title}
        </Typography>
        <LoginDialogButtonContainer buttonColor='contrast' />
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Header);

