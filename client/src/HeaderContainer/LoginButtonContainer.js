import React, { Component } from 'react';
import LoginButton from './LoginButton'
var axios  = require('axios');

class LoginButtonContainer extends Component {
  isValidUsername = (username) => {
    if (username === '' || !/^[a-zA-Z0-9]+$/.test(username)) {
      return false;
    }
    return true;
  };
  isValidPassword = (password) => {
    if (password === '') {
      return false;
    }
    return true;
  };

  handleLogin = (username, password, remember) => {
    return axios.post('/api/login', {
      username: username,
      password: password,
      remember: remember
    });
  };

  render() {
    return (
      <LoginButton
          onLogin={this.handleLogin}
          isValidUsername={this.isValidUsername}
          isValidPassword={this.isValidPassword}
          hoverColor={this.props.hoverColor}
          rippleColor={this.props.rippleColor}
          style={this.props.style} />
    );
  }
}

export default LoginButtonContainer;
