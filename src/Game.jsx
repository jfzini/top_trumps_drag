import React, { Component } from 'react';
import Card from './components/Card';
import './Game.css';

export default class Game extends Component {
  state = {
    isPlayer: true,
    play: "Play",
    contestantsReady: false,
    resolution: '',
  };
  componentDidMount() {
    console.log('mount');
    this.shuffleDeck();
  }

  shuffleDeck = () => {
    const { cards } = this.props;
    cards.sort(() => Math.random() - 0.5);
  };

  startGame = () => {
    this.shuffleDeck();
    this.setState((prevState) => ({contestantsReady: !prevState.contestantsReady}));
  }

  compareAttr = (attrType, playerAttr) => {
    const { cardAttr1, cardAttr2, cardAttr3, cardAttr4 } = this.props.cards[1];
    switch (attrType) {
      case 'carisma':
        if (playerAttr > cardAttr1) {
          this.setState({ resolution: 'Shantay you stay' });
          break;
        } else if (playerAttr < cardAttr1) {
          return 'Sashay away';
        } else {
          return 'Shantay you both stay! <3';
        }
        break;
      case 'uniqueness':
        if (playerAttr > cardAttr2) {
          this.setState({ resolution: 'Shantay you stay' });
          break;
        } else if (playerAttr < cardAttr2) {
          return 'Sashay away';
        } else {
          return 'Shantay you both stay! <3';
        }
        break;
      case 'nerve':
        if (playerAttr > cardAttr3) {
          this.setState({ resolution: 'Shantay you stay' });
          break;
        } else if (playerAttr < cardAttr3) {
          return 'Sashay away';
        } else {
          return 'Shantay you both stay! <3';
        }
        break;
      case 'talent':
        if (playerAttr > cardAttr4) {
          this.setState({ resolution: 'Shantay you stay' });
          break;
        } else if (playerAttr < cardAttr4) {
          return 'Sashay away';
        } else {
          return 'Shantay you both stay! <3';
        }
        break;
      default:
        return 'Error: No drag queens found!';
        break;
    }
  };

  render() {
    const { cards } = this.props;
    const { isPlayer } = this.state;
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
    console.log(cards[0], cards[1]);
    return (
      <>
        <button 
        onClick={() => this.startGame()}>{this.state.play}</button>
        <div className="game__container">
          {this.state.contestantsReady ?
          <>
          <Card
            cardName={pCardName}
            cardDescription={pCardDescription}
            cardAttr1={pCardAttr1}
            cardAttr3={pCardAttr3}
            cardAttr2={pCardAttr2}
            cardAttr4={pCardAttr4}
            cardImage={pCardImage}
            cardRare={pCardRare}
            cardTrunfo={pCardTrunfo}
            isPlayer={isPlayer}
            compareAttr={this.compareAttr}
          />
          <Card
            cardName={cardName}
            cardDescription={cardDescription}
            cardAttr1={cardAttr1}
            cardAttr2={cardAttr2}
            cardAttr3={cardAttr3}
            cardAttr4={cardAttr4}
            cardImage={cardImage}
            cardRare={cardRare}
            cardTrunfo={cardTrunfo}
            isPlayer={!isPlayer}
          />
          </>
          : ""
        }
        </div>
      </>
    );
  }
}
