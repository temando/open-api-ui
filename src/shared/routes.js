import React from 'react';
import { IndexRoute, Redirect, Route, NotFoundRoute } from 'react-router';

import BaseHandler from 'routeHandlers/BaseHandler';

const routes = (
  <Route path="/" component={BaseHandler}>
    <IndexRoute component={BaseHandler} />
  </Route>
);

export default routes;
