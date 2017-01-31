import React from 'react';

import './SwaggerURLInput.scss';

class SwaggerURLInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form className="swagger-url-input-form" onSubmit={this.handleSubmit}>
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

  handleSubmit(e) {
    e.preventDefault();

    const swaggerURL = this.swaggerURLInput.value;
    this.props.onSwaggerURLProvided(swaggerURL);
  }
}

SwaggerURLInput.propTypes = {
  onSwaggerURLProvided: React.PropTypes.func.isRequired,
};

export default SwaggerURLInput
