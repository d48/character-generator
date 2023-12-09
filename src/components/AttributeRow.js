import React from 'react';
import PropTypes from 'prop-types';
import styles from './AttributeRow.module.css';

const AttributeRow = (props) => {
  const { name, checked, onChangeHandler, format, result } = props;

  return (
    <tr key={name}>
      <td className={styles.firstColumn}>
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

AttributeRow.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  format: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  result: PropTypes.node
};

export default AttributeRow;
