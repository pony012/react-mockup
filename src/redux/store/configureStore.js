import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export const history = createHistory();
let middleware = routerMiddleware(history);
middleware = [...middleware, ReduxPromise, thunk];

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
