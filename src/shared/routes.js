import React from 'react';
import { IndexRoute, Route } from 'react-router';
import BaseHandler from 'routeHandlers/BaseHandler';

// I'm sure there is a better way to allow the app to be serve from anywhere
// (eg a subdomain), but I couldn't find it. Keep in mind I want to be able
// to build this application _without_ knowing where it will be deployed and
// have it work!
const pathBase = window.location.pathname || '/';

const routes = (
  <Route path={pathBase} component={BaseHandler}>
    <IndexRoute component={BaseHandler} />
  </Route>
);

export default routes;
