import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const App = Loadable({
  loader: () => import(/* webpackChunkName: "App" */'../App'),
  loading: () => (null)
});

const SignIn = Loadable({
  loader: () => import(/* webpackChunkName: "SignIn" */'../components/SignIn'),
  loading: () => (null)
});

const NotLoggedRoutes = () => (
  <Switch>
    <Route path="/" exact component={App} />
    <Route path="/login" component={SignIn} />
    <Route path="*" component={App} />
  </Switch>
);

export default NotLoggedRoutes;
