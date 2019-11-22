import React from 'react';

const ActionBar = (props) => {
  const { buttonLabel, onClickHandler } = { ...props };

  return (
    <button id="btn-generate" onClick={onClickHandler} className="button-primary">
      {buttonLabel}
    </button>
  );
};

export default ActionBar;
