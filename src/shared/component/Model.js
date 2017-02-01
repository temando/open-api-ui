import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import './Model.scss';

/**
 * Returns a string that displays a Swagger Schema object.
 *
 * @param  {Object} schema
 * @param  {String} name
 * @param  {Array} requiredFields
 * @return {String}
 */
function formatSchema(schema, name = '', requiredFields = []) {
  if (_.isObject(schema) === false || _.has(schema, 'type') === false) {
    return `${name}`;
  }

  let output;

  switch (schema.type) {
    case 'object':
      output = `${name ? `${name}: ` : ''}{\n${
        _.map(schema.properties,
          (property, key) => formatSchema(property, key, schema.required).replace(/\n/g, '\n  '))
          .map(str => `  ${str},`)
          .join('\n')
        }\n}`;
      break;
    case 'array':
      output = `${name ? `${name}: ` : ''}[\n  ${
        formatSchema(schema.items, 'items', schema.required).replace(/\n/g, '\n  ')
        }\n]`;
      break;
    default:
      const isMandatory = _.includes(requiredFields, name);
      let type;
      if (isMandatory) {
        type = `${schema.type}, required`;
      } else {
        type = schema.type;
      }
      const description = schema.description || '';
      output = `${name}: (${type}) ${description}`.trim();

      // Also attach enum values if exist
      if (schema.enum) {
        output += `. Valid values: ${renderEnumValues(schema.enum)}`;
      }
  }

  return output;
}

/**
 * Return a string representation of an enum
 * Example output: ['black', 'white', null]
 *
 * @param {Array} values
 *
 * @return {string}
 */
function renderEnumValues(values) {
  if (!values || values.length == 0) {
    return '';
  }

  const result = values
    .map((value) => {
      if (value === null || value === undefined) {
        return `${value}`;
      } else if (typeof value === 'string') {
        return `'${value}'`;
      } else {
        return value;
      }
    })
    .join(', ');

  return `[${result}]`;
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
        <ul className="tabs" ref={ref => $(document).ready(() => {
          $(ref).tabs();
        })}>
          <li className='tab'>
            <a
              className={classNames({
                'blue-grey-text text-darken-1': this.state.modelTab !== 'schema',
                active: this.state.modelTab === 'schema'
              })}
              onClick={() => this.setTab('schema')}
            >Model Schema</a>
          </li>
          <li className={classNames({
            disabled: !this.props.examples,
            tab: true
          })}>
            <a
              className={classNames({
                'blue-grey-text': this.state.modelTab !== 'example',
                'text-lighten-4': !this.props.examples,
                'text-darken-1': this.props.examples,
                active: this.state.modelTab === 'example'
              })}
              onClick={() => this.props.examples && this.setTab('example')}
            >Example</a>
          </li>
          <li className='tab'>
            <div
              className={`input-field ${classNames({ hide: this.state.modelTab !== 'example' })}`}
            >
              <select
                onChange={event => this.setMimeType(event.target.value)}
                defaultValue={this.state.mimeType}
              >{mimeTypes.map(mime => <option key={mime} value={mime}>{mime}</option>)}
              </select>
            </div>
          </li>
        </ul>
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
