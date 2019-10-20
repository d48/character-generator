import React from 'react';
import ActionBar from './ActionBar';
import { groupByAndSetValue } from '../utils/helpers';

function AttributeRow(props) {
  return (
    <div className="attribute-listing">
      <div className="attribute-name">
        <input
          type="checkbox"
          id={props.name}
          name={props.name}
          checked={props.checked}
          onChange={props.onChangeHandler}
        />
        <label htmlFor={props.name}>{props.name}</label>
      </div>

      { /* conditionally show value */}
      {props.checked ?
        (
          <div className="attribute-result">{props.result}</div>
        )
        : null
      }
    </div>
  )
}

class AttributeSelector extends React.Component {
  constructor(props) {
    super(props);

    this.values = groupByAndSetValue(this.props.attributes, 'name', '');
    this.checked = groupByAndSetValue(this.props.attributes, 'name', true);

    this.state = {
      checked: { ...this.checked },
      values: { ...this.values }
    };

    this.setChoices = (choices) => {
      this.setState({
        values: { ...this.state.values, ...choices }
      });
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(event) {
    const value = event.target.checked;
    const name = event.target.name;

    this.setState((state) => {
      return {
        checked: {
          ...state.checked,
          [name]: value
        }
      }
    });
  }

  render() {
    const attributeObject = [];

    for (let key in this.state.checked) {
      let attribData = {
        key: key,
        name: key,
        checked: this.state.checked[key],
        onChangeHandler: this.onChangeHandler,
        result: this.state.values[key]
      };

      attributeObject.push(
        <AttributeRow {...attribData} />
      );
    };

    return (
      <div>
        <div className="attribute-list">
          {attributeObject}
        </div>
        <ActionBar onChoice={this.setChoices} {...this.props} />
      </div>
    )
  }
}

export default AttributeSelector;
