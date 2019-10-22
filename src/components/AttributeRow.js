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
      <div
        className="six columns attribute-result"
        style={props.checked ? {} : {display:'none'}}
      >{props.result}</div>
    </div>
  )
}

export default AttributeRow;
