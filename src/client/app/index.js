import React from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import App from 'component/App';
import SwaggerURLInput from 'component/SwaggerURLInput';

function onSwaggerURLProvided(url) {
  window.location.replace(
    window.location.pathname + `?url=${url}`
  );
}

const query = queryString.parse(window.location.search);
const swaggerURL = query.url;

if (!swaggerURL) {
  ReactDOM.render(<SwaggerURLInput
    onSwaggerURLProvided={onSwaggerURLProvided}/>, document.getElementById('content'));
} else {
  ReactDOM.render(<App/>, document.getElementById('content'));
}
