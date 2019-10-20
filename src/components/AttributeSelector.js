import React from 'react';
import ActionBar from './ActionBar';

const groupByAndSetValue = (objArray, property, initialValue) => {
  return objArray.reduce((acc, obj) => {
    var key = obj[property];
    acc[key] = initialValue;

    return acc;
  }, {});
};

class AttributeSelector extends React.Component {
  constructor(props) {
    super(props);

    this.values = groupByAndSetValue(this.props.attributes, 'name', '');
    this.checked = groupByAndSetValue(this.props.attributes, 'name', true);

    this.state = {
      checked: {...this.checked},
      values: {...this.values}
    };

    this.setChoices = (choices) => {
      this.setState({
        values: {...this.state.values, ...choices}
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

    for(let key in this.state.checked) {

      attributeObject.push(
        <div key={key} className="attribute-listing">
          <div className="attribute-name">
            <input
              type="checkbox"
              id={key}
              name={key}
              checked={this.state.checked[key]}
              onChange={this.onChangeHandler}
            />
            <label htmlFor={key}>{key}</label>
          </div>

        { /* conditionally show value */ }
        {this.state.checked[key] ?
          (
          <div className="attribute-result">{this.state.values[key]}</div>
          )
          : null
        }

        </div>
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