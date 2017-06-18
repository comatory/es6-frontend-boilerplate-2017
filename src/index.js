/* eslint-env browser */
/* eslint no-underscore-dangle: 0 */

import ReactDOM from 'react-dom';
import React from 'react';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import App from './components/App';
import reducers from './reducers';

const createStoreFinal = compose(
 applyMiddleware(ReduxThunk),
     (window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f),
)(createStore);
const store = createStoreFinal(reducers, {});

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'));
