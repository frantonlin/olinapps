import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  blueGrey100, blueGrey500, blueGrey700,
  pink100, pink500, pink700,
  grey900,
  white,
} from 'material-ui/styles/colors';

import HeaderContainer from './HeaderContainer';
import Content from './Content';
import Footer from './Footer';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey500,
    primary2Color: blueGrey700,
    primary3Color: blueGrey100,
    accent1Color: pink500,
    accent2Color: pink700,
    accent3Color: pink100,
    textColor: grey900,
    alternateTextColor: white,
  },
});

const App = () => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className="App">
        <HeaderContainer />

        <Content />

        <Footer />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
