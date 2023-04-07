export const validateText = (state) => {
  const { cardName, cardDescription, cardImage } = state;
  const validateName = cardName.length > 0;
  const validateDescription = cardDescription.length > 0;
  const validateImage = cardImage.length > 0;
  const validateTextFields = validateName && validateDescription && validateImage;
  return validateTextFields;
};

export const validateAttr = (state) => {
  const { cardAttr1, cardAttr2, cardAttr3, cardAttr4 } = state;
  const powerLimit = 90;
  const sumPowerLimit = 330;
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
