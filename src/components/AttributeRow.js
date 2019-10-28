import React from 'react';

const AttributeRow = (props) => {
  return (
    <li className="row" key={props.name}>
      <div className="six columns">
        <input
          type="checkbox"
          id={props.name}
          name={props.name}
          checked={props.checked}
          onChange={props.onChangeHandler}
        />
        <label htmlFor={props.name}>{props.name}</label>
      </div>

      {/* conditionally apply formatting to result if available */}
      <div className="six columns attribute-result">{props.checked ? (props.format && props.result ? props.format(props.result) : props.result) : ''}</div>
    </li>
  );
};

export default AttributeRow;
