import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './App.css';
import { validateText, validateAttr } from './helpers';

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
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    savedCardsArr: [],
    filterQuery: '',
    filterRarity: ['normal', 'raro', 'muito raro'],
    filterTrunfo: false,
  };

  validateFields = () => {
    const textFields = validateText(this.state);
    const attrFields = validateAttr(this.state);
    this.setState({ isSaveButtonDisabled: !(textFields && attrFields) });
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = name === 'cardTrunfo' ? target.checked : target.value;
    this.setState({ [name]: value }, this.validateFields);
  };

  handleClick = () => {
    const savedCard = this.state;
    this.setState(({ savedCardsArr, cardTrunfo: prevCardTrunfo, hasTrunfo }) => ({
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
  };

  handleRemoveBtn = async (index) => {
    const { savedCardsArr, hasTrunfo } = this.state;
    const newArray = savedCardsArr;
    newArray.splice(index, 1);
    this.setState({
      savedCardsArr: newArray,
    });
    if (hasTrunfo) {
      await this.setState({
        hasTrunfo: newArray.some(({ cardTrunfo }) => cardTrunfo === true),
      });
    }
  };

  handleNameFilter = ({ target: { value } }) => {
    this.setState({ filterQuery: value });
  };

  handleRareFilter = ({ target }) => {
    const value = target.value === 'todas'
      ? ['normal', 'raro', 'muito raro']
      : [target.value];
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
        <span className="material-symbols-outlined">
          delete_forever
        </span>
      </button>
    </div>
  );

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1, cardAttr2,
      cardAttr3, cardAttr4,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      savedCardsArr,
      filterQuery,
      filterRarity,
      filterTrunfo,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo Drag</h1>
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
        <section className="deck__container">
          <div>
            <input
              type="text"
              name="filterQuery"
              data-testid="name-filter"
              onChange={ this.handleNameFilter }
              disabled={ filterTrunfo }
            />
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
          { filterTrunfo
            ? (savedCardsArr.filter(({ cardTrunfo: trunfo }) => trunfo === true)
              .map((el, index) => this.renderDeck(el, index)))
            : (savedCardsArr.filter(({ cardName: name, cardRare: rarity }) => (
              name.includes(filterQuery)
              && filterRarity.some((el) => el === rarity)))
              .map((el, index) => this.renderDeck(el, index)))}
        </section>
      </div>
    );
  }
}

export default App;
