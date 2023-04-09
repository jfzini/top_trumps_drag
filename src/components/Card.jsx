import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import './Card.css';
import cImage from '../images/c.png';
import uImage from '../images/u.png';
import nImage from '../images/n.png';
import tImage from '../images/t.png';
import crownImage from '../images/crown.png';
import cardBack from '../images/card-back.gif';

class Card extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('keydown', this.handleScroll);
    window.addEventListener('click', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('keydown', this.handleScroll);
  }

  handleScroll = () => {
    const elementsArr = document.querySelectorAll('.card__container');
    const scrollPosition = window.scrollY + window.innerHeight;

    elementsArr.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      if (scrollPosition > elementPosition) {
        element.classList.add('animated');
      } else {
        element.classList.remove('animated');
      }
    });
  };

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
      compareAttr,
      hideEnemyCard,
      disableButton,
    } = this.props;

    const defaultMsg = 'Selecione uma categoria';

    return (
      <div className="creation__form card__container">
        <p data-testid="name-card" className="card__name">
          {cardName}
        </p>
        <div className="card__img--container">
          <img
            src={ cardImage }
            alt={ cardName }
            data-testid="image-card"
            className="card__img"
          />
        </div>
        <p data-testid="description-card" className="card__description">
          {cardDescription}
        </p>
        <div className="card__attr--container">
          <button
            className="card__attr"
            disabled={ disableButton !== defaultMsg }
            onClick={ () => compareAttr('carisma', cardAttr1) }
          >
            <img src={ cImage } alt="charisma" className="card__attr--img" />
            <p data-testid="attr1-card">{cardAttr1}</p>
          </button>
          <button
            disabled={ disableButton !== defaultMsg }
            className="card__attr"
            onClick={ () => compareAttr('uniqueness', cardAttr2) }
          >
            <img src={ uImage } alt="uniqueness" className="card__attr--img" />
            <p data-testid="attr2-card">{cardAttr2}</p>
          </button>
          <button
            disabled={ disableButton !== defaultMsg }
            className="card__attr"
            onClick={ () => compareAttr('nerve', cardAttr3) }
          >
            <img src={ nImage } alt="nerve" className="card__attr--img" />
            <p data-testid="attr3-card">{cardAttr3}</p>
          </button>
          <button
            disabled={ disableButton !== defaultMsg }
            className="card__attr"
            onClick={ () => compareAttr('talent', cardAttr4) }
          >
            <img src={ tImage } alt="talent" className="card__attr--img" />
            <p>{cardAttr4}</p>
          </button>
        </div>
        <div className={ `card__rare--container ${cardRare}` }>
          <p data-testid="rare-card" className="card__rare">
            {cardRare}
          </p>
        </div>
        {hideEnemyCard ? (
          <div className="card-back">
            <img src={ cardBack } alt="" />
          </div>
        ) : null}
        {cardTrunfo ? (
          <div className="super-trunfo--container">
            <img src={ crownImage } alt="super-trunfo" className="super-trunfo" />
            <p data-testid="trunfo-card" className="card__trunfo">
              Super Trunfo
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Card;

Card.propTypes = {
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardAttr4: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  compareAttr: PropTypes.func,
  disableButton: PropTypes.string,
  hideEnemyCard: PropTypes.bool,
};

Card.defaultProps = {
  compareAttr: null,
  disableButton: null,
  hideEnemyCard: null,
};
