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

  handleOpen = () => {
    this.setState({open: true});
  };
  handleClose = () => {
    if (!this.state.loading) {
      this.setState(this.initialState);
    }
  };
  handleLogin = (username, password, remember) => {
    this.setState({loading: true});
    return axios.post('/api/login', {
      username: username,
      password: password,
      remember: remember
    })
    .then(response => {
      this.setState({loading: false});
      this.handleClose();
    })
    .catch(error => {
      this.setState({loading: false});
      if (error.response.status === 401) {
        return 'invalid username/password';
      }
      return 'something\'s broken...'
    });
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

  render() {
    return (
      <div>
        <Button color={this.props.buttonColor} onClick={this.handleOpen}>
          login
        </Button>
        <LoginDialog
            open={this.state.open}
            onRequestClose={this.handleClose}
            isLoading={this.state.loading}
            onLogin={this.handleLogin}
            validateUsername={this.validateUsername}
            validatePassword={this.validatePassword} />
      </div>
    );
  }
}

export default LoginDialogButton;
