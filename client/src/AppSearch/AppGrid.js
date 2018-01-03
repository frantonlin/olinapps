import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography/Typography';
import AppGridItem from './AppGridItem';
import Divider from 'material-ui/Divider/Divider';

const styles = theme => ({
  appGridContainer: {
    borderBottom: '1px solid '+theme.palette.text.lightDivider,
    '&:last-child': {
      borderBottom: 'none',
    },
    marginBottom: '0.7em'
  },
  appGrid: {
    margin: '0px -4px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  flexDummy: {
    ...theme.mixins.appGridItem,
    height: '0px',
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
  }
});

const AppGrid = ({ type, apps, classes }) => {
  const appGridItems = apps.map(app =>
    <AppGridItem key={app.name} app={app} />
  );

  const flexDummies = [];
  for (let i = 0; i < 18; i++) {
    flexDummies.push(<div className={classes.flexDummy} key={i}></div>);
  }

  return (
    <div className={classes.appGridContainer}>
      <Typography type="subheading" color="secondary" gutterBottom>{type}</Typography>
      <div className={classes.appGrid}>
        {appGridItems}
        {flexDummies}
      </div>
    </div>
  );
}

export default withStyles(styles)(AppGrid);
