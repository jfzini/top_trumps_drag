import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { label, inputType, testID, inputID, name } = this.props;

    return (
      <label htmlFor={ inputID }>
        {label}
        <input type={ inputType } id={ inputID } data-testid={ testID } name={ name } />
      </label>
    );
  }
}

export default Input;

Input.propTypes = {
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  testID: PropTypes.string.isRequired,
  inputID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
