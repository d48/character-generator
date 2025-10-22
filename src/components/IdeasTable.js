import React from 'react';
import PropTypes from 'prop-types';
import styles from './IdeasGrid.module.css';
import stylesTable from './IdeasTable.module.css';

const IdeasTable = ({ table, tableRef, onCheckedItemsChange }) => {
  //initialize checkedItems state with all items checked
  const [checkedItems, setCheckedItems] = React.useState({});
  const [selectAll, setSelectAll] = React.useState(true);
  const isInitialMount = React.useRef(true);

  // Initialize checkedItems when table prop is available
  React.useEffect(() => {
    if (table && table.length > 0) {
      const initialCheckedState = {};
      table.forEach((item) => {
        initialCheckedState[item.name] = true; // default to true (checked)
      });
      setCheckedItems(initialCheckedState);

      // Only notify parent after a short delay to avoid render cycle issues
      setTimeout(() => {
        if (onCheckedItemsChange) {
          onCheckedItemsChange(initialCheckedState);
        }
      }, 0);
    }
  }, [table, onCheckedItemsChange]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prevState) => {
      const newState = {
        ...prevState,
        [name]: checked,
      };
      // Update selectAll based on whether all items are checked
      const allChecked = Object.values(newState).every((item) => item === true);
      setSelectAll(allChecked);

      return newState;
    });
  };

  // Notify parent about checked items changes after state updates
  React.useEffect(() => {
    // Skip the initial mount to avoid render warnings
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (Object.keys(checkedItems).length > 0 && onCheckedItemsChange) {
      onCheckedItemsChange(checkedItems);
    }
  }, [checkedItems, onCheckedItemsChange]);

  return (
    <>
      <div className={stylesTable.selectAllContainer}>
        <input
          type="checkbox"
          id="select-all"
          name="select-all"
          onChange={(e) => {
            const isChecked = e.target.checked;
            setSelectAll(isChecked);
            const newCheckedItems = {};
            table.forEach((item) => {
              newCheckedItems[item.name] = isChecked;
            });
            setCheckedItems(newCheckedItems);
          }}
          checked={selectAll}
        />
        <label htmlFor="select-all">
          {selectAll ? 'Deselect All' : 'Select All'}
        </label>
      </div>
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
                <td style={{ user_select: 'none' }}>
                  <input
                    type="checkbox"
                    id={item.name}
                    name={item.name}
                    onChange={handleCheckboxChange}
                    checked={checkedItems[item.name] !== false}
                  />
                  <label htmlFor={item.name}>{item.name}</label>
                </td>

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
  onCheckedItemsChange: PropTypes.func,
};

export default IdeasTable;
