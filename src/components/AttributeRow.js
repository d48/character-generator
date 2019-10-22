import React from 'react';

function AttributeRow(props) {
  return (
    <div className="row">
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

      { /* conditionally show value */}
      {props.checked ?
        (
          <div className="six columns attribute-result">{props.result}</div>
        )
        : null
      }
    </div>
  )
}

export default AttributeRow;
