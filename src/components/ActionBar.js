import React from 'react';
import { BsArrowRepeat } from 'react-icons/bs';
import styles from './ActionBar.module.css';

const ActionBar = (props) => {
  const {
    icon = '',
    buttonLabel,
    onClickHandler,
    type = 'button-primary',
    loading = false,
  } = {
    ...props,
  };

  return (
    <button
      onClick={onClickHandler}
      className={`${type} ${styles.buttonPrimary}`}
      disabled={loading}
    >
      {loading ? (
        <>
          <BsArrowRepeat className={`${styles.iconStyle} ${styles.spinning}`} />
          Loading...
        </>
      ) : (
        <>
          {icon} {buttonLabel}
        </>
      )}
    </button>
  );
};

export default ActionBar;
