import React from 'react';
import { getRandomIndex } from '../utils/helpers';

class ActionBar extends React.Component {
  constructor(props) {
    super(props);

    this.onClickHandler = this.onClickHandler.bind(this);
    this.buttonLabel = this.props.buttonLabel;
  }

  onClickHandler() {
    const choices = {};

    this.props.attributes.forEach(attribute => {
      choices[attribute.name] = attribute.values[getRandomIndex(attribute.values.length)];
    });

    this.props.onChoice(choices);
  }

  render() {
    return (
      <div>
        <button id="btn-generate" onClick={this.onClickHandler} class="button-primary">
          {this.buttonLabel}
        </button>
      </div>
    )
  }
}

export default ActionBar;
