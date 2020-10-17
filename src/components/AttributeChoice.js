import Fakerator from 'fakerator';
import { getRandomIndex } from '../utils/helpers';

const getAttributeChoice = (attributes) => {
  const fakerator = Fakerator();
  const choices = {};

  attributes.forEach((attribute) => {
    let {values, name} = attribute;

    if (typeof values === 'function') {
      choices[name] = values();
    } else {
      choices[name] = values[getRandomIndex(values.length)];
    }
  });

  choices['Name'] = choices['Gender'] === 'Male' ? fakerator.names.nameM() : fakerator.names.nameF()

  return choices;
};

export default getAttributeChoice;
