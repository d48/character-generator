import React from 'react';
import AttributeSelector from './AttributeSelector';

class AttributeSelectorHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectall: true
    }

    this.props = props;
    this.onSelectAllChange = this.onSelectAllChange.bind(this);
    this.attributeSelectorRef = React.createRef();
  }

  onSelectAllChange(event) {
    const value = event.target.checked;

    this.setState({
      [event.target.name]: value
    });

    this.attributeSelectorRef.current.setChecked(value);
  }

  render() {
    return (
      <div class="row">
        <input type="checkbox" id="selectall" name="selectall"
          checked={this.state.selectall}
          onChange={this.onSelectAllChange}
        />
        <label htmlFor="selectall">Select All</label>
        <AttributeSelector {...this.props} ref={this.attributeSelectorRef} />
      </div>
    )
  }
}

export default AttributeSelectorHeader;
