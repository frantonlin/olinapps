import React, { Component } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
var axios  = require('axios');

class LoginButton extends Component {
  initialState = {
    open: false,
    usernameErrorText: '',
    passwordErrorText: '',
    loginErrorText: '',
    loading: false,
  };
  state = this.initialState;

  _validateUsername = (username) => {
    if (username === '' || !/^[a-zA-Z0-9]+$/.test(username)) {
      this.setState({usernameErrorText: 'enter a valid username'});
      this.refs.username.focus();
      return false;
    } else {
      this.setState({usernameErrorText: ''});
      return true;
    }
  };
  _validatePassword = (password) => {
    if (password === '') {
      this.setState({passwordErrorText: 'enter a password'});
      this.refs.password.focus();
      return false;
    } else {
      this.setState({passwordErrorText: ''});
      return true;
    }
  };
  _handleUsernameChange = (e) => {
    this._validateUsername(e.target.value);
  };
  _handlePasswordChange = (e) => {
    this._validatePassword(e.target.value);
  };
  _setLoginError = (text) => {
    this.setState({loginErrorText: text});
    this.refs.username.focus();
  };
  _login = (username, password) => {
    var LoginDialog = this;
    axios.post('/api/login', {
      username: username,
      password: password
    })
    .then(function (response) {
      LoginDialog.setState({loading: false});
      LoginDialog.handleClose();
    })
    .catch(function (error) {
      if (error) {
        LoginDialog.setState({loading: false});
        switch (error.response.status) {
          case 500: // httpntlm request failed, internal server error
            LoginDialog._setLoginError("something's broken...");
            break;
          case 400: // sent bad httpntlm request
            LoginDialog._setLoginError("something's broken...");
            break;
          case 401: // unauthorized
            LoginDialog._setLoginError("invalid username/password");
            LoginDialog.refs.username.focus();
            break;
          default: // something else?!?!
            LoginDialog._setLoginError("something's really broken...");
        }
      }
    });
  };

  handleOpen = () => {
    this.setState({open: true});
  };
  handleClose = () => {
    if (!this.state.loading) {
      this.setState(this.initialState);
    }
  };

  handleLogin = (e) => {
    e.preventDefault();

    const username = this.refs.username.getValue();
    const password = this.refs.password.getValue();
    const remember = this.refs.remember.isChecked();
    const validated = this._validateUsername(username) && this._validatePassword(password);

    if (validated) {
      this.setState({
          loading: true,
          loginErrorText: '',
      });
      this._login(username, password)
    }
  };

  render() {
    const muiTheme = this.props.muiTheme;
    const dialogWidth = 320;
    const dialogHeight = 230;
    const loadingSize = 60;
    const style = {
      dialog: {
        width: dialogWidth+'px'
      },
      dialogBody: {
        minHeight: dialogHeight+'px'
      },
      loginForm: {
        marginTop: '-5px'
      },
      loginError: {
        color: muiTheme.textField.errorColor,
        fontSize: '12px',
      },
      checkbox : {
        margin: '10px 0 20px 0'
      },
      cancelButton : {
        width: '49%',
        float: 'left',
      },
      loginButton: {
        width: '49%',
        float: 'right'
      },
      loadingContainer: {
        position: 'absolute',
        left: '0px',
        top: '0px',
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: '100%',
        height: '100%',
        zIndex: this.state.loading ? '99':'-1',
      },
      loading: {
        backgroundColor: 'transparent',
        borderRadius: '0',
        boxShadow: 'none'
      },
    };
    
    return (
      <div>
        <FlatButton label="Login"
            hoverColor={this.props.hoverColor}
            rippleColor={this.props.rippleColor}
            onClick={this.handleOpen}
            style={this.props.style} />
        
        <Dialog
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            contentStyle={style.dialog}
            bodyStyle={style.dialogBody} >

          <div style={style.loadingContainer}>
            <RefreshIndicator
                size={loadingSize}
                left={dialogWidth/2-loadingSize/2}
                top={dialogHeight/2-loadingSize/2}
                loadingColor={muiTheme.palette.accent1Color}
                status={this.state.loading ? "loading":"loading"}
                style={style.loading} />
          </div>

          <form onSubmit={this.handleLogin} style={style.loginForm}>
            <span style={style.loginError}>{this.state.loginErrorText}</span>
            <TextField name="username" ref="username"
                type="text" hintText="username"
                disabled={this.state.loading}
                errorText={this.state.usernameErrorText}
                onChange={this._handleUsernameChange}
                fullWidth={true} spellCheck="false"
                autoCorrect="off" autoComplete="off"
                autoCapitalize="off"
                autoFocus />
            <TextField name="password" ref="password"
                type="password" hintText="password"
                disabled={this.state.loading}
                errorText={this.state.passwordErrorText}
                onChange={this._handlePasswordChange}
                fullWidth={true} />
            <Checkbox name="remember" ref="remember"
                label="remember me" disabled={this.state.loading}
                defaultChecked={true}
                style={style.checkbox} />

            <FlatButton label="Cancel"
                primary={true}
                onClick={this.handleClose}
                style={style.cancelButton} />
            <RaisedButton label="Login"
                type="submit"
                secondary={true}
                disabled={this.state.loading}
                style={style.loginButton} />
          </form>
        </Dialog>
      </div>
    );
  }
}

export default muiThemeable()(LoginButton);