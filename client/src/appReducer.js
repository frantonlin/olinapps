import { combineReducers } from 'redux'
import user from './LoginDialogButtonContainer/reducers'
import appSearch from './AppSearchContainer/reducers';

const appReducer = combineReducers({
  user,
  appSearch,
});

export default appReducer;
