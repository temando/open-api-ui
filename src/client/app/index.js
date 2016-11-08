import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from 'routes';
import configureStore from 'configureStore';

// const isBrowser = typeof navigator !== 'undefined' && navigator.indexOf('Node.js') === -1;

const store = configureStore();
//const history = syncHistoryWithStore(browserHistory, store);

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>{routes}</Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('content'));
