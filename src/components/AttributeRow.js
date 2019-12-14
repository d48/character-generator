import React from 'react';

const AttributeRow = (props) => {

  return (
    <li className="row" key={props.name}>
      <section className="six columns">
        <input
          type="checkbox"
          id={props.name}
          name={props.name}
          defaultChecked={props.checked}
          onChange={props.onChangeHandler}
        />
        <label htmlFor={props.name}>{props.name}</label>
      </section>

      {/* conditionally apply formatting to result if available */}
      <section className="six columns attribute-result">{props.checked ? (props.format && props.result ? props.format(props.result) : props.result) : ''}</section>
    </li>
  );
};

export default AttributeRow;
