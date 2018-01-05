import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography/Typography';
import AppGridItem from './AppGridItem';

const styles = theme => ({
  appGridContainer: {
    borderBottom: '1px solid '+theme.palette.text.lightDivider,
    '&:last-child': {
      borderBottom: 'none',
    },
    marginBottom: '0.7em'
  },
  sectionName: {
    textTransform:'capitalize',
  },
  emptyGrid: {
    width: '100%',
    textAlign: 'center',
    margin: theme.mixins.appGridItem.margin,
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

const AppGrid = ({ section, apps, classes }) => {

  let appGridItems = (
    <Typography
      className={classes.emptyGrid}
      type="subheading"
      color="secondary"
      gutterBottom
    >
      There are no {section.toLowerCase()}
    </Typography>
  );
  if (apps.length > 0) {
    appGridItems = apps.map(app =>
      <AppGridItem key={app.name} app={app} />
    );
    for (let i = 0; i < 18; i++) {
      appGridItems.push(<div className={classes.flexDummy} key={i}></div>);
    }
  }

  return (
    <div className={classes.appGridContainer}>
      <Typography
        className={classes.sectionName}
        type="subheading"
        color="secondary"
        gutterBottom
      >
        {section}
      </Typography>
      <div className={classes.appGrid}>
        {appGridItems}
      </div>
    </div>
  );
}

export default withStyles(styles)(AppGrid);
