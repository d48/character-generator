import React from 'react';
import ReactDOM from 'react-dom';
import CharacterGenerator from './components/CharacterGenerator.js';
import './index.css';
import {
  SETTINGS,
  ATTRIBUTES,
  ANATOMY,
  STYLE,
  EMOTION,
  COLOR,
  ROLE,
  ITEM,
  SETTING,
} from './config';

const processAttributes = (attribute) => {
  console.log('Processing attribute:', attribute.name, attribute);

  // Special handling for weightRandomizer - generate multiple random weights
  if (typeof attribute.values === 'function' && attribute.name === 'Weight') {
    // Generate an array of random weights (e.g., 10 different weights)
    const weights = [];
    for (let i = 0; i < 10; i++) {
      weights.push(attribute.values()); // Call weightRandomizer multiple times
    }

    // Apply format function if it exists
    if (attribute.format) {
      const formatted = weights.map((value) => attribute.format(value));
      console.log('Formatted weights:', formatted);
      return formatted;
    }

    console.log('Generated weights:', weights);
    return weights;
  }

  // If values is a function (for other cases), call it to get an array
  if (typeof attribute.values === 'function') {
    const result = attribute.values();
    console.log('Function result for', attribute.name, ':', result);

    if (attribute.format && Array.isArray(result)) {
      const formatted = result.map((value) => attribute.format(value));
      console.log('Formatted result for', attribute.name, ':', formatted);
      return formatted;
    }

    return result;
  }

  // If there's a format function, apply it to each value
  if (attribute.format && Array.isArray(attribute.values)) {
    return attribute.values.map((value) => attribute.format(value));
  }

  // Otherwise return values as-is
  return attribute.values;
};
const ideasGrid = [
  { name: 'Hair style', attributes: processAttributes(ATTRIBUTES[0]) },
  { name: 'Hair color', attributes: processAttributes(ATTRIBUTES[1]) },
  { name: 'Weight', attributes: processAttributes(ATTRIBUTES[2]) },
  { name: 'Height', attributes: processAttributes(ATTRIBUTES[3]) },
  { name: 'Eye color', attributes: processAttributes(ATTRIBUTES[4]) },
  { name: 'Skin color', attributes: processAttributes(ATTRIBUTES[5]) },
  { name: 'Body build', attributes: processAttributes(ATTRIBUTES[6]) },
  { name: 'Accessories', attributes: processAttributes(ATTRIBUTES[7]) },
  { name: 'Expression', attributes: processAttributes(ATTRIBUTES[8]) },
  { name: 'Action', attributes: processAttributes(ATTRIBUTES[9]) },
  { name: 'Gender', attributes: processAttributes(ATTRIBUTES[10]) },
  { name: 'Name', attributes: processAttributes(ATTRIBUTES[11]) },
];

ReactDOM.render(
  <CharacterGenerator
    settings={SETTINGS}
    attributes={ATTRIBUTES}
    ideasGrid={ideasGrid}
  />,
  document.getElementById('character-generator-container')
);
