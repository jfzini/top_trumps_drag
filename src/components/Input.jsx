import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Form.css'

class Input extends Component {
  render() {
    const { id, label, name, type, value, checked, onChange } = this.props;

    return (
      <label htmlFor={ id } className='creation__input container__column'>
        {' '}
        { label }
        <input
          type={ type }
          name={ name }
          data-testid={ id }
          id={ id }
          value={ value }
          onChange={ onChange }
          checked={ checked }
        />
      </label>
    );
  }
}

export default Input;

Input.propTypes = {
  checked: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
};

Input.defaultProps = {
  checked: null,
  value: null,
};
