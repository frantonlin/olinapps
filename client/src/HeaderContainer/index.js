import Header from './Header'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const HeaderContainer = connect(mapStateToProps, null)(Header);

export default HeaderContainer;
