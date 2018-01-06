import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import pink from 'material-ui/colors/pink';
import blueGrey from 'material-ui/colors/blueGrey';
import red from 'material-ui/colors/red';

import HeaderContainer from './HeaderContainer';
import Content from './Content';
import Footer from './Footer';

var axios  = require('axios');

let palette = {
  primary: blueGrey,
  secondary: pink,
  error: red,
};
palette.error.A400 = red['500'];
const theme = createMuiTheme({
  palette,
  mixins: {
    toolbar: {
      minHeight: 64,
      '@media (min-width:0px) and (orientation: landscape)': {
        minHeight: 64
      },
      '@media (min-width:600px)': {
        minHeight: 64
      }
    }
  },
  overrides: {
    MuiAppBar: {
      colorAccent: {
        backgroundColor: palette.secondary['500'],
      },
    },
  }
});

const styles = {
  app: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
  },
}

class App extends Component {

  getUser = () => {
    axios.get('/api/login')
    .then(response => {
      this.props.onLogin(response.data.user);
    })
    .catch(error => {
      // do something errory?
    });
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.app}>
          <HeaderContainer title='OlinApps' />

          <Content className={classes.content} />

          <Footer />
        </div>
      </MuiThemeProvider>
    );
  };
}

export default withStyles(styles)(App);
