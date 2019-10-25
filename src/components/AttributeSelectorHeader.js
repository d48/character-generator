import React, { useState } from 'react';
import AttributeSelector from './AttributeSelector';

const AttributeSelectorHeader = (props) => {
  const [selectall, setSelectAll] = useState(true);
  const attributeSelectorRef = React.createRef();

  const onSelectAllChange = (event) => {
    const value = event.target.checked;
    setSelectAll(value);
    attributeSelectorRef.current.setChecked(value);
  };

  return (
    <div>
      <input type="checkbox" id="selectall" name="selectall"
        checked={selectall}
        onChange={onSelectAllChange}
      />
      <label htmlFor="selectall">Select All</label>
      <AttributeSelector {...props} ref={attributeSelectorRef} />
    </div>
  );
}

export default AttributeSelectorHeader;
