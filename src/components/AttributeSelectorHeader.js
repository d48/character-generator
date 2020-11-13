import React from 'react';
import ActionBar from './ActionBar';
import styles from './AttributeSelectorHeader.module.css';

const AttributeSelectorHeader = (props) => {
  const { buttonLabel, selectall, onClickHandler, onClickSelectAllHandler } = {
    ...props,
  };

  return (
    <header>
      <input
        type="checkbox"
        id="selectall"
        name="selectall"
        checked={selectall}
        onChange={onClickSelectAllHandler}
      />
      <label htmlFor="selectall" className={styles.inputLabel}>
        Select All
      </label>
      <ActionBar onClickHandler={onClickHandler} buttonLabel={buttonLabel} />
    </header>
  );
};

export default AttributeSelectorHeader;
