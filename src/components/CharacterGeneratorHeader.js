import React from 'react';
import PropTypes from 'prop-types';
import image from '../img/chargen-icon.png';
import styles from './CharacterGeneratorHeader.module.css';

function CharacterGeneratorHeader(props) {
  return (
    <header data-testid="chargen-header">
      <h1>
        <img src={image} alt="character icon" className={styles.image} />{' '}
        {props.title}
      </h1>
      <h2>{props.description}</h2>
    </header>
  );
}

CharacterGeneratorHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default CharacterGeneratorHeader;
