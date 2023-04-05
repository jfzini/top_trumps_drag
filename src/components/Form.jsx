import React, { Component } from 'react';
import Input from './Input';
import inputData from './components_data/input_data';

class Form extends Component {
  render() {
    return (
      <form action="">
        {inputData.map(({ label, inputType, testID, inputID, name }) => (
          <Input
            key={ inputID }
            label={ label }
            inputType={ inputType }
            testID={ testID }
            inputID={ inputID }
            name={ name }
          />
        ))}
        <label htmlFor="description-input">
          Descrição
          <textarea
            name="description-input"
            id="description-input"
            cols="30"
            rows="10"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="">
          Raridade
          <select name="rare-input" id="rare-input" data-testid="rare-input">
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <button data-testid="save-button" id="save-button">
          Salvar
        </button>
      </form>
    );
  }
}

export default Form;
