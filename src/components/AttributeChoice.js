import { getRandomIndex } from '../utils/helpers';
import Fakerator from 'fakerator';

const getAttributeChoice = (attributes) => {
  const fakerator = Fakerator();
  const choices = {};

  attributes.forEach(attribute => {
    if (attribute.name.toLowerCase() === 'name') {
      // select name
      if (typeof choices['Gender'] != 'undefined') {
        choices[attribute.name] = (choices['Gender'] === 'Male') ? fakerator.names.nameM() : fakerator.names.nameF();
      } else {
        choices[attribute.name] = fakerator.names.name();
      }
    } else {

      // select value
      if (typeof attribute.values === 'function') {
        choices[attribute.name] = attribute.values();
      } else {
        choices[attribute.name] = attribute.values[getRandomIndex(attribute.values.length)];
      }
    }
  });

  return choices;
}

export default getAttributeChoice;