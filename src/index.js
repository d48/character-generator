import React from 'react';
import ReactDOM from 'react-dom';
import CharacterGenerator from './components/CharacterGenerator.js';
import weightRandomizer from './plugins/weightRandomizer.js';
import './index.css';

// TODO: move to configuration.json
const SETTINGS = {
    title: 'Character Generator',
    description: 'Select attributes that you would like to include in the generated character description.',
    buttonLabel: 'Generate Character'
};

const ATTRIBUTES = [
  { name: 'Hair style', description: 'Spikey, long, short, etc', values: ['Spikey', 'Long', 'Short', 'Bob', 'Bun', 'Man-bun'] },
  { name: 'Weight', description: '', values: weightRandomizer, format: (val) => { return `${val} lbs`; }},
  { name: 'Height', description: '', values: [36, 48, 60, 72, 88, 102, 123], format: (val) => { return `${Math.floor(val/12)}' ${val%12}"`; } },
  { name: 'Eye color', description: 'Hazel, dark blue, glowing, etc', values: ['Hazel', 'Dark blue', 'Black', 'Green'] },
  { name: 'Skin color', description: 'Tan, spotted, albino, etc', values: ['Tan', 'Golden', 'Black', 'White', 'Brown', 'Orange', 'Yellow'] },
  { name: 'Body build', description: '', values: ['Frail', 'Fat', 'Thick', 'Boney', 'Medium', 'Small', 'Large', 'Skinny'] },
  { name: 'Gender', description: '', values: ['Male', 'Female', 'Androgynous', 'Ambiguous'] },
  { name: 'Accessories', description: '', values: ['Necklace', 'Hat', 'Watch', 'Ring', 'Earring'] },
  { name: 'Name', description: '', values: ['Tiberius', 'Aliso', 'Harmony', 'Griggio', 'Eliana', 'Brarben', 'Hauminor'] }
];

ReactDOM.render(
  <CharacterGenerator settings={SETTINGS} attributes={ATTRIBUTES} />,
  document.getElementById('character-generator-container')
)

