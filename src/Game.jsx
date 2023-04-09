import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Card from './components/Card';

export default class Game extends Component {
  state = {
    play: 'Play',
    contestantsReady: false,
    resolution: {
      msg: 'Selecione uma categoria',
      cond: '',
    },
    hideEnemyCard: true,
  };

  componentDidMount() {
    this.shuffleDeck();
  }

  shuffleDeck = () => {
    const { cards } = this.props;
    const magicNumber = 0.5;
    cards.sort(() => Math.random() - magicNumber);
  };

  startGame = () => {
    this.shuffleDeck();
    this.setState({
      contestantsReady: true,
      resolution: { msg: 'Selecione uma categoria' },
      hideEnemyCard: true });
  };

  winner = (message, cond) => {
    this.setState({ play: 'Play Again!', resolution: { msg: message, cond } });
  };

  fight = (pAttr, cardAttr) => {
    if (pAttr > cardAttr) {
      this.winner('Shantay you stay', 'win');
    } else if (pAttr < cardAttr) {
      this.winner('Sashay away', 'lose');
    } else {
      this.winner('Shantay you both stay! <3', 'draw');
    }
  };

  compareAttr = (attrType, playerAttr) => {
    const { cards } = this.props;
    const { cardAttr1, cardAttr2, cardAttr3, cardAttr4 } = cards[1];
    this.setState({
      hideEnemyCard: false,
    });
    switch (attrType) {
    case 'carisma':
      this.fight(playerAttr, cardAttr1);
      break;
    case 'uniqueness':
      this.fight(playerAttr, cardAttr2);
      break;
    case 'nerve':
      this.fight(playerAttr, cardAttr3);
      break;
    case 'talent':
      this.fight(playerAttr, cardAttr4);
      break;
    default:
      return 'Error: No drag queens found!';
    }
  };

  render() {
    const { cards } = this.props;
    const {
      hideEnemyCard,
      play,
      contestantsReady,
      resolution: { msg, cond },
    } = this.state;
    const {
      cardName: pCardName,
      cardDescription: pCardDescription,
      cardAttr1: pCardAttr1,
      cardAttr2: pCardAttr2,
      cardAttr3: pCardAttr3,
      cardAttr4: pCardAttr4,
      cardImage: pCardImage,
      cardRare: pCardRare,
      cardTrunfo: pCardTrunfo,
    } = cards[0];
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
    } = cards[1];

    return (
      <>
        <div className="result">
          <h2 className={ cond }>{msg}</h2>
        </div>
        <div className="flex__container">
          <button
            onClick={ () => this.startGame() }
            className="save__button play__button"
          >
            {play}
          </button>
        </div>
        <div className="flex__container">
          {contestantsReady ? (
            <>
              <Card
                cardName={ pCardName }
                cardDescription={ pCardDescription }
                cardAttr1={ pCardAttr1 }
                cardAttr3={ pCardAttr3 }
                cardAttr2={ pCardAttr2 }
                cardAttr4={ pCardAttr4 }
                cardImage={ pCardImage }
                cardRare={ pCardRare }
                cardTrunfo={ pCardTrunfo }
                compareAttr={ this.compareAttr }
                disableButton={ msg }
              />
              <Card
                cardName={ cardName }
                cardDescription={ cardDescription }
                cardAttr1={ cardAttr1 }
                cardAttr2={ cardAttr2 }
                cardAttr3={ cardAttr3 }
                cardAttr4={ cardAttr4 }
                cardImage={ cardImage }
                cardRare={ cardRare }
                cardTrunfo={ cardTrunfo }
                hideEnemyCard={ hideEnemyCard }
              />
            </>
          ) : (
            ''
          )}
        </div>
      </>
    );
  }
}

Game.propTypes = {
  cards: PropTypes.shape({
    sort: PropTypes.func,
  }).isRequired,
};
