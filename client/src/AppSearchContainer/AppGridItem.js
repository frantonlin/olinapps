import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography/Typography';
import VpnLockIcon from 'material-ui-icons/VpnLock';

const styles = theme => ({
  item: theme.mixins.appGridItem,
  itemImg: {
    ...theme.mixins.appGridItemImg,
    WebkitBoxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.04)',
    MozBoxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.04)',
    boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.04)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  itemLetter: {
    fontFamily: '"LOT", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '4rem',
    },
    textTransform: 'uppercase',
    opacity: '0.8',
    paddingTop: '16px',
    width: '100%',
    textAlign: 'center',
  },
  vpnLock: {
    position: 'absolute',
    right: '2px',
    top: '2px',
    width: '18px',
    height: '18px',
    color: 'rgba(0,0,0,0.2)',
  },
  nameContainer: {
    height: '2em',
    lineHeight: '2em',
  },
  name: {
    display: 'inline-block',
    verticalAlign: 'middle',
    textTransform:'capitalize',
    lineHeight: 'normal',
    width: '100%',
  }
});

const AppGridItem = ({ app, classes }) => {

  return (
    <a href={app.url}>
      <div className={classes.item}>
        <div className={classes.itemImg}>
          <span className={classes.itemLetter} style={{color: app.color}}>
            {app.sort_name.charAt(0)}
          </span>
          {app.intranet ?
            <VpnLockIcon className={classes.vpnLock} />
          :
            null
          }
        </div>
        <div className={classes.nameContainer}>
          <Typography
            className={classes.name}
            component="span"
            align="center"
          >
            {app.name}
          </Typography>
        </div>
      </div>
    </a>
  );
}

export default withStyles(styles)(AppGridItem);
