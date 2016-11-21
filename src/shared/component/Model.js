import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
//import hljs from 'highlight';
import _ from 'lodash';
import './Model.scss';

/**
 * Returns a string that displays a Swagger Schema object.
 *
 * @param  {Object} schema [description]
 * @param  {String} name   [description]
 * @return {String}        [description]
 */
function formatSchema(schema, name = '') {
  if (_.isObject(schema) === false || _.has(schema, 'type') === false) {
    return `${name}`;
  }

  switch (schema.type) {
    case 'object':
      return `${name ? `${name}: ` : ''}{\n${
        _.map(schema.properties,
          (property, key) => formatSchema(property, key).replace(/\n/g, '\n  '))
          .map(str => `  ${str},`)
          .join('\n')
        }\n}`;
    case 'array':
      return `${name ? `${name}: ` : ''}[\n  ${
        formatSchema(schema.items, 'items').replace(/\n/g, '\n  ')
        }\n]`;
    default:
      return `${name}: (${schema.type})${schema.description ? ` ${schema.description}` : ''}`;
  }
}

export default class Model extends Component {
  constructor(props, ...rest) {
    super(props, ...rest);

    const { examples = {} } = this.props;

    const mimeTypes = Object.getOwnPropertyNames(examples);
    const mimeType = _.first(mimeTypes, '');

    this.state = {
      mimeTypes: mimeTypes,
      mimeType: mimeType,
      modelTab: 'schema',
    };
  }

  componentDidUpdate() {
    //hljs.highlightBlock(this.codeBlock);
  }

  setTab(tab) {
    this.setState(state => ({ ...state, modelTab: tab }));
  }

  setMimeType(mimeType) {
    this.setState(state => ({ ...state, mimeType }));
  }

  render() {
    const { mimeTypes } = this.state;

    return (
      <div className="model-container">
        <div className="model-button-container">
          <a
            className={classNames({
              'blue-grey-text text-darken-1': this.state.modelTab !== 'schema',
            })}
            onClick={() => this.setTab('schema')}
          >Model Schema</a>
          <div className="model-button-separator"/>
          <a
            className={classNames({
              'blue-grey-text text-darken-1': this.state.modelTab !== 'example',
              disabled: !this.props.examples,
            })}
            onClick={() => this.props.examples && this.setTab('example')}
          >Example</a>
          <div
            className={`input-field ${classNames({ hide: this.state.modelTab !== 'example' })}`}
          >
            <select
              onChange={event => this.setMimeType(event.target.value)}
              defaultValue={this.state.mimeType}
            >{mimeTypes.map(mime => <option key={mime} value={mime}>{mime}</option>)}
            </select>
          </div>
        </div>
        <pre className="model-code-block">
          <code ref={ref => this.codeBlock = ref}>
            {this.state.modelTab === 'schema'
              ? formatSchema(this.props.schema)
              : JSON.stringify(this.props.examples && this.props.examples[this.state.mimeType],
              null, 2)
            }
          </code>
        </pre>
      </div>
    );
  }
}

Model.propTypes = {
  schema: PropTypes.object,
  examples: PropTypes.object,
};
