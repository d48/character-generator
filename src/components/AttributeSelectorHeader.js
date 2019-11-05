import React, { useState } from 'react';
import { AttributeSelector } from './AttributeSelector';

const AttributeSelectorHeader = (props) => {
  const [selectall, setSelectAll] = useState(true);

  const onSelectAllChange = (event) => {
    const value = event.target.checked;
    setSelectAll(value);
  };

  return (
    <div>
      <input type="checkbox" id="selectall" name="selectall"
        checked={selectall}
        onChange={onSelectAllChange}
      />
      <label htmlFor="selectall">Select All</label>
      <AttributeSelector {...props} selectall={selectall} />
    </div>
  );
}

export default AttributeSelectorHeader;
