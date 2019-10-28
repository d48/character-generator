import React from 'react';

const ActionBar = (props) => {
  const { buttonLabel, onClickHandler } = { ...props };

  return (
    <div>
      <button id="btn-generate" onClick={onClickHandler} className="button-primary">
        {buttonLabel}
      </button>
    </div>
  );
};

export default ActionBar;
