import React, { PropTypes, Component } from 'react';

import './Header.scss';

export default class Header extends Component {
  render() {
    const { title, baseUrl, apiVersion, host } = this.props;
    return (
      <header className="header">
        <div className="container">
          <h1 className="flow-text white-text headerTitle">
            {title}
          </h1>
          <div className="apiInfo">
            {host ? <span className="white-text">Host: {host}</span> : null}
            {baseUrl ? <span className="white-text">Base Url: {baseUrl}</span> : null}
            {
              apiVersion
                ? <span className="white-text">API Version: {apiVersion}</span>
                : null
            }
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  baseUrl: PropTypes.string,
  apiVersion: PropTypes.string,
  host: PropTypes.string,
};
