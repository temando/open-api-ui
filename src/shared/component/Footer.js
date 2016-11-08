import React, { Component } from 'react';

import './Footer.scss';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <span>Powered with ❤️ by
          <a
            href="https://github.com/legendecas/material-swagger-ui"
            rel="noopener noreferrer"
            target="_blank"
            className="blue-grey-text text-darken-4"
          > material-swagger-ui</a>.
        </span>
      </footer>
    );
  }
}
