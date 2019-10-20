import React from 'react';

class ActionBar extends React.Component {
  constructor(props) {
    super(props);

    this.onClickHandler = this.onClickHandler.bind(this);
    this.buttonLabel = this.props.buttonLabel;
  }

  onClickHandler() {
    const choices = {};
    let attributeLength = 0;
    let attributeIndex = null;

    this.props.attributes.forEach(attribute => {
      attributeLength = attribute.values.length;
      attributeIndex = Math.floor(Math.random(attributeLength) * attributeLength);

      choices[attribute.name] = attribute.values[attributeIndex];
    });

    this.props.onChoice(choices);
  }

  render() {
    return (
      <div>
        <button id="btn-generate" onClick={this.onClickHandler}>
          {this.buttonLabel}
        </button>
      </div>
    )
  }
}

export default ActionBar;