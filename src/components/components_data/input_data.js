const name = 'name-input';
const attr1 = 'attr1-input';
const attr2 = 'attr2-input';
const attr3 = 'attr3-input';
const img = 'image-input';
const trunfo = 'trunfo-input';

const inputData = [
  {
    label: 'Nome',
    inputType: 'text',
    testID: name,
    inputID: name,
    name,
  },
  {
    label: 'Atributo 1',
    inputType: 'number',
    testID: attr1,
    inputID: attr1,
    name: attr1,
  },
  {
    label: 'Atributo 2',
    inputType: 'number',
    testID: attr2,
    inputID: attr2,
    name: attr2,
  },
  {
    label: 'Atributo 3',
    inputType: 'number',
    testID: attr3,
    inputID: attr3,
    name: attr3,
  },
  {
    label: 'Imagem',
    inputType: 'text',
    testID: img,
    inputID: img,
    name: img,
  },
  {
    label: 'Super trunfo',
    inputType: 'checkbox',
    testID: trunfo,
    inputID: trunfo,
    name: trunfo,
  },
];

export default inputData;
