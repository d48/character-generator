import React from 'react';
import AttributeSelector from './AttributeSelector';

class AttributeSelectorHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectall: true
    }

    this.onSelectAllChange = this.onSelectAllChange.bind(this);
    this.props = props;
  }

  onSelectAllChange(event) {
    const value = event.target.checked;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <input type="checkbox" id="selectall" name="selectall"
          checked={this.state.selectall}
          onChange={this.onSelectAllChange}
        />
        <label htmlFor="selectall">Select All</label>
        <AttributeSelector {...this.props} selectall/>
      </div>
    )
  }
}

export default AttributeSelectorHeader;