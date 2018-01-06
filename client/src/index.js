import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import registerServiceWorker from './registerServiceWorker';
import appReducer from './appReducer';
import Reboot from 'material-ui/Reboot';
import AppContainer from './AppContainer';
import './index.css';

let store = createStore(appReducer);

ReactDOM.render(
  <Provider store={store}>
    <Reboot>
      <AppContainer />
    </Reboot>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
