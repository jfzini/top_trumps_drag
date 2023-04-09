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
    score: {
      player: 0,
      enemy: 0,
    },
    cards: {
      playerCard: 0,
      enemyCard: 1,
    }
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
    const { cards } = this.props;
    const {cards: { enemyCard }} = this.state;
    if (enemyCard < cards.length - 2) {
      this.setState(prevState => ({
        contestantsReady: true,
        resolution: { msg: 'Selecione uma categoria' },
        hideEnemyCard: true,
        cards: {
          playerCard: prevState.cards.playerCard + 2,
          enemyCard: prevState.cards.enemyCard + 2,
        }
      }));
    } else {
      this.setState({resolution: { msg: 'FIM DE JOGO!' }})
    }

  };

  winner = (message, cond) => {
    this.setState({ play: 'Play Again!', resolution: { msg: message, cond } });
  };

  fight = (pAttr, cardAttr) => {
    if (pAttr > cardAttr) {
      this.winner('Shantay you stay', 'win');
      this.setState(prevState => ({
        score: { 
          player: prevState.score.player + 1,
          enemy: prevState.score.enemy,
        }
      }))
    } else if (pAttr < cardAttr) {
      this.winner('Sashay away', 'lose');
      this.setState(prevState => ({
        score: { 
          player: prevState.score.player,
          enemy: prevState.score.enemy + 1,
        }
      }))
    } else {
      this.winner('Shantay you both stay! <3', 'draw');
      this.setState(prevState => ({
        score: { 
          player: prevState.score.player + 1,
          enemy: prevState.score.enemy + 1,
        }
      }))
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
      score: {
        player,
        enemy,
      },
      cards: {
        playerCard,
        enemyCard,
      }
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
    } = cards[playerCard];
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
    } = cards[enemyCard];

    return (
      <>
        <div className="result">
          <h2 className={cond}>{msg}</h2>
        </div>
        <div className="flex__container">
          <button onClick={() => this.startGame()} className="save__button play__button">
            {play}
          </button>
        </div>
        <div>
          {contestantsReady ? (
            <>
              <div className="flex__container">
                <div>
                  <p>Placar:</p>
                  <p>Jogador(a):{player}</p>
                  <p>Computador:{enemy}</p>
                </div>
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
                  compareAttr={this.compareAttr}
                  disableButton={msg}
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
                  hideEnemyCard={hideEnemyCard}
                />
              </div>
            </>
          ) : (
            ''
          )}
        </div>
        <section className="game__rules">
                <h3>Regras</h3>
                <ol>
                  O jogo já possui um baralho previamente criado, porém você pode adicionar cartas
                  personalizadas clicando no botão "Editar Deck" acima!
                  <li>
                    Escolha um atributo (Charisma, Uniqueness Nerve ou Talent) de sua carta, virada para cima. O valor deste atributo será comparado ao da carta oponente, virada para baixo.
                  </li>
                  <li>O valor máximo que um atributo pode ter é 90.</li>
                  <li>
                    Vence a carta cujo atributo escolhido tiver o maior valor.
                  </li>
                  <li>Em caso de empate, ambos ganham pontos!</li>
                </ol>
                Divirta-se!
              </section>
      </>
    );
  }
}

Game.propTypes = {
  cards: PropTypes.shape({
    sort: PropTypes.func,
  }).isRequired,
};
