import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './redux/store/configureStore';
import NotLoggedRoutes from './config/NotLoggedRoutes';

const store = configureStore();
const history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <NotLoggedRoutes />
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root')
);
