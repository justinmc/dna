require('../css/components/app.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app.jsx';
import configureStore from './stores/configure_store';

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.querySelector('.root')
);
