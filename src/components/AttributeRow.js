import React from 'react';

const AttributeRow = (props) => {
  const { name, checked, onChangeHandler, format, result } = props;

  return (
    <tr key={name}>
      <td>
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChangeHandler}
        />
        <label htmlFor={name}>{name}</label>
      </td>
      <td className="attribute-result">
        {checked ? (format && result ? format(result) : result) : ''}
      </td>
    </tr>
  );
};

export default AttributeRow;
