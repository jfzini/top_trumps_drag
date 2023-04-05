import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

class Form extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <form action="name-input">
        <Input
          id="name-input"
          type="text"
          label="Nome"
          name="cardName"
          value={ cardName }
          onChange={ onInputChange }
        />
        <label htmlFor="description-input">
          Descrição
          <textarea
            name="cardDescription"
            id="description-input"
            cols="30"
            rows="10"
            data-testid="description-input"
            value={ cardDescription }
            onChange={ onInputChange }
          />
        </label>
        <Input
          id="attr1-input"
          name="cardAttr1"
          label="Atributo 1"
          type="number"
          value={ cardAttr1 }
          onChange={ onInputChange }
        />
        <Input
          id="attr2-input"
          name="cardAttr2"
          label="Atributo 2"
          type="number"
          value={ cardAttr2 }
          onChange={ onInputChange }
        />
        <Input
          id="attr3-input"
          name="cardAttr3"
          label="Atributo 3"
          type="number"
          value={ cardAttr3 }
          onChange={ onInputChange }
        />
        <Input
          id="image-input"
          name="cardImage"
          label="Imagem"
          type="text"
          value={ cardImage }
          onChange={ onInputChange }
        />
        <label htmlFor="rare-input">
          Raridade
          <select
            name="cardRare"
            id="rare-input"
            data-testid="rare-input"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <Input
          id="trunfo-input"
          name="cardTrunfo"
          label="Trunfo"
          type="checkbox"
          checked={ cardTrunfo }
          onChange={ onInputChange }
        />
        <label htmlFor="save-button">
          <button
            data-testid="save-button"
            id="save-button"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
          >
            Salvar
          </button>
        </label>
      </form>
    );
  }
}

export default Form;

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};
