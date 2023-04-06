import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import './Card.css';

class Card extends Component {
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
    } = this.props;

    return (
      <div className="creation__form card__container">
        <p data-testid="name-card" className="card__name">
          {cardName}
        </p>
        <div className="card__img--container">
          <img src={cardImage} alt={cardName} data-testid="image-card" className="card__img" />
        </div>
        <p data-testid="description-card">{cardDescription}</p>
        <div>
          <p data-testid="attr1-card" className="card__attr">
            {cardAttr1}
          </p>
        </div>
        <div>
          <p data-testid="attr2-card" className="card__attr">
            {cardAttr2}
          </p>
        </div>
        <div>
          <p data-testid="attr3-card" className="card__attr">
            {cardAttr3}
          </p>
        </div>
        <div>
          <img src="" alt="" />
          <p className="card__attr">
            {cardAttr3}
          </p>
        </div>
        <p data-testid="rare-card" className="card__rare">
          {cardRare}
        </p>
        {cardTrunfo ? (
          <p data-testid="trunfo-card" className="card__trunfo">
            Super Trunfo
          </p>
        ) : null}
      </div>
    );
  }
}

export default Card;

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};
