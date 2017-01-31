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

  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  const additionalStoreEnhancers = [
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  ];

  const store = createStore(
    reducer,
    initialState,
    compose(applyMiddleware(...middlewares), ...additionalStoreEnhancers)
  );

  return store;
}
