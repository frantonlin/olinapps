import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
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
      const appsBySection = this.groupAppsBySection(response.data.apps);

      // don't include sections that have no apps
      const sectionOrder = response.data.sections.reduce((sections, section) => {
        if (appsBySection[section.name] != null) {
          sections.push(section.name);
        }
        return sections;
      }, []);

      this.props.initializeAppSearch(appsBySection, sectionOrder)
    })
    .catch(error => {
      // Error
    });
  };

  groupAppsBySection = (apps) => {
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

    if (this.props.apps != null && this.props.visibleSections != null) {
      // TODO: add no item indicator
      appGrid = this.props.visibleSections.map(section =>
        <AppGrid key={section} section={section} apps={this.props.apps[section]} />
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
