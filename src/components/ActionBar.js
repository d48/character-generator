import React from 'react';
import styles from './ActionBar.module.css';

const ActionBar = (props) => {
  const { buttonLabel, onClickHandler } = { ...props };

  return (
    <button
      id="btn-generate"
      onClick={onClickHandler}
      className={`button-primary ${styles.btnGenerate}`}
      data-testid="button-generate"
    >
      {buttonLabel}
    </button>
  );
};

export default ActionBar;
