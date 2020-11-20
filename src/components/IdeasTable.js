import React from 'react';
import PropTypes from 'prop-types';
import styles from './IdeasGrid.module.css';

const IdeasTable = ({ table }) => {
  return (
    <table className="u-full-width">
      <thead>
        <tr>
          <th>Category</th>
          <th>Idea</th>
        </tr>
      </thead>
      <tbody>
        {table.map((item, key) => {
          return (
            <tr key={key}>
              <td>{item.name}</td>
              <td>
                <span
                  style={{ backgroundColor: `${item.color}` }}
                  className={`${styles.idea} ${styles.ideaTable}`}
                >
                  {item.value}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

IdeasTable.propTypes = {
  table: PropTypes.array,
};

export default IdeasTable;
