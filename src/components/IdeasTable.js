import React from 'react';
import PropTypes from 'prop-types';
import styles from './IdeasGrid.module.css';
import stylesTable from './IdeasTable.module.css';

const IdeasTable = ({ table, tableRef }) => {
  return (
    <>
      <table
        className={`u-full-width ${stylesTable.ideasTable}`}
        id="idea-table"
        ref={tableRef}
      >
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
    </>
  );
};

IdeasTable.propTypes = {
  table: PropTypes.array,
  tableRef: PropTypes.object,
};

export default IdeasTable;
