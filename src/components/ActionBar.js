import React from 'react';

const ActionBar = (props) => {
  const { buttonLabel, onClickHandler } = { ...props };

  return (
    <button
      id="btn-generate"
      onClick={onClickHandler}
      className="button-primary"
      data-testid="button-generate"
    >
      {buttonLabel}
    </button>
  );
};

export default ActionBar;
