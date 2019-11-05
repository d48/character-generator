import React, { useState } from 'react';
import ActionBar from './ActionBar';
import AttributeRow from './AttributeRow';
import { getRandomIndex, groupByAndSetValue } from '../utils/helpers';

const AttributeSelector = (props) => {

  const { attributes, selectall } = { ...props };
  const [values, setValues] = useState(groupByAndSetValue(attributes, 'name', ''));
  const [checked, setChecked] = useState(groupByAndSetValue(attributes, 'name', true));
  const formatters = attributes.filter(item => item.format)
    .reduce((acc, currVal) => {
      acc[currVal.name] = currVal.format;
      return acc;
    }, {});

  // For button
  const onClickHandler = () => {
    const choices = {};

    attributes.forEach(attribute => {
      choices[attribute.name] = attribute.values[getRandomIndex(attribute.values.length)];
    });

    setValues({...choices});
  };

  // For row checkbox
  const onChangeHandler = (event) => {
    const { name, checked: value } = event.target;

    setChecked({
      ...checked,
      [name]: value
    });
  };

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
    <div>
      <ul className="attribute-list">
      {attributeObject}
      </ul>
      <ActionBar onClickHandler={onClickHandler} {...props} />
    </div>
  )
};

export { AttributeSelector };
