import React, { Component } from 'react';
import Button from 'material-ui/Button';
import LoginDialog from './LoginDialog';
var axios  = require('axios');

class LoginDialogButton extends Component {
  initialState = {
    open: false,
    loading: false,
  };
  state = this.initialState;

  handleClick = () => {
    if (this.props.user) {
      this.handleLogout();
    } else {
      this.setState({open: true});
    }
  };
  handleClose = () => {
    if (!this.state.loading) {
      this.setState(this.initialState);
    }
  };
  validateUsername = (username) => {
    if (username === '' || !/^[a-zA-Z0-9]+$/.test(username)) {
      return 'enter a valid username';
    }
    return;
  };
  validatePassword = (password) => {
    if (password === '') {
      return 'enter a password';
    }
    return;
  };
  handleLogin = (username, password, remember) => {
    this.setState({loading: true});
    return axios.post('/api/login', {
      username: username,
      password: password,
      remember: remember
    })
    .then(response => {
      if (response.data.statusCode === 200) {
        // set timeout for duration of leaving screen transition
        // prevents visible changes on close
        setTimeout(() => {this.setState({loading: false})}, 195);
        this.setState({open: false});
        this.props.onLogin(response.data.user);
      } else {
        this.setState({loading: false});
        return response.data.message;
      }
    })
    .catch(error => {
      this.setState({loading: false});
      return 'something\'s broken...';
    });
  };
  handleLogout = () => {
    axios.post('/api/logout')
    .then(response => {
      this.props.onLogout();
    })
    .catch(error => {
      if (error) {
        // maybe toast something?
      }
    });
  };

  render() {
    return (
      <div>
        <Button 
          color={this.props.buttonColor}
          onClick={this.handleClick}
        >
          {this.props.user ? 'logout' : 'login'}
        </Button>
        <LoginDialog
          open={this.state.open}
          onRequestClose={this.handleClose}
          isLoading={this.state.loading}
          onLogin={this.handleLogin}
          validateUsername={this.validateUsername}
          validatePassword={this.validatePassword}
        />
      </div>
    );
  }
}

export default LoginDialogButton;
