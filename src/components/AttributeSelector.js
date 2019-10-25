import React from 'react';
import ActionBar from './ActionBar';
import AttributeRow from './AttributeRow';
import { getRandomIndex, groupByAndSetValue } from '../utils/helpers';

class AttributeSelector extends React.Component {
  constructor(props) {
    super(props);

    this.values = groupByAndSetValue(this.props.attributes, 'name', '');
    this.checked = groupByAndSetValue(this.props.attributes, 'name', true);
    this.formatters = this.props.attributes.filter(item => item.format)
      .reduce((acc, currVal) => {
        acc[currVal.name] = currVal.format;
        return acc;
      }, {});

    this.state = {
      checked: { ...this.checked },
      values: { ...this.values }
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    const choices = {};

    this.props.attributes.forEach(attribute => {
      choices[attribute.name] = attribute.values[getRandomIndex(attribute.values.length)];
    });

    this.setState((prevState) => {
      const updated = { ...prevState.values, ...choices };

      return {
        values: { ...updated }
      }
    });
  }

  setChecked(value) {
    this.setState((prevState) => {
      let updated = { ...prevState.checked }

      for (let item in updated) {
        updated[item] = value;
      }

      return {
        checked: updated
      };
    });
  }

  onChangeHandler(event) {
    const value = event.target.checked;
    const name = event.target.name;

    this.setState((prevState) => {
      const updated = { ...prevState.checked };
      updated[name] = value;

      return {
        checked: updated
      }
    });
  }

  render() {
    const attributeObject = [];
    let format;

    for (let key in this.state.checked) {
      format = (typeof this.formatters[key]) !== 'undefined' && this.formatters[key];

      attributeObject.push(
        <AttributeRow
          key={key}
          name={key}
          checked={this.state.checked[key]}
          onChangeHandler={this.onChangeHandler}
          result={this.state.values[key]}
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
        <ActionBar onClickHandler={this.onClickHandler} {...this.props} />
      </div>
    )
  }
}

export default AttributeSelector;
