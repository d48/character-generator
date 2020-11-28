import React from 'react';
import ActionBar from './ActionBar';
import styles from './AttributeSelectorHeader.module.css';

const AttributeSelectorHeader = (props) => {
  const { buttonLabel, selectall, onClickHandler, onClickSelectAllHandler } = {
    ...props,
  };

  return (
    <header>
      <ActionBar onClickHandler={onClickHandler} buttonLabel={buttonLabel} />
      <section className="row">
        <input
          type="checkbox"
          id="selectall"
          name="selectall"
          checked={selectall}
          onChange={onClickSelectAllHandler}
        />
        <label htmlFor="selectall" className={styles.inputLabel}>
          {selectall ? 'Deselect All' : 'Select All'}
        </label>
      </section>
    </header>
  );
};

export default AttributeSelectorHeader;
