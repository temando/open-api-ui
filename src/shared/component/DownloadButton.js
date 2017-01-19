import React, { PropTypes, Component } from 'react';

export default class DownloadButton extends Component {
  render() {
    // return (
    //   <div>
    //     <a target="_blank" href={this.props.url}>Download Swagger</a>
    //   </div>
    // );
    return (
      <div>
        {/*<a href="#store">Go to store</a>*/}
        <button onClick={() => {
          window.location.replace(
            window.location.pathname + window.location.search + '#/store'
          );
        }}>Go to store
        </button>
      </div>

    );
  }
}

DownloadButton.propTypes = {
  url: PropTypes.string,
};
