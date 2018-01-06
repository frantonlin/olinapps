import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider, withStyles } from 'material-ui/styles';
import AppGrid from './AppGrid';
import Paper from 'material-ui/Paper/Paper';
import SearchIcon from 'material-ui-icons/Search';
import ClearIcon from 'material-ui-icons/Clear';
import IconButton from 'material-ui/IconButton';
import Input from 'material-ui/Input';
import Sticky from '../Sticky';
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

const styles = theme => ({
  searchBar: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    ...theme.mixins.gutters({}),
  },
  searchIcon: {
    marginRight: theme.spacing.unit,
  },
  searchInput: {
    flex: 1,
  },
  appGrid: {
    paddingTop: '16px',
    ...theme.mixins.gutters({}),
  },
});

class AppSearch extends Component {
  state = {
    appsBySection: {},
    sections: [],
    filter: ''
  };

  getApps = () => {
    axios.get('/api/apps')
    .then(response => {
      const apps = response.data.apps;
      const appsBySection = apps.reduce((sections, app) => {
        if (sections[app.section] == null) {
          sections[app.section] = [app];
        } else {
          sections[app.section].push(app);
        }
        return sections;
      }, {});

      // don't include sections that have no apps
      const sections = response.data.sections.reduce((sections, section) => {
        if (appsBySection[section.name] != null) {
          sections.push(section.name);
        }
        return sections;
      }, []);

      this.props.initializeAppSearch(apps, appsBySection, sections);
      if (this.state.filter !== '') {
        this.filterApps(this.state.filter);
      } else {
        this.setState({appsBySection, sections});
      }
    })
    .catch(error => {
      // Error
    });
  };

  focusSearch = event => {
    this.searchInput.focus();
  };

  onFilter = event => {
    this.setState({filter: event.target.value});
    this.filterApps(event.target.value);

    const scrollTop = window.scrollY;
    if (scrollTop > this.state.scrollToHeight) {
      window.scrollTo(0, this.state.scrollToHeight);
    }
  };

  filterApps = (filter) => {

    // filter for results by ANDing the keywords together
    // ^(?=.*\bWORD)(?=.*\bWORD).*$
    
    // replace extra whitespace with single space and strip leading space
    const keywords = filter.replace(/\s+/g,' ').replace(/^\s+/,'').split(' ');
    
    // not empty string or just spaces, so filter
    if (keywords[0] !== "") {
      let regex = '^';
      for (let i = 0; i < keywords.length-1; i++) {
        // force text followed by space to match whole words
        regex += '(?=.*\\b' + keywords[i] + '\\b)';
      }
      // last text (not followed by space) can be incomplete word
      regex += '(?=.*\\b' + keywords[keywords.length-1] + ').*$';
      // console.log(keywords + ' | ' + regex);
    
      const search = new RegExp(regex, 'i');
      
      const results = this.props.apps.reduce((apps, app) => {
        if(app.keywords.match(search)) {
          apps.push(app);
        }
        return apps;
      }, []);

      this.setState({
        appsBySection: {results},
        sections: ['results'],
      });
    } else { // emptry string or just spaces, so show all
      this.setState({
        appsBySection: this.props.appsBySection,
        sections: this.props.sections,
      });
    }
  }

  clearSearch = event => {
    this.setState({
      filter: '',
      appsBySection: this.props.appsBySection,
      sections: this.props.sections,
    });
    this.searchInput.focus();
  };

  setScrollToHeight = (height) => {
    this.setState({scrollToHeight: height});
  };

  componentDidMount() {
    this.getApps();
    this.searchInput.focus();
  };

  render() {
    const { classes } = this.props;

    let appGrid = null;
    if (Object.keys(this.state.appsBySection).length > 0 && 
        this.state.sections.length > 0) {
      appGrid = this.state.sections.map(section =>
        <AppGrid
          key={section}
          section={section}
          apps={this.state.appsBySection[section]}
        />
      );
    }

    return (
      <MuiThemeProvider theme={theme}>
        <Sticky passInitialTop={this.setScrollToHeight}>
          <Paper className={classes.searchBar} elevation={1}>
            <IconButton disableRipple onClick={this.focusSearch}><SearchIcon /></IconButton>
            <Input
              className={classes.searchInput}
              placeholder="Search"
              inputRef={input => this.searchInput = input}
              onChange={this.onFilter}
              value={this.state.filter}
              disableUnderline
            />
            {this.state.filter === '' ? 
              null
            :
              <IconButton disableRipple onClick={this.clearSearch}><ClearIcon /></IconButton>
            }
          </Paper>
        </Sticky>
        <div className={classes.appGrid}>
          {appGrid}
        </div>
      </MuiThemeProvider>
    );
  };
}

export default withStyles(styles)(AppSearch);
