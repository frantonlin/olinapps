import React from 'react';
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import LoginDialogButton from './LoginDialogButton';

const styles = {
  flex: {
    flex: 1,
  },
};

const Header = ({ classes, title }) => {

  return (
    <AppBar position="static" color="accent">
      <Toolbar>
        <Typography type="title" color="inherit" className={classes.flex}>
          {title}
        </Typography>
        <LoginDialogButton buttonColor='contrast' />
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles) (Header);
