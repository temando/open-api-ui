import React from 'react';

import './SwaggerURLInput.scss';

class SwaggerURLInput extends React.Component {

  onSubmit(e) {
    e.preventDefault();

    const swaggerURL = this.swaggerURLInput.value;
    this.props.onSwaggerURLProvided(swaggerURL);
  }

  render() {
    return (
      <form className="swagger-url-input-form" onSubmit={this.onSubmit.bind(this)}>
        <p>Please enter Swagger URL</p>
        <input type="text"
               placeholder="Swagger URL"
               ref={(input) => {
                 this.swaggerURLInput = input
               }}/>
        <button className="waves-effect waves-light btn" type="Submit">Submit</button>
      </form>
    );
  }
}

SwaggerURLInput.propTypes = {
  onSwaggerURLProvided: React.PropTypes.func.isRequired,
};

export default SwaggerURLInput
