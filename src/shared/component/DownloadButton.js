import React, { PropTypes, Component } from 'react';

export default class DownloadButton extends Component {
  render() {
    return (
      <div>
        <a target="_blank" href={this.props.url}>Download Swagger</a>
      </div>
    );
  }
}

DownloadButton.propTypes = {
  url: PropTypes.string,
};
