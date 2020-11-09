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
const ideasGrid = [
  { name: 'Anatomy', attributes: ANATOMY },
  { name: 'Style', attributes: STYLE },
  { name: 'Emotion', attributes: EMOTION },
  { name: 'Color', attributes: COLOR },
  { name: 'Role', attributes: ROLE },
  { name: 'Item', attributes: ITEM },
  { name: 'Setting', attributes: SETTING },
];

ReactDOM.render(
  <CharacterGenerator
    settings={SETTINGS}
    attributes={ATTRIBUTES}
    ideasGrid={ideasGrid}
  />,
  document.getElementById('character-generator-container')
);
