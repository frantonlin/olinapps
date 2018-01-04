import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import Typography from 'material-ui/Typography/Typography';
import AppGrid from './AppGrid';
import './AppGridItemFont.css';
var axios  = require('axios');

const baseTheme = createMuiTheme();
const theme = createMuiTheme({
  mixins: {
    appGridItem: {
      display: 'inline-block',
      width: '128px',
      [baseTheme.breakpoints.down('sm')]: {
        width: '102px',
      },
      margin: baseTheme.spacing.unit*0.75 + 'px ' + baseTheme.spacing.unit*0.5 + 'px',
    },
    appGridItemImg: {
      width: '100%',
      height: '128px',
      [baseTheme.breakpoints.down('sm')]: {
        height: '102px',
      },
    }
  },
});

class AppSearch extends Component {
  state = {
    apps: undefined
  };

  getApps = () => {
    axios.get('/api/apps')
    .then(response => {
      const sortedByType = this.sortAppsByType(response.data);
      this.setState({apps: sortedByType});
    })
    .catch(error => {
      // Error
    });
  };

  sortAppsByType = (apps) => {
    let sorted = {};
    for (let i = 0; i < apps.length; i++) {
      const app = apps[i];
      const type = app.type+'s';
      if (sorted[type] == null) {
        sorted[type] = [app];
      } else {
        sorted[type].push(app);
      }
    }
    return sorted;
  }

  componentDidMount() {
    this.getApps();
  }

  render() {
    let appGrid = null;
    if (this.state.apps != null) {
      appGrid = Object.entries(this.state.apps).map(([type, apps]) =>
        <AppGrid key={type} type={type} apps={apps} />
      );
    }
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          {appGrid}
        </div>
      </MuiThemeProvider>
    );
  };
}

export default AppSearch;
