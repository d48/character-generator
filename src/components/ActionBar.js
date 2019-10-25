import React from 'react';

class ActionBar extends React.Component {
  constructor(props) {
    super(props);

    this.buttonLabel = this.props.buttonLabel;
  }

  render() {
    return (
      <div>
        <button id="btn-generate" onClick={this.props.onClickHandler} className="button-primary">
          {this.buttonLabel}
        </button>
      </div>
    )
  }
}

export default ActionBar;
