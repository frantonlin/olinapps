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
    return (
      <MuiThemeProvider theme={theme}>
        <div className={this.props.classes.app}>
          <HeaderContainer title='OlinApps' />

          <Content />

          <Footer />
        </div>
      </MuiThemeProvider>
    );
  };
}

export default withStyles(styles)(App);
