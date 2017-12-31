import { combineReducers } from 'redux'
import user from './LoginDialogButtonContainer/reducers'

const appReducer = combineReducers({
  user,
});

export default appReducer;
