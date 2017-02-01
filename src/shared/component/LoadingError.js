import React from 'react';
import './LoadingError.scss';

class LoadingError extends React.Component {
  render() {
    setTimeout(() => {
      window.location.replace(window.location.pathname);
    }, 3000);

    return (
      <div className="loading-error">
        <h1>Error loading Swagger file</h1>
        <p>Error message: {this.props.error.message}</p>
        <p>Error stack: {this.props.error.stack}</p>
      </div>
    );
  }
}

LoadingError.propTypes = {
  error: React.PropTypes.object.isRequired,
};

export default LoadingError;
