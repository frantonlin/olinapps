import App from './App'
import { connect } from 'react-redux'
import { login } from './LoginDialogButtonContainer/actions'

const mapDispatchToProps = dispatch => {
  return {
    onLogin: user => {
      dispatch(login(user));
    }
  };
};

const AppContainer = connect(null, mapDispatchToProps)(App)

export default AppContainer;
