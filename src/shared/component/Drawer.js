import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {synchDrawerLocationWithContentLocation} from '../helpers/scrollHelpers';

import './Drawer.scss';

class Drawer extends Component {
  render() {
    const { tags, catalog } = this.props;
    return (
      <ul
        ref={synchDrawerLocationWithContentLocation}
        id="slide-out"
        className="side-nav fixed collapsible drawer-taglist"
        data-collapsible="accordion"
      >
        <li>
          <a className="waves-effect waves-teal" href="#api-description">API Description</a>
        </li>
        {tags.map(tag =>
          <li key={tag.name}>
            <a className="collapsible-header waves-effect waves-light" href={`#${tag.name}`}>
              {tag.name}
              <span className="grey-text">{_.truncate(tag.description)}</span>
            </a>
            <div className="collapsible-body">
              <ul>
                {tag.entrypoints.map(entrypoint =>
                  <li key={entrypoint.method + entrypoint.path}>
                    <a
                      href={`#${_.kebabCase(entrypoint.method + entrypoint.path)}`}
                      className="waves-effect waves-light truncate"
                    >{entrypoint.method.toUpperCase()} {entrypoint.path}</a>
                  </li>
                )}
              </ul>
            </div>
          </li>
        )}
      </ul>
    );
  }
}

Drawer.propTypes = {
  catalog: PropTypes.object
};

export default connect(
  state => ({
    tags: _.map(state.definition.tags,
      tag => ({
        name: tag.name,
        description: tag.description,
        entrypoints: _.filter(state.definition.entrypoints,
          entrypoint => _.includes(entrypoint.operation.tags, tag.name))
          .map(entrypoint => ({
            method: entrypoint.method,
            path: entrypoint.path,
          })),
      })),
  }),
  () => ({})
)(Drawer);
