import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import './Form.css';

class Form extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardAttr4,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <div className="container__row">
        <section className="game__rules">
          <h3>Regras de Criação</h3>
          <ol>
            O jogo já possui um baralho previamente criado, porém você pode adicionar
            cartas personalizadas! Mas é necessário observar algumas regras:
            <li>
              Os atributos (Charisma, Uniqueness, Nerve e Talent) não podem possuir
              valores negativos.
            </li>
            <li>
              O valor máximo de cada atributo é de 90 pontos.
            </li>
            <li>
              A soma dos atributos não pode ser superior a 330, então mesmo o seu Super
              Trunfo não poderá ter o máximo de pontos em todos os atributos.
            </li>
            <li>
              Só é permitido ter um Super Trunfo no baralho.
            </li>
          </ol>
          Divirta-se!
        </section>
        <form action="" className="container__column creation__form">
          <Input
            id="name-input"
            type="text"
            label="Nome"
            name="cardName"
            value={ cardName }
            onChange={ onInputChange }
          />
          <label
            htmlFor="description-input"
            className="container__column creation__input"
          >
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
            label="Charisma"
            type="number"
            value={ cardAttr1 }
            onChange={ onInputChange }
          />
          <Input
            id="attr2-input"
            name="cardAttr2"
            label="Uniqueness"
            type="number"
            value={ cardAttr2 }
            onChange={ onInputChange }
          />
          <Input
            id="attr3-input"
            name="cardAttr3"
            label="Nerve"
            type="number"
            value={ cardAttr3 }
            onChange={ onInputChange }
          />
          <Input
            id="attr4-input"
            name="cardAttr4"
            label="Talent"
            type="number"
            value={ cardAttr4 }
            onChange={ onInputChange }
          />
          <Input
            id="image-input"
            name="cardImage"
            label="URL da imagem"
            type="text"
            value={ cardImage }
            onChange={ onInputChange }
          />
          <label htmlFor="rare-input" className="container__column creation__input">
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
          {hasTrunfo
            ? (<p>Você já tem um Super Trunfo em seu baralho</p>)
            : (
              <label htmlFor="trunfo-input" className="trunfo__checkbox">
                Super Trunfo
                <input
                  type="checkbox"
                  name="cardTrunfo"
                  data-testid="trunfo-input"
                  id="trunfo-input"
                  onChange={ onInputChange }
                  checked={ cardTrunfo }
                />
              </label>
            )}
          <button
            data-testid="save-button"
            id="save-button"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
            className="save__button"
          >
            Salvar
          </button>
        </form>
      </div>
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
  cardAttr4: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};
