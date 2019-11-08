import React, { useState } from 'react';
import ActionBar from './ActionBar';
import AttributeRow from './AttributeRow';
import AttributeSelectorHeader from './AttributeSelectorHeader';
import { getRandomIndex, groupByAndSetValue } from '../utils/helpers';
import Fakerator from 'fakerator';

const AttributeSelector = (props) => {
  const fakerator = Fakerator();
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
      return {
        ...checked,
        [name]: value
      }
    });
  };

  // For button
  const onClickHandler = () => {
    const choices = {};

    attributes.forEach(attribute => {
      if (attribute.name.toLowerCase() === 'name') {
        if (typeof choices['Gender'] != 'undefined') {
          choices[attribute.name] = (choices['Gender'] === 'Male') ? fakerator.names.nameM() : fakerator.names.nameF();
        } else {
          choices[attribute.name] = fakerator.names.name();
        }
      } else {
        choices[attribute.name] = attribute.values[getRandomIndex(attribute.values.length)];
      }
    });

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
    <div>
      <AttributeSelectorHeader
        selectall={selectall}
        onClickSelectAllHandler={onClickSelectAllHandler}
      />
      <ul className="attribute-list">
      {attributeObject}
      </ul>
      <ActionBar onClickHandler={onClickHandler} {...props} />
    </div>
  )
};

export default AttributeSelector;
