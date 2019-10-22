import React from 'react';

function AttributeRow(props) {
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
      <div className="six columns attribute-result">{props.checked ? props.result : ''}</div>
    </li>
  )
}

export default AttributeRow;
