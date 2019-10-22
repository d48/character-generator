import React from 'react';
import ActionBar from './ActionBar';
import AttributeRow from './AttributeRow';
import { groupByAndSetValue } from '../utils/helpers';

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

  setChecked(value) {
    this.setState({
      checked: { ...this.state.checked, ...groupByAndSetValue(this.props.attributes, 'name', value)}
    });
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
      attributeObject.push(
        <AttributeRow
          key={key}
          name={key}
          checked={this.state.checked[key]}
          onChangeHandler={this.onChangeHandler}
          result={this.state.values[key]}
          class="row"
         />
      );
    }

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
