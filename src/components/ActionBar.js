import React from 'react';
import styles from './ActionBar.module.css';

const ActionBar = (props) => {
  const { buttonLabel, onClickHandler } = { ...props };

  return (
    <button
      onClick={onClickHandler}
      className={`button-primary ${styles.btnGenerate}`}
    >
      {buttonLabel}
    </button>
  );
};

export default ActionBar;
