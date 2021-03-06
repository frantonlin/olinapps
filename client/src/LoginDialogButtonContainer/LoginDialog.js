import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import Dialog, {
  DialogActions,
  DialogContent,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import DisabledLoadingIndicator from './DisabledLoadingIndicator';

const styles = theme => ({
  DialogContent: {
    maxWidth: '320px',
    paddingBottom: '0px',
  },
  error: {
    color: theme.palette.error.A400,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    textAlign: 'left',
    marginTop: theme.spacing.unit,
    lineHeight: '1em',
    minHeight: '1em',
    margin: 0,
  },
  disabled: {
    color: theme.palette.action.disabled,
  }
});

class LoginDialog extends Component {
  initialState = {
    loginErrorText: '',
    usernameErrorText: '',
    passwordErrorText: '',
    username:'',
    password:'',
    remember:true,
  };
  state = this.initialState;

  form = {
    username: {
      name: 'username',
      validate: this.props.validateUsername,
      stateErrorText: 'usernameErrorText',
      ref: 'usernameInput',
    },
    password: {
      name: 'password',
      validate: this.props.validatePassword,
      stateErrorText: 'passwordErrorText',
      ref: 'passwordInput',
    },
  }

  handleInputChange = input => event => {
    this.setState({[input.name]: event.target.value});
    this.validateInput(event.target.value, input);
  };
  validateInput = (value, input) => {
    const errorText = input.validate(value);
    if (errorText) {
      this.setState({[input.stateErrorText]: errorText});
      this[input.ref].focus();
      return false;
    }
    this.setState({[input.stateErrorText]: ''})
    return true;
  };
  handleRememberChange= event => {
    this.setState({remember: event.target.checked});
  }
  handleSubmit = event => {
    event.preventDefault();
    this.setState({loginErrorText: ''});

    const username = this.state.username;
    const password = this.state.password;
    const remember = this.state.remember;
    const validated = this.validateInput(password, this.form.password)
        & this.validateInput(username, this.form.username);

    if (validated) {
      this.props.onLogin(username, password, remember)
      .then(loginErrorText => {
        if (loginErrorText) {
          this.setState({loginErrorText});
          this.usernameInput.focus();
        }
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.open === false && this.props.open === true) {
      // set timeout for duration of leaving screen transition
      // prevents visible changes on close
      setTimeout(() => {this.setState(this.initialState)}, 195);
    }
  };

  render() {
    const { classes } = this.props;
    const LoginError = this.state.loginErrorText!=='' ?
      <div className={classes.error}>{this.state.loginErrorText}</div> :
      null;
    
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onRequestClose}
      >
        <DialogContent className={classes.DialogContent}>
          <form id="loginForm" onSubmit={this.handleSubmit} className={classes.container}>
            {LoginError}
            <TextField
              autoFocus
              placeholder="username"
              inputRef={input => this.usernameInput = input}
              type="text"
              value={this.state.username}
              onChange={this.handleInputChange(this.form.username)}
              disabled={this.props.isLoading}
              error={this.state.usernameErrorText!==''}
              helperText={this.state.usernameErrorText}
              InputProps={{
                spellCheck: 'false',
                autoCorrect: 'off',
                autoComplete: 'off',
                autoCapitalize: 'off',
              }}
              margin="dense"
              fullWidth
            />
            <TextField
              placeholder="password"
              inputRef={input => this.passwordInput = input}
              type="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.handleInputChange(this.form.password)}
              disabled={this.props.isLoading}
              error={this.state.passwordErrorText!==''}
              helperText={this.state.passwordErrorText}
              margin="dense"
              fullWidth
            />

            <FormControlLabel
              label={
                <span className={this.props.isLoading ? classes.disabled : null}>
                  remember me
                </span>
              }
              control={
                <Checkbox
                  ref={input => this.rememberInput = input}
                  checked={this.state.remember}
                  onChange={this.handleRememberChange}
                />
              }
              disabled={this.props.isLoading}
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={this.props.onRequestClose}
            color="primary"
            disabled={this.props.isLoading}
          >
            cancel
          </Button>
          <Button
            color="accent"
            type="submit"
            form="loginForm"
            disabled={this.props.isLoading}
          >
            login
          </Button>
        </DialogActions>

        <DisabledLoadingIndicator size={45} isLoading={this.props.isLoading} />
      </Dialog>
    );
  };
}

export default withStyles(styles)(LoginDialog);
