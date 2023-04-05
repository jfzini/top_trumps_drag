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
    cardRare: '',
    cardTrunfo: false,
    isSaveButtonDisabled: true,
  };

  validateText = () => {
    const { cardName,
      cardDescription,
      cardImage } = this.state;

    const validateName = cardName.length > 0;
    const validateDescription = cardDescription.length > 0;
    const validateImage = cardImage.length > 0;
    const validateTextFields = validateName && validateDescription && validateImage;
    return validateTextFields;
  };

  validateAttr = () => {
    const {
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;
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
    this.setState({
      [name]: value,
    }, this.validateFields);
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
      </div>
    );
  }
}

export default App;
