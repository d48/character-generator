import React from 'react';
import ReactDOM from 'react-dom';
import CharacterGenerator from './components/CharacterGenerator.js';
import './index.css';
import { SETTINGS, ATTRIBUTES, ANATOMY, STYLE, EMOTION } from './config';
const ideasGrid = [
  { name: 'Anatomy', attributes: ANATOMY },
  { name: 'Style', attributes: STYLE },
  { name: 'Emotion', attributes: EMOTION },
];

ReactDOM.render(
  <CharacterGenerator
    settings={SETTINGS}
    attributes={ATTRIBUTES}
    ideasGrid={ideasGrid}
  />,
  document.getElementById('character-generator-container')
);
