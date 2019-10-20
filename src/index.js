import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
        <AttributeSelector {...this.props} />
      </div>
    )
  }
}

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

class CharacterGeneratorHeader extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.description}</h2>
      </div>
    )
  }
}

class CharacterGenerator extends React.Component {
  render() {
    return (
      <div>
        <CharacterGeneratorHeader
          title={this.props.settings.title}
          description={this.props.settings.description}
        />
        <AttributeSelectorHeader
          buttonLabel={this.props.settings.buttonLabel}
          attributes={this.props.attributes}
        />
      </div>
    )
  }
}

// TODO: move to configuration.json
const SETTINGS = {
    title: 'Character Generator',
    description: 'Select attributes that you would like to include in the generated character description.',
    buttonLabel: 'Generate Character'
};

const ATTRIBUTES = [
  { name: 'Hair style', description: 'Spikey, long, short, etc', values: ['spikey', 'long', 'short'] },
  { name: 'Weight', description: '', values: [60, 80, 100, 120, 140, 160, 180] },
  { name: 'Height', description: 'From 3\' and up', values: [36, 48, 60, 72, 88, 102, 123] },
  { name: 'Eye color', description: 'Hazel, dark blue, glowing, etc', values: ['Hazel', 'Dark blue', 'Black', 'Green'] },
  { name: 'Skin color', description: 'Tan, spotted, albino, etc', values: ['Tan', 'Golden', 'Black', 'White', 'Brown'] },
];

ReactDOM.render(
  <CharacterGenerator settings={SETTINGS} attributes={ATTRIBUTES} />,
  document.getElementById('character-generator-container')
)

