import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class AttributeSelectorHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectall: true
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
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
          onChange={this.handleInputChange}
        />
        <label htmlFor="selectall">Select All</label>
      </div>
    )
  }
}

class AttributeSelector extends React.Component {
  render() {
    const attributeObject = [];

    this.props.attributes.forEach((attribute) => {
      attributeObject.push(
        <div key={attribute.name} className="attribute-listing">
          <div className="attribute-name">
            <input type="checkbox" id={attribute.name} name={attribute.name} />
            <label htmlFor={attribute.name}>{attribute.name}</label>
          </div>
          <div className="attribute-result">{attribute.values[0]}</div>
        </div>
      )
    });

    return (
      <div className="attribute-list">
        {attributeObject}
      </div>
    )
  }
}

class CharacterGeneratorHeader extends React.Component {
  render() {
    return (
      <div>
        <h1>Character Generator</h1>
        <h2>Select attributes that you would like to include in the generated character description.</h2>
      </div>
    )
  }
}

class ActionBar extends React.Component {
  constructor(props) {
    super()

    this.props = props;
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    const choices = [];
    let attributeLength = 0;
    let attributeIndex = null;

    this.props.attributes.forEach(attribute => {
      attributeLength = attribute.values.length;
      attributeIndex = Math.floor(Math.random(attributeLength) * attributeLength);

      choices.push({
        name: attribute.name,
        value: attribute.values[attributeIndex]
      });
    });

    // pass choices to Attribute Selector component
  }

  render() {
    return (
      <div>
        <button id="btn-generate" onClick={this.onClickHandler}>Generate Character</button>
      </div>
    )
  }
}

class CharacterGenerator extends React.Component {
  render() {
    return (
      <div>
        <CharacterGeneratorHeader />
        <AttributeSelectorHeader />
        <AttributeSelector attributes={this.props.attributes} />
        <ActionBar attributes={this.props.attributes} />
      </div>
    )
  }
}


const ATTRIBUTES = [
  { name: 'Hair style', description: 'Spikey, long, short, etc', values: ['spikey', 'long', 'short'] },
  { name: 'Weight', description: '', values: [60, 80, 100, 120, 140, 160, 180] },
  { name: 'Height', description: 'From 3\' and up', values: [36, 48, 60, 72, 88, 102, 123] },
  { name: 'Eye color', description: 'Hazel, dark blue, glowing, etc', values: ['Hazel', 'Dark blue', 'Black', 'Green'] },
  { name: 'Skin color', description: 'Tan, spotted, albino, etc', values: ['Tan', 'Golden', 'Black', 'White', 'Brown'] },
];

ReactDOM.render(
  <CharacterGenerator attributes={ATTRIBUTES} />,
  document.getElementById('character-generator-container')
)

