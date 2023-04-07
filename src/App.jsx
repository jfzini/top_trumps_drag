import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './App.css';

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
  };

  validateText = () => {
    const { cardName, cardDescription, cardImage } = this.state;

    const validateName = cardName.length > 0;
    const validateDescription = cardDescription.length > 0;
    const validateImage = cardImage.length > 0;
    const validateTextFields = validateName && validateDescription && validateImage;
    return validateTextFields;
  };

  validateAttr = () => {
    const { cardAttr1, cardAttr2, cardAttr3, cardAttr4 } = this.state;
    // power limits for each attribute
    const powerLimit = 90;
    const sumPowerLimit = 210;
    // proper validation
    const attr1 = Number(cardAttr1);
    const attr2 = Number(cardAttr2);
    const attr3 = Number(cardAttr3);
    const attr4 = Number(cardAttr4);
    const valAttr1 = attr1 <= powerLimit && attr1 >= 0;
    const valAttr2 = attr2 <= powerLimit && attr2 >= 0;
    const valAttr3 = attr3 <= powerLimit && attr3 >= 0;
    const valAttr4 = attr4 <= powerLimit && attr4 >= 0;
    const sum = attr1 + attr2 + attr3 + attr4;
    const validateSum = sum <= sumPowerLimit;

    const validateAllAttr = valAttr1 && valAttr2 && valAttr3 && valAttr4 && validateSum;
    return validateAllAttr;
  };

  validateFields = () => {
    const textFields = this.validateText();
    const attrFields = this.validateAttr();

    this.setState({
      isSaveButtonDisabled: !(textFields && attrFields),
    });
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = name === 'cardTrunfo' ? target.checked : target.value;
    this.setState(
      {
        [name]: value,
      },
      this.validateFields,
    );
  };

  handleClick = (event) => {
    event.preventDefault();
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
    } = this.state;

    const savedCard = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardAttr4,
      cardImage,
      cardRare,
      cardTrunfo,
    };

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

  handleRemoveBtn = (index) => {
    console.log(index);
    const { savedCardsArr, hasTrunfo } = this.state;
    const newArray = savedCardsArr;
    newArray.splice(index, 1);
    this.setState({
      savedCardsArr: newArray,
    });
    if (hasTrunfo) {
      this.setState({
        hasTrunfo: false,
      });
    }
  };

  handleFilter = ({ target: { value } }) => {
    this.setState({
      filterQuery: value,
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
      hasTrunfo,
      isSaveButtonDisabled,
      savedCardsArr,
      filterQuery,
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
            <input type="text" data-testid="name-filter" onChange={ this.handleFilter } />
          </div>
          {
            savedCardsArr.filter(({ cardName: name }) => name.includes(filterQuery)).map(
              (
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
              ),
            )
          }
        </section>
      </div>
    );
  }
}

export default App;
