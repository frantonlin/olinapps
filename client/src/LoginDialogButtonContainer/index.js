import LoginDialogButton from './LoginDialogButton'
import { connect } from 'react-redux'
import { login, logout } from './actions'

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: user => {
      dispatch(login(user));
    },
    onLogout: () => {
      dispatch(logout());
    },
  };
};

const LoginDialogButtonContainer = connect(mapStateToProps, mapDispatchToProps)(LoginDialogButton)

export default LoginDialogButtonContainer;
