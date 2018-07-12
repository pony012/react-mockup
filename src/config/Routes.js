import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Loadable from 'react-loadable';

// const Notifications = Loadable({
//   loader: () => import(/* webpackChunkName: "ProjectDetail" */
// '../components/Notifications/Notifications'),
//   loading: () => (null)
// });
const Routes = () => (
  <Switch>
    <Route path="/" exact component={null} />
  </Switch>
);
export default Routes;
