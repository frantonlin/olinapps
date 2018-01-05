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
      const groupedByType = this.groupAppsByType(response.data.apps);
      const sectionOrder = response.data.sections.map(section => {
        return section.name;
      });

      this.setState({
        apps: groupedByType,
        sections: sectionOrder,
      });
    })
    .catch(error => {
      // Error
    });
  };

  groupAppsByType = (apps) => {
    let grouped = {};
    for (let i = 0; i < apps.length; i++) {
      const app = apps[i];
      if (grouped[app.section] == null) {
        grouped[app.section] = [app];
      } else {
        grouped[app.section].push(app);
      }
    }
    return grouped;
  }

  componentDidMount() {
    this.getApps();
  }

  render() {
    let appGrid = null;

    if (this.state.apps != null && this.state.sections != null) {
      // don't include sections that have no apps
      appGrid = this.state.sections.reduce((appGrids, section) => {
        if (this.state.apps[section] != null) {
          appGrids.push(
            <AppGrid key={section} section={section} apps={this.state.apps[section]} />
          );
        }
        return appGrids;
      }, []);
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
