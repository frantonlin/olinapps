import React, { Component } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';

class LoginButton extends Component {
  initialState = {
    open: false,
    loading: false,
    usernameErrorText: '',
    passwordErrorText: '',
    loginErrorText: '',
  };
  state = this.initialState;

  handleUsernameChange = (e, username) => {
    if (this.props.isValidUsername(username)) {
      this.setState({usernameErrorText: this.initialState.usernameErrorText});
      return true;
    } else {
      this.setState({usernameErrorText: this.props.usernameErrorText});
      this.username.focus();
      return false;
    }
  };
  handlePasswordChange = (e, password) => {
    if (this.props.isValidPassword(password)) {
      this.setState({passwordErrorText: this.initialState.passwordErrorText});
      return true;
    } else {
      this.setState({passwordErrorText: this.props.passwordErrorText});
      this.password.focus();
      return false;
    }
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

    const username = this.username.getValue();
    const password = this.password.getValue();
    const remember = this.remember.isChecked();
  
    const validated = this.handlePasswordChange(null, password) 
        & this.handleUsernameChange(null, username);

    if (validated) {
      this.setState({loading: true});
      this.props.onLogin(username, password, remember)
      .then(response => {
        this.setState({loading: false});
        this.handleClose();
      })
      .catch(error => {
        this.setState({loading: false});
        if (error.response.status === 401) {
          this.setState({loginErrorText: this.props.unauthorizedText});
          this.username.focus();
        } else {
          this.setState({loginErrorText: this.props.loginErrorText});
        }
      });
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
                status={this.state.loading ? "loading":"hide"}
                style={style.loading} />
          </div>

          <form onSubmit={this.handleLogin} style={style.loginForm}>
            <span style={style.loginError}>{this.state.loginErrorText}</span>
            <TextField name="username"
                ref={input => this.username = input}
                type="text" hintText="username"
                disabled={this.state.loading}
                errorText={this.state.usernameErrorText}
                onChange={this.handleUsernameChange}
                fullWidth={true} spellCheck="false"
                autoCorrect="off" autoComplete="off"
                autoCapitalize="off"
                autoFocus />
            <TextField name="password"
                ref={input => this.password = input}
                type="password" hintText="password"
                disabled={this.state.loading}
                errorText={this.state.passwordErrorText}
                onChange={this.handlePasswordChange}
                fullWidth={true} />
            <Checkbox name="remember"
              ref={input => this.remember = input}
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
LoginButton.defaultProps = {
  usernameErrorText: 'enter a valid username',
  passwordErrorText: 'enter a password',
  unauthorizedText: 'invalid username/password',
  loginErrorText: 'something\'s broken...'
};

export default muiThemeable()(LoginButton);
