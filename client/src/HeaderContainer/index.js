import React, { Component } from 'react';
import Header from './Header'

class HeaderContainer extends Component {
  state = {
    user: null
  }

  render() {
    return (
      <Header
          user={this.state.user}
          title='OlinApps' />
    );
  }
}

export default HeaderContainer;
