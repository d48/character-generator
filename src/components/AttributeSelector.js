import React, { useState } from 'react';
import ActionBar from './ActionBar';
import AttributeRow from './AttributeRow';
import AttributeSelectorHeader from './AttributeSelectorHeader';
import { groupByAndSetValue } from '../utils/helpers';
import getAttributeChoice from './AttributeChoice';

const AttributeSelector = (props) => {
  const { attributes } = { ...props };
  const [selectall, setSelectall] = useState(true);
  const [values, setValues] = useState(groupByAndSetValue(attributes, 'name', ''));
  const [checked, setChecked] = useState(groupByAndSetValue(attributes, 'name', true));
  const formatters = attributes
    .filter(item => item.format)
    .reduce((acc, currVal) => {
      acc[currVal.name] = currVal.format;
      return acc;
    }, {});

  // For select all
  const onClickSelectAllHandler = (event) => {
    const value = event.target.checked;
    setChecked(groupByAndSetValue(attributes, 'name', value));
    setSelectall(value);
  }

  // For row checkbox
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value= event.target.checked;

    setChecked((checked) => {
      let updated = checked;
      updated[name] = value;
      return { ...updated };
    });
  };

  // For button
  const onClickHandler = () => {
      const choices = getAttributeChoice(attributes)
      setValues({...choices});
  };

  // Component setup
  const attributeObject = [];

  for (let key in checked) {
    let format = (typeof formatters[key]) !== 'undefined' && formatters[key];

    attributeObject.push(
      <AttributeRow
        key={key}
        name={key}
        checked={checked[key]}
        onChangeHandler={onChangeHandler}
        result={values[key]}
        format={format}
        class="row"
      />
    );
  }

  return (
    <section>
      <AttributeSelectorHeader
        selectall={selectall}
        onClickSelectAllHandler={onClickSelectAllHandler}
      />
      <ul className="attribute-list" data-testid="attribute-list">
      {attributeObject}
      </ul>
      <ActionBar onClickHandler={onClickHandler} {...props} />
    </section>
  )
};

export default AttributeSelector;