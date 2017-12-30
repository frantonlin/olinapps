import React, { Component } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DialogLoadingIndicator from './DialogLoadingIndicator';

class LoginDialog extends Component {
  initialState = {
    loginErrorText: '',
    usernameErrorText: '',
    passwordErrorText: '',
  };
  state = this.initialState;

  validateInput = (value, validate, input) => {
    const errorText = validate(value);
    if (errorText) {
      input.setState({errorText});
      input.focus();
      return false;
    }
    input.setState({errorText: ''});
    return true;
  };
  validateUsernameInput = (e, username) => {
    return this.validateInput(username,
        this.props.validateUsername, this.usernameInput);
  };
  validatePasswordInput = (e, password) => {
    return this.validateInput(password,
        this.props.validatePassword, this.passwordInput);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({loginErrorText: ''});

    const username = this.usernameInput.getValue();
    const password = this.passwordInput.getValue();
    const remember = this.rememberInput.isChecked();

    const validated = this.validatePasswordInput(null, password)
        & this.validateUsernameInput(null, username);

    if (validated) {
      this.props.onLogin(username, password, remember)
      .then(loginErrorText => {
        if (loginErrorText) {
          this.setState({loginErrorText});
          this.usernameInput.focus();
        } else {
          this.setState({loading: false});
          this.handleClose();
        }
      });
    }
  };
  handleClose = () => {
    if (!this.props.loading) {
      this.setState(this.initialState);
      this.props.onRequestClose();
    }
  };

  render() {
    const dialogWidth = 320;
    const dialogHeight = 230;
    const style = {
      dialog: {
        width: dialogWidth+'px'
      },
      dialogBody: {
        minHeight: dialogHeight+'px'
      },
      loginError: {
        color: this.props.muiTheme.textField.errorColor,
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
    };
    
    return (
      <Dialog
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose}
          contentStyle={style.dialog}
          bodyStyle={style.dialogBody} >

        <DialogLoadingIndicator
            isLoading={this.props.isLoading}
            dialogWidth={dialogWidth}
            dialogHeight={dialogHeight} />

        <form onSubmit={this.handleSubmit} style={style.loginForm}>
          <span style={style.loginError}>{this.state.loginErrorText}</span>
          <TextField name="username"
              ref={input => this.usernameInput = input}
              type="text" hintText="username"
              disabled={this.props.isLoading}
              errorText={this.state.usernameErrorText}
              onChange={this.validateUsernameInput}
              fullWidth={true} spellCheck="false"
              autoCorrect="off" autoComplete="off"
              autoCapitalize="off"
              autoFocus />
          <TextField name="password"
              ref={input => this.passwordInput = input}
              type="password" hintText="password"
              disabled={this.props.isLoading}
              errorText={this.state.passwordErrorText}
              onChange={this.validatePasswordInput}
              fullWidth={true} />
          <Checkbox name="remember"
            ref={input => this.rememberInput = input}
              label="remember me" disabled={this.props.isLoading}
              defaultChecked={true}
              style={style.checkbox} />

          <FlatButton label="Cancel"
              primary={true}
              onClick={this.handleClose}
              disabled={this.props.isLoading}
              style={style.cancelButton} />
          <RaisedButton label="Login"
              type="submit"
              secondary={true}
              disabled={this.props.isLoading}
              style={style.loginButton} />
        </form>
      </Dialog>
    );
  };
}

export default muiThemeable()(LoginDialog);
