import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './App.css';
import './components/Form.css';
import { validateText, validateAttr } from './helpers';
import { dragData } from './data/data';
import Game from './Game';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardAttr4: '0',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    hasTrunfo: dragData.some(({ cardTrunfo }) => cardTrunfo === true),
    isSaveButtonDisabled: true,
    savedCardsArr: [...dragData],
    filterQuery: '',
    filterRarity: ['normal', 'raro', 'muito raro'],
    filterTrunfo: false,
    deckEdit: false,
    gameState: 'Editar Deck',
  };

  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = name === 'cardTrunfo' ? target.checked : target.value;
    this.setState({ [name]: value }, this.validateFields);
  };

  handleClick = async () => {
    const savedCard = this.state;
    const { savedCardsArr: deck } = this.state;
    await this.setState(({ savedCardsArr, cardTrunfo: prevCardTrunfo, hasTrunfo }) => ({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardAttr4: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      hasTrunfo: prevCardTrunfo ? true : hasTrunfo,
      savedCardsArr: [...savedCardsArr, savedCard],
    }));
    const storageDeck = JSON.stringify(deck);
    localStorage.setItem('deck', storageDeck);
  };

  handleRemoveBtn = (index) => {
    const { savedCardsArr, hasTrunfo } = this.state;
    const newArray = savedCardsArr;
    newArray.splice(index, 1);
    this.setState({
      savedCardsArr: newArray,
    });
    if (hasTrunfo) {
      this.setState({
        hasTrunfo: newArray.some(({ cardTrunfo }) => cardTrunfo === true),
      });
    }
  };

  handleNameFilter = ({ target: { value } }) => {
    this.setState({ filterQuery: value });
  };

  handleRareFilter = ({ target }) => {
    const value = target.value === 'todas' ? ['normal', 'raro', 'muito raro'] : [target.value];
    this.setState({ filterRarity: value });
  };

  handleTrunfoFilter = ({ target }) => {
    const value = target.checked;
    if (value) {
      this.setState({ filterTrunfo: true });
    } else {
      this.setState({ filterTrunfo: false });
    }
  };

  handleLoad = () => {
    const parsedStoredDeck = JSON.parse(localStorage.getItem('deck'));
    if (parsedStoredDeck) {
      this.setState({
        savedCardsArr: [...parsedStoredDeck],
      });
    }
  };

  validateFields = () => {
    const textFields = validateText(this.state);
    const attrFields = validateAttr(this.state);
    this.setState({ isSaveButtonDisabled: !(textFields && attrFields) });
  };

  renderDeck = (
    {
      cardName: savedName,
      cardDescription: savedDescription,
      cardAttr1: savedAttr1,
      cardAttr2: savedAttr2,
      cardAttr3: savedAttr3,
      cardAttr4: savedAttr4,
      cardImage: savedImage,
      cardRare: savedRare,
      cardTrunfo: savedTrunfo,
    },
    index,
  ) => (
    <div key={ index } className="deck__card--container">
      <Card
        cardName={ savedName }
        cardDescription={ savedDescription }
        cardAttr1={ savedAttr1 }
        cardAttr2={ savedAttr2 }
        cardAttr3={ savedAttr3 }
        cardAttr4={ savedAttr4 }
        cardImage={ savedImage }
        cardRare={ savedRare }
        cardTrunfo={ savedTrunfo }
      />
      <button
        data-testid="delete-button"
        onClick={ () => this.handleRemoveBtn(index) }
        className="remove__button"
      >
        <span className="material-symbols-outlined">delete_forever</span>
      </button>
    </div>
  );

  editDeck = () => {
    const { deckEdit } = this.state;
    if (!deckEdit) {
      this.setState((prevState) => ({
        deckEdit: !prevState.deckEdit,
        gameState: 'Voltar ao Jogo',
      }));
    } else {
      this.setState((prevState) => ({
        deckEdit: !prevState.deckEdit,
        gameState: 'Editar Deck',
      }));
    }
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
      hasTrunfo,
      isSaveButtonDisabled,
      savedCardsArr,
      filterQuery,
      filterRarity,
      filterTrunfo,
      deckEdit,
      gameState,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo Drag</h1>
        <div className="flex__container">
          <button onClick={ this.editDeck } className="save__button">{gameState}</button>
        </div>
        {!deckEdit ? (
          <Game cards={ savedCardsArr } />
        ) : (
          <>
            <section className="creation__container">
              <Form
                cardName={ cardName }
                cardDescription={ cardDescription }
                cardAttr1={ cardAttr1 }
                cardAttr2={ cardAttr2 }
                cardAttr3={ cardAttr3 }
                cardAttr4={ cardAttr4 }
                cardImage={ cardImage }
                cardRare={ cardRare }
                cardTrunfo={ cardTrunfo }
                hasTrunfo={ hasTrunfo }
                isSaveButtonDisabled={ isSaveButtonDisabled }
                onInputChange={ this.handleChange }
                onSaveButtonClick={ this.handleClick }
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
              />
            </section>
            <h2>Seu Baralho</h2>
            <div className="filter__container">
              <label htmlFor="name-filter">
                {' '}
                Filtrar por nome
                <input
                  type="text"
                  name="filterQuery"
                  data-testid="name-filter"
                  id="name-filter"
                  onChange={ this.handleNameFilter }
                  disabled={ filterTrunfo }
                />
              </label>
              <label htmlFor="rare-filter">
                Filtrar por tipo
                <select
                  name="filterRarity"
                  id="rare-filter"
                  data-testid="rare-filter"
                  onChange={ this.handleRareFilter }
                  disabled={ filterTrunfo }
                >
                  <option value="todas">todas</option>
                  <option value="normal">normal</option>
                  <option value="raro">raro</option>
                  <option value="muito raro">muito raro</option>
                </select>
              </label>
              <label htmlFor="trunfo-filter">
                Super Trunfo
                <input
                  type="checkbox"
                  name="filterTrunfo"
                  id="trunfo-filter"
                  data-testid="trunfo-filter"
                  onChange={ this.handleTrunfoFilter }
                />
              </label>
            </div>
            <section className="deck__container">
              {filterTrunfo
                ? savedCardsArr
                  .filter(({ cardTrunfo: trunfo }) => trunfo === true)
                  .map((el, index) => this.renderDeck(el, index))
                : savedCardsArr
                  .filter(
                    ({ cardName: name, cardRare: rarity }) => name.toLowerCase().includes(filterQuery.toLowerCase())
                        && filterRarity.some((el) => el === rarity),
                  )
                  .map((el, index) => this.renderDeck(el, index))}
            </section>
          </>
        )}
      </div>
    );
  }
}

export default App;
