import React from 'react';

const AttributeRow = (props) => {
  const { name, checked, onChangeHandler, format, result } = props;

  return (
    <li className="row" key={name}>
      <section className="six columns">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChangeHandler}
        />
        <label htmlFor={name}>{name}</label>
      </section>

      {/* conditionally apply formatting to result if available */}
      <section className="six columns attribute-result">{checked ? (format && result ? format(result) : result) : ''}</section>
    </li>
  );
};

export default AttributeRow;
