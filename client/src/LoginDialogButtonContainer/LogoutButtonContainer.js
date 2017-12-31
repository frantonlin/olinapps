import LogoutButton from './LogoutButton'
import { connect } from 'react-redux'
import { logout } from './actions'

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(logout());
    }
  };
};

const LogoutButtonContainer = connect(null, mapDispatchToProps)(LogoutButton)

export default LogoutButtonContainer;
