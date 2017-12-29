import React, { Component } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Header from './Header'

class HeaderContainer extends Component {
  state = {
    user: null
  }

  goHome = () => {
    alert('onClick triggered on the title component');
  };

  render() {
    return (
      <Header
          user={this.state.user}
          title='OlinApps'
          onTitleClick={this.goHome} />
    );
  }
}

export default muiThemeable() (HeaderContainer);
