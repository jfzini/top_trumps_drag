import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    isSaveButtonDisabled: true,
    savedCardsArr: [],
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
    const { cardAttr1, cardAttr2, cardAttr3 } = this.state;
    // power limits for each attribute
    const powerLimit = 90;
    const sumPowerLimit = 210;
    // proper validation
    const valAttr1 = Number(cardAttr1) <= powerLimit && Number(cardAttr1) >= 0;
    const valAttr2 = Number(cardAttr2) <= powerLimit && Number(cardAttr2) >= 0;
    const valAttr3 = Number(cardAttr3) <= powerLimit && Number(cardAttr3) >= 0;
    const sum = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
    const validateSum = sum <= sumPowerLimit;

    const validateAllAttr = valAttr1 && valAttr2 && valAttr3 && validateSum;
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
      cardImage,
      cardRare,
      cardTrunfo,
    };

    this.setState(({ savedCardsArr }) => ({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      isSaveButtonDisabled: true,
      savedCardsArr: [...savedCardsArr, savedCard],
    }));
  };

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
      savedCardsArr,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ false }
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
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <div>
          {savedCardsArr.map(
            ({
              cardName: savedName,
              cardDescription: savedDescription,
              cardAttr1: savedAttr1,
              cardAttr2: savedAttr2,
              cardAttr3: savedAttr3,
              cardImage: savedImage,
              cardRare: savedRare,
              cardTrunfo: savedTrunfo,
            }) => (
              <Card
                key={ savedName }
                cardName={ savedName }
                cardDescription={ savedDescription }
                cardAttr1={ savedAttr1 }
                cardAttr2={ savedAttr2 }
                cardAttr3={ savedAttr3 }
                cardImage={ savedImage }
                cardRare={ savedRare }
                cardTrunfo={ savedTrunfo }
              />
            ),
          )}
        </div>
      </div>
    );
  }
}

export default App;
