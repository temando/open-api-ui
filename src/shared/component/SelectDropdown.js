import React, { PropTypes, Component } from 'react';

import './SelectDropdown.scss';

export default class SelectDropdown extends Component {
  render() {
    const { catalog } = this.props;
    console.log(catalog);
    const tomes = catalog.tomes;
    return (
      <div
        className="dropdown col s12"
        ref={ref => $(document).ready(function() {
          $('select').material_select();
        })}
      >
        <select>
          {tomes.map((tome) => {
            return (
              <option key={tome.id} value={tome.id}>{tome.name}</option>
            );
          })}
        </select>
      </div>
    );
  }
}

SelectDropdown.propTypes = {
  catalog: PropTypes.object
};