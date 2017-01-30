import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { routerReducer } from 'react-router-redux';

import definitionReducer from './reducers/definitionReducer';

export default function configureStore(initialState = window.STATE_FROM_SERVER) {
  const reducer = combineReducers({
    definition: definitionReducer,
    routing: routerReducer
  });

  const middlewares = [ thunk ];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return store;
}
