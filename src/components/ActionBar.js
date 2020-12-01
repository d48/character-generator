import React from 'react';
import styles from './ActionBar.module.css';

const ActionBar = (props) => {
  const { icon = '', buttonLabel, onClickHandler, type = 'button-primary' } = {
    ...props,
  };

  return (
    <button
      onClick={onClickHandler}
      className={`${type} ${styles.buttonPrimary}`}
    >
      {icon} {buttonLabel}
    </button>
  );
};

export default ActionBar;
