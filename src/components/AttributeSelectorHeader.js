import React from 'react';

const AttributeSelectorHeader = (props) => {
  const { selectall, onClickSelectAllHandler } = { ...props };

  return (
    <div>
      <input type="checkbox" id="selectall" name="selectall"
        checked={selectall}
        onChange={onClickSelectAllHandler}
      />
      <label htmlFor="selectall">Select All</label>
    </div>
  );
}

export default AttributeSelectorHeader;
