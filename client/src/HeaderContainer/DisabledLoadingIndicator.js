import React from 'react';
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress';

const styles = {
  container: {
    position: 'absolute',
    left: '0px',
    top: '0px',
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    zIndex: 1,
  },
};

const DisabledLoadingIndicator =({ isLoading, size, classes }) => {
  if (isLoading) {
    return (
      <div className={classes.container}>
        <CircularProgress size={size} color='accent' />
      </div>
    );
  }
  return null;
};

export default withStyles(styles)(DisabledLoadingIndicator);
