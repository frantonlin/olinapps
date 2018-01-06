import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  footer: {
    ...theme.mixins.gutters({}),
    backgroundColor: theme.palette.primary['50'],
    paddingTop: '8px',
    paddingBottom: '8px',
    position: 'relative',
    top: theme.mixins.toolbar.minHeight,
    marginTop: -theme.mixins.toolbar.minHeight,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: theme.palette.grey['700'],
    '& a': {
      color: 'inherit',
    },
  },
});

const Footer = ({ classes }) => {
  return (
    <footer className={classes.footer}>
      <Typography type="body1" color="inherit">Copyright yeah blah blah</Typography>
      <Typography type="body1" color="inherit">
        Made by <a href="http://frantonlin.com/">Franton Lin</a> using <a href="http://www.material-ui.com/">Material-UI</a>
      </Typography>
    </footer>
  );
}

export default withStyles(styles)(Footer);
